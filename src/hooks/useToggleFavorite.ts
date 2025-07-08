import { useState, useCallback } from 'react';
import { getRequestOptions } from '../utils/api';
import { ACCOUNT_BASE } from '../constants';

type Params = { movieId: number; isFavorite: boolean };

export function useToggleFavorite(onSuccess?: () => void) {
    const [processingId, setProcessingId] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    const toggle = useCallback(
        async ({ movieId, isFavorite }: Params) => {
            setProcessingId(movieId);
            setError(null);
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
                setError(e.message);
                throw e;
            } finally {
                setProcessingId(null);
            }
        },
        [onSuccess]
    );

    return { toggle, processingId, error };
}