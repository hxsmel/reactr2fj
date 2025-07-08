import { useEffect, useState } from 'react';
import { fetchTotalResults, fetchMoviesByGlobalRange } from '../utils/moviesApi';
import { MOVIES_PER_PAGE } from '../constants';
import { useFiltersContext } from './useFiltersContext';
import {TMDBResponse} from "../types.ts";

export function useMoviesList(
    currentPage: number,
    onTotalPagesChange: (pages: number) => void,
    movieTitleFilter: string = ''
) {
    const { sortBy } = useFiltersContext();
    const [visibleMovies, setVisibleMovies] = useState<TMDBResponse['results']>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function load() {
            setLoading(true);
            setError(null);

            try {
                const { totalUIpages } = await fetchTotalResults(sortBy, movieTitleFilter);
                onTotalPagesChange(totalUIpages);

                const globalStart = (currentPage - 1) * MOVIES_PER_PAGE;
                const globalEnd = globalStart + MOVIES_PER_PAGE - 1;

                const movies = await fetchMoviesByGlobalRange(
                    sortBy,
                    movieTitleFilter,
                    globalStart,
                    globalEnd
                );

                if (!cancelled) setVisibleMovies(movies);
            } catch (e: any) {
                if (!cancelled) setError(e.message || 'Ошибка при загрузке фильмов');
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        load();
        return () => { cancelled = true; };
    }, [currentPage, onTotalPagesChange, sortBy, movieTitleFilter]);

    return { visibleMovies, loading, error };
}
