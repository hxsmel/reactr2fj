import { useState, useEffect } from 'react';

export function useFetch<T>(url: string, options?: RequestInit) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        setError(null);

        fetch(url, options)
            .then(res => {
                if (!res.ok) throw new Error(`Ошибка ${res.status}`);
                return res.json() as Promise<T>;
            })
            .then(json => {
                if (isMounted) setData(json);
            })
            .catch(err => {
                if (isMounted) setError(err.message);
            })
            .finally(() => {
                if (isMounted) setLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, [url, JSON.stringify(options)]);

    return { data, loading, error };
}