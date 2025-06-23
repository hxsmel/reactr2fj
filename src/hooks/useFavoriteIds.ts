import { useState, useEffect, useCallback } from 'react';
import { getRequestOptions } from '../utils/api';
import { ACCOUNT_BASE } from '../constants';

export function useFavoriteIds() {
    const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchFavorites = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const options = getRequestOptions();
            if (!options) throw new Error('Не авторизован');

            const res = await fetch(
                `${ACCOUNT_BASE}/favorite/movies?language=ru-RU&page=1`,
                options
            );
            if (!res.ok) throw new Error(`Ошибка ${res.status}`);

            const json = (await res.json()) as { results: { id: number }[] };
            setFavoriteIds(json.results.map(m => m.id));
        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchFavorites();
    }, [fetchFavorites]);

    return { favoriteIds, loading, error, refresh: fetchFavorites };
}