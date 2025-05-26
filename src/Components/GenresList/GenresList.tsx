import React from 'react';
import styles from './GenresList.module.scss';
import { Genre } from '../../types';

interface GenresListProps {
    genres: Genre[];
    selected: Record<number, boolean>;
    onChange: (id: number, checked: boolean) => void;
}

export const GenresList: React.FC<GenresListProps> = ({ genres, selected, onChange }) => (
    <div className={styles.genresList}>
        {genres.map(genre => (
            <label key={genre.id} className={styles.genreLabel}>
                <input
                    type="checkbox"
                    name={genre.name}
                    checked={!!selected[genre.id]}
                    onChange={e => onChange(genre.id, e.target.checked)}
                    className={styles.checkbox}
                />
                {genre.name}
            </label>
        ))}
    </div>
);