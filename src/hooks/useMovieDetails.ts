import { useState, useEffect } from 'react';
import { fetchMovieInfo, fetchMovieCredits } from '../utils/movieApi';
import { MovieInfo, Credits } from '../types';

export function useMovieDetails(id?: string) {
    const [movie, setMovie] = useState<MovieInfo | null>(null);
    const [credits, setCredits] = useState<Credits | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isFav, setIsFav] = useState(false);

    useEffect(() => {
        if (!id) {
            setError('Не указан ID фильма');
            setLoading(false);
            return;
        }
        setLoading(true); setError(null);

        Promise.all([
            fetchMovieInfo(id),
            fetchMovieCredits(id)
        ])
            .then(([info, creds]) => { setMovie(info); setCredits(creds); })
            .catch(err => setError(err.message || 'Ошибка при загрузке'))
            .finally(() => setLoading(false));
    }, [id]);

    const toggleFavorite = () => setIsFav(f => !f);
    return { movie, credits, loading, error, isFav, toggleFavorite };
}