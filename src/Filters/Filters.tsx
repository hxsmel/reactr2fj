import React, { useState } from "react";
import styles from './Filters.module.scss';
import {TSortBy} from "../types";
import { INITIAL_GENRES_STATE } from "../constants";

export function Filters() {
    const [sortBy, setSortBy] = useState<TSortBy>("Популярности");
    const [genres, setGenres] = useState<Record<string, boolean>>(INITIAL_GENRES_STATE);

    const handleGenreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGenres({...genres, [e.target.name]: e.target.checked});
    };

    return (
        <div className={styles.filters}>
            <div className={styles.filtersHeader}>
                <h2>Фильтры</h2>
                <button className={styles.closeBtn}>x</button>
            </div>

            <div className={styles.filtersSection}>
                <label htmlFor="sortSelect">Сортировать по:</label>
                <select
                    className={styles.sortBy}
                    id="sortSelect"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as TSortBy)}
                >
                    <option>Популярности</option>
                    <option>Рейтингу</option>
                    <option>Году</option>
                </select>
            </div>

            <div className={styles.filtersSection}>
                <h3>Жанры</h3>
                {Object.keys(genres).map((genre) => (
                    <label key={genre}>
                        <input
                            className={styles.genre}
                            type="checkbox"
                            name={genre}
                            checked={genres[genre]}
                            onChange={handleGenreChange}
                        />
                        {genre}
                    </label>
                    ))}
            </div>
        </div>
    )
}