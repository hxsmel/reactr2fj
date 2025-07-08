import { useState, useCallback } from 'react';
import { getRequestOptions } from '../utils/api';
import { ACCOUNT_BASE } from '../constants';
import { useFavoriteIds } from './useFavoriteIds';
import { ifMovFav } from '../types'

export function useToggleFavorite(onSuccess?: () => void) {
    const {
        favoriteIds,
        setFavoriteIds,
        error: favError,
        refresh: reloadFavorites,
    } = useFavoriteIds();

    const [processingId, setProcessingId] = useState<number | null>(null);

    const toggle = useCallback(
        async ({ movieId, isFavorite }: ifMovFav) => {
            setProcessingId(movieId);
            const prev = Array.isArray(favoriteIds) ? [...favoriteIds] : [];
            const next = isFavorite
                ? prev.filter(id => id !== movieId)
                : [...prev, movieId];
            setFavoriteIds(next);

            try {
                const options = getRequestOptions();
                if (!options) throw new Error('Не авторизован');

                const body = {
                    media_type: 'movie',
                    media_id: movieId,
                    favorite: !isFavorite,
                };
                const res = await fetch(
                    `${ACCOUNT_BASE}/favorite?language=ru-RU`,
                    {
                        ...options,
                        method: 'POST',
                        headers: {
                            ...options.headers,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(body),
                    }
                );
                if (!res.ok) throw new Error(`Ошибка ${res.status}`);
                onSuccess?.();
            } catch (e: any) {
                // Откат и проброс ошибки
                setFavoriteIds(prev);
                throw e;
            } finally {
                setProcessingId(null);
            }
        },
        [favoriteIds, setFavoriteIds, onSuccess]
    );

    return {
        favoriteIds,
        toggle,
        processingId,
        error: favError,
        refresh: reloadFavorites,
    };
}
