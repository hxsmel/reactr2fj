import { useReducer, useEffect, useState } from 'react';
import styles from './Filters.module.scss';
import { TSortBy, Genre } from '../types';
import { Select } from '../components/Select/Select';
import { GenresList } from '../components/GenresList/GenresList';
import {
    TMDB_OPTIONS,
    TMDB_GENRE_URL,
    YEAR_OPTIONS,
    SORT_OPTIONS,
    INITIAL_STATE
} from '../constants';
import { reducer } from "./Reducer";

export function Filters() {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
    const { sortBy, year, selectedGenres } = state;
    const [genresList, setGenresList] = useState<Genre[]>([]);

    useEffect(() => {
        fetch(TMDB_GENRE_URL, TMDB_OPTIONS)
            .then(res => res.json())
            .then((data: { genres: Genre[] }) => {
                setGenresList(data.genres);

                const initMap = data.genres.reduce(
                    (map: Record<number, boolean>, genre: Genre) => {
                        map[genre.id] = false;
                        return map;
                    },
                    {} as Record<number, boolean>
                );
                dispatch({ type: 'initGenres', payload: initMap });
            })
            .catch(err => console.error('Ошибка загрузки жанров:', err));
    }, []);

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
                    onChange={value =>
                        dispatch({ type: 'setSortBy', payload: value as TSortBy })
                    }
                />
            </div>

            <div className={styles.filtersSection}>
                <Select
                    label="Год релиза:"
                    id="yearSelect"
                    options={YEAR_OPTIONS}
                    value={year}
                    onChange={value => dispatch({ type: 'setYear', payload: value })}
                />
            </div>

            <div className={styles.filtersSection}>
                <h3>Жанры</h3>
                <GenresList
                    genres={genresList}
                    selected={selectedGenres}
                    onChange={(id, checked) =>
                        dispatch({ type: 'toggleGenre', payload: { id, checked } })
                    }
                />
            </div>
        </div>
    );
}
