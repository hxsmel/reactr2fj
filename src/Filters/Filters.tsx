import { useState, useEffect } from 'react';
import styles from './Filters.module.scss';
import { TSortBy, Genre } from '../types';
import { Select } from '../components/Select/Select';
import { GenresList } from '../components/GenresList/GenresList';
import { TMDB_OPTIONS, TMDB_GENRE_URL } from '../constants';
import { YEAR_OPTIONS, SORT_OPTIONS } from '../constants';

export function Filters() {
    const [sortBy, setSortBy] = useState<TSortBy>('Популярности');
    const [year, setYear] = useState<string>(new Date().getFullYear().toString());
    const [genresList, setGenresList] = useState<Genre[]>([]);
    const [selectedGenres, setSelectedGenres] = useState<Record<number, boolean>>({});

    useEffect(() => {
        fetch(TMDB_GENRE_URL, TMDB_OPTIONS)
            .then(res => res.json())
            .then(data => setGenresList(data.genres))
            .catch(err => console.error('Ошибка загрузки жанров:', err));
    }, []);

    useEffect(() => {
        if (genresList.length === 0) return;

        const initMap = genresList.reduce<Record<number, boolean>>((map, genre) => {
            map[genre.id] = false;
            return map;
        }, {});

        setSelectedGenres(initMap);
    }, [genresList]);

    const handleGenreChange = (id: number, checked: boolean) => {
        setSelectedGenres(prev => ({ ...prev, [id]: checked }));
    };

    return (
        <div className={styles.filters}>
            <div className={styles.filtersHeader}>
                <h2>Фильтры</h2>
                <button className={styles.closeBtn}>x</button>
            </div>

            <div className={styles.filtersSection}>
                <Select
                    label="Сортировать по:"
                    id="sortSelect"
                    options={SORT_OPTIONS}
                    value={sortBy}
                    onChange={value => setSortBy(value as TSortBy)}
                />
            </div>

            <div className={styles.filtersSection}>
                <Select
                    label="Год релиза:"
                    id="yearSelect"
                    options={YEAR_OPTIONS}
                    value={year}
                    onChange={value => setYear(value)}
                />
            </div>

            <div className={styles.filtersSection}>
                <h3>Жанры</h3>
                <GenresList
                    genres={genresList}
                    selected={selectedGenres}
                    onChange={handleGenreChange}
                />
            </div>
        </div>
    );
}
