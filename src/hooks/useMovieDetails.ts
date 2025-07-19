import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieDetails } from '../store/fetchMovieDetails';
import { RootState, AppDispatch } from '../types';

export function useMovieDetails(id?: string) {
    const dispatch = useDispatch<AppDispatch>();
    const { movie, credits, loading, error } = useSelector(
        (state: RootState) => state.movies.details
    );
    const [isFav, setIsFav] = useState(false);

    useEffect(() => {
        if (!id) return;
        dispatch(fetchMovieDetails(id));
    }, [dispatch, id]);

    const toggleFavorite = useCallback(() => {
        setIsFav(f => !f);
    }, []);

    return { movie, credits, loading, error, isFav, toggleFavorite };
}