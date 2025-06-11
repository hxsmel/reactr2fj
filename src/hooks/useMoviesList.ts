import { useEffect } from 'react';
import { TMDBResponse } from '../types';
import { MOVIES_PER_PAGE, TMDB_PER_PAGE } from '../constants';
import { getRequestOptions } from '../utils/api';
import { useFetch } from './useFetch';
import { useFiltersContext } from './useFiltersContext';
import { useVisibleMovies } from './useVisibleMovies';

const MAX_TOTAL_RESULTS = 10000;
const MAX_TMDB_PAGE = 500;

function getTmdbPage(currentPage: number) {
    return Math.min(
        Math.ceil((currentPage * MOVIES_PER_PAGE) / TMDB_PER_PAGE),
        MAX_TMDB_PAGE
    );
}

function buildUrl(sortBy: string, tmdbPage: number) {
    const endpoint = sortBy === 'Популярности' ? 'movie/popular' : 'movie/top_rated';
    return `https://api.themoviedb.org/3/${endpoint}?language=ru-RU&page=${tmdbPage}`;
}

export function useMoviesList(
    currentPage: number,
    onTotalPagesChange: (pages: number) => void
) {
    const { sortBy } = useFiltersContext();
    const tmdbPage = getTmdbPage(currentPage);
    const url = buildUrl(sortBy, tmdbPage);
    const options = getRequestOptions();

    const { data, loading, error } = useFetch<TMDBResponse>(url, options);
    const visibleMovies = data ? useVisibleMovies(data, currentPage).visibleMovies : [];

    useEffect(() => {
        if (!data) return;
        const cappedTotal = Math.min(data.total_results, MAX_TOTAL_RESULTS);
        const totalPages = Math.ceil(cappedTotal / MOVIES_PER_PAGE);
        onTotalPagesChange(totalPages);
    }, [data, onTotalPagesChange]);

    return { visibleMovies, loading, error };
}