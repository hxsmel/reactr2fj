import { createAsyncThunk } from '@reduxjs/toolkit';
import { TMDBResponse, RootState } from '../types';
import { getRequestOptions } from '../utils/api';
import {
    MOVIES_PER_PAGE,
    TMDB_PER_PAGE,
    MAX_TOTAL_RESULTS,
    MAX_TMDB_PAGE,
} from '../constants';


export const fetchMovies = createAsyncThunk<
    { results: TMDBResponse['results']; totalUIpages: number },
    { currentPage: number; searchQuery?: string },
    { state: RootState, rejectValue: string }
>(
    'movies/fetchMovies',
    async ({ currentPage, searchQuery }, { getState, rejectWithValue }) => {
        const { sortBy } = getState().filters;
        const options = getRequestOptions();
        if (!options) return rejectWithValue('Не авторизован');

        const baseUrl = 'https://api.themoviedb.org/3';
        const query = searchQuery?.trim();

        const globalStart = (currentPage - 1) * MOVIES_PER_PAGE;
        const globalEnd = globalStart + MOVIES_PER_PAGE - 1;
        const startPage = Math.min(Math.ceil((globalStart + 1) / TMDB_PER_PAGE), MAX_TMDB_PAGE);
        const endPage = Math.min(Math.ceil((globalEnd + 1) / TMDB_PER_PAGE), MAX_TMDB_PAGE);
        const pages = startPage === endPage ? [startPage] : [startPage, endPage];

        const buildUrl = (page: number) => {
            if (query) {
                return `${baseUrl}/search/movie?language=ru-RU&query=${encodeURIComponent(query)}&page=${page}`;
            }
            const endpoint = sortBy === 'Популярности' ? 'movie/popular' : 'movie/top_rated';
            return `${baseUrl}/${endpoint}?language=ru-RU&page=${page}`;
        };

        try {
            const headResp = await fetch(buildUrl(1), options);
            const headData: TMDBResponse = await headResp.json();
            const totalResults = Math.min(headData.total_results, MAX_TOTAL_RESULTS);
            const totalUIpages = Math.ceil(totalResults / MOVIES_PER_PAGE);

            const pagesData = await Promise.all(
                pages.map(p => fetch(buildUrl(p), options).then(res => res.json() as Promise<TMDBResponse>))
            );
            const allResults = pagesData.flatMap(d => d.results);
            const offset = globalStart - (startPage - 1) * TMDB_PER_PAGE;
            const slice = allResults.slice(offset, offset + MOVIES_PER_PAGE);

            return { results: slice, totalUIpages };
        } catch (err: any) {
            return rejectWithValue(err.message || 'Ошибка при загрузке фильмов');
        }
    }
);