import { TMDBResponse } from '../types';
import {
    MOVIES_PER_PAGE,
    TMDB_PER_PAGE,
    MAX_TOTAL_RESULTS,
    MAX_TMDB_PAGE
} from '../constants';
import { getRequestOptions } from '../utils/api';

function buildDiscoverUrl(sortBy: string, page: number): string {
    const endpoint = sortBy === 'Популярности' ? 'movie/popular' : 'movie/top_rated';
    return `https://api.themoviedb.org/3/${endpoint}?language=ru-RU&page=${page}`;
}

function buildSearchUrl(query: string, page: number): string {
    return `https://api.themoviedb.org/3/search/movie?language=ru-RU&query=${encodeURIComponent(query)}&page=${page}`;
}

export async function fetchTotalResults(
    sortBy: string,
    query: string
): Promise<{ totalResults: number; totalUIpages: number }> {
    const options = getRequestOptions();
    const url = query.trim()
        ? buildSearchUrl(query, 1)
        : buildDiscoverUrl(sortBy, 1);

    const resp = await fetch(url, options);
    const data: TMDBResponse = await resp.json();
    const totalResults = Math.min(data.total_results, MAX_TOTAL_RESULTS);
    return {
        totalResults,
        totalUIpages: Math.ceil(totalResults / MOVIES_PER_PAGE)
    };
}

export async function fetchMoviesByGlobalRange(
    sortBy: string,
    query: string,
    globalStart: number,
    globalEnd: number
): Promise<TMDBResponse['results']> {
    const options = getRequestOptions();

    const startPage = Math.min(
        Math.ceil((globalStart + 1) / TMDB_PER_PAGE),
        MAX_TMDB_PAGE
    );
    const endPage = Math.min(
        Math.ceil((globalEnd + 1) / TMDB_PER_PAGE),
        MAX_TMDB_PAGE
    );
    const pages = startPage === endPage ? [startPage] : [startPage, endPage];

    const allResults = (
        await Promise.all(
            pages.map((p) =>
                fetch(
                    query.trim() ? buildSearchUrl(query, p) : buildDiscoverUrl(sortBy, p),
                    options
                )
                    .then((r) => r.json() as Promise<TMDBResponse>)
                    .then((d) => d.results)
            )
        )
    ).flat();

    const offset = globalStart - (startPage - 1) * TMDB_PER_PAGE;
    return allResults.slice(offset, offset + MOVIES_PER_PAGE);
}