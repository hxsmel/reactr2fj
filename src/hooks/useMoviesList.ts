import { useEffect, useState } from 'react';
import { TMDBResponse } from '../types';
import { MOVIES_PER_PAGE, TMDB_PER_PAGE, MAX_TOTAL_RESULTS, MAX_TMDB_PAGE } from '../constants';
import { getRequestOptions } from '../utils/api';
import { useFiltersContext } from './useFiltersContext';

function buildDiscoverUrl(sortBy: string, tmdbPage: number) {
    const endpoint = sortBy === 'Популярности' ? 'movie/popular' : 'movie/top_rated';
    return `https://api.themoviedb.org/3/${endpoint}?language=ru-RU&page=${tmdbPage}`;
}

function buildSearchUrl(query: string, tmdbPage: number) {
    return `https://api.themoviedb.org/3/search/movie?language=ru-RU&query=
    ${encodeURIComponent(query)}&page=${tmdbPage}`;
}

export function useMoviesList(
    currentPage: number,
    onTotalPagesChange: (pages: number) => void,
    movieTitleFilter: string = ''
) {
    const { sortBy } = useFiltersContext();
    const [visibleMovies, setVisibleMovies] = useState<TMDBResponse['results'][0][]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        const options = getRequestOptions();

        async function fetchMovies() {
            setLoading(true);
            setError(null);

            try {
                const globalStart = (currentPage - 1) * MOVIES_PER_PAGE;
                const globalEnd = globalStart + MOVIES_PER_PAGE - 1;

                const startPage = Math.min(
                    Math.ceil((globalStart + 1) / TMDB_PER_PAGE),
                    MAX_TMDB_PAGE
                );
                const endPage = Math.min(
                    Math.ceil((globalEnd + 1) / TMDB_PER_PAGE),
                    MAX_TMDB_PAGE
                );
                const pagesToFetch = startPage === endPage ? [startPage] : [startPage, endPage];

                let totalResults = 0;
                if (movieTitleFilter.trim()) {
                    const resp = await fetch(buildSearchUrl(movieTitleFilter, 1), options);
                    const data: TMDBResponse = await resp.json();
                    totalResults = Math.min(data.total_results, MAX_TOTAL_RESULTS);
                    const totalUIpages = Math.ceil(totalResults / MOVIES_PER_PAGE);
                    onTotalPagesChange(totalUIpages);
                }

                else {
                    const resp = await fetch(buildDiscoverUrl(sortBy, 1), options);
                    const data: TMDBResponse = await resp.json();
                    totalResults = Math.min(data.total_results, MAX_TOTAL_RESULTS);
                    const totalUIpages = Math.ceil(totalResults / MOVIES_PER_PAGE);
                    onTotalPagesChange(totalUIpages);
                }

                const fetches = pagesToFetch.map(async (p) => {
                    const url = movieTitleFilter.trim()
                        ? buildSearchUrl(movieTitleFilter, p)
                        : buildDiscoverUrl(sortBy, p);
                    const resp = await fetch(url, options);
                    const data: TMDBResponse = await resp.json();
                    return data.results;
                });

                const pagesResults = await Promise.all(fetches);
                const allResults = pagesResults.flat();

                const offset = globalStart - (startPage - 1) * TMDB_PER_PAGE;
                const slice = allResults.slice(offset, offset + MOVIES_PER_PAGE);

                if (!cancelled) {
                    setVisibleMovies(slice);
                }
            } catch (e: any) {
                if (!cancelled) {
                    setError(e.message || 'Ошибка при загрузке фильмов');
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        fetchMovies();
        return () => {
            cancelled = true;
        };
    }, [currentPage, onTotalPagesChange, sortBy, movieTitleFilter]);

    return { visibleMovies, loading, error };
}
