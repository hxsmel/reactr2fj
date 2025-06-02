import { useContext, useEffect, useState } from 'react';
import styles from './Filters.module.scss';
import { TSortBy, Genre } from '../types';
import { Select } from '../Components/Select/Select';
import { GenresList } from '../Components/GenresList/GenresList';
import {
    TMDB_GENRE_URL,
    YEAR_OPTIONS,
    SORT_OPTIONS
} from '../constants';
import { useAuth } from '../Contexts/UseAuth';
import { useFetch } from '../hooks/useFetch';
import { FiltersStateContext, FiltersDispatchContext } from '../Contexts/FiltersContext';

export function Filters() {
    const state = useContext(FiltersStateContext);
    const dispatch = useContext(FiltersDispatchContext);

    if (!state || !dispatch) {
        throw new Error('Filters must be used within a FiltersProvider');
    }

    const { sortBy, year, selectedGenres } = state;
    const [genresList, setGenresList] = useState<Genre[]>([]);
    const { token } = useAuth();

    const { data, loading, error } = useFetch<{ genres: Genre[] }>(
        TMDB_GENRE_URL,
        token
            ? {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
            : undefined
    );

    useEffect(() => {
        if (data) {
            setGenresList(data.genres);
            const initMap = data.genres.reduce(
                (map: Record<number, boolean>, genre) => {
                    map[genre.id] = false;
                    return map;
                },
                {} as Record<number, boolean>
            );
            dispatch({ type: 'initGenres', payload: initMap });
        }
    }, [data, dispatch]);

    const handleReset = () => {
        dispatch({ type: 'reset' });
    };

    return (
        <div className={styles.filters}>
            <div className={styles.filtersHeader}>
                <h2>Фильтры</h2>
                <button
                    className={styles.closeBtn}
                    onClick={handleReset}
                    title="Сбросить фильтры"
                >
                    ×
                </button>
            </div>

            <div className={styles.filtersSection}>
                <Select
                    label="Сортировать по:"
                    id="sortSelect"
                    options={SORT_OPTIONS}
                    value={sortBy}
                    onChange={(v) =>
                        dispatch({ type: 'setSortBy', payload: v as TSortBy })
                    }
                />
            </div>

            <div className={styles.filtersSection}>
                <Select
                    label="Год релиза:"
                    id="yearSelect"
                    options={YEAR_OPTIONS}
                    value={year}
                    onChange={(v) => dispatch({ type: 'setYear', payload: v })}
                />
            </div>

            <div className={styles.filtersSection}>
                <h3>Жанры</h3>
                {loading && <p>Загрузка жанров...</p>}
                {error && <p className={styles.error}>Ошибка: {error}</p>}
                {!loading && !error && (
                    <GenresList
                        genres={genresList}
                        selected={selectedGenres}
                        onChange={(id, checked) =>
                            dispatch({ type: 'toggleGenre', payload: { id, checked } })
                        }
                    />
                )}
            </div>
        </div>
    );
}