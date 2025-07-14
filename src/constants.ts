import {AuthState, OptionData, State, TSortBy,} from './types';

export const INITIAL_PAGE = 1;
export const TOTAL_PAGES = 5;

export const TMDB_GENRE_URL = 'https://api.themoviedb.org/3/genre/movie/list?language=ru';
export const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4Yjc0MzM2ZTg4NjVmNTU5M2I0ZjMyMTgxMzI4MzhmOCIsIm5iZiI6MTc0Nzc5OTY1Mi40NTQwMDAyLCJzdWIiOiI2ODJkNGU2NDQzN2ZhZGNjNmY2NDk4YzIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.pg41oUGIaCbX1oT0xzpXyWiwCU9CWt_QD6d3XoYur4g';

export const MIN_YEAR = 1920;
export const MAX_YEAR = new Date().getFullYear();
export const INITIAL_YEAR_RANGE: [number, number] = [MIN_YEAR, MAX_YEAR];

export const SORT_OPTIONS: OptionData[] = [
    { label: 'Популярности', value: 'Популярности' },
    { label: 'Рейтингу', value: 'Рейтингу' },
];

export const INITIAL_SORT_BY: TSortBy = 'Популярности';

export const INITIAL_STATE: State = {
    sortBy: INITIAL_SORT_BY,
    selectedGenres: {},
    yearRange: INITIAL_YEAR_RANGE,
};

export const MOVIES_PER_PAGE = 6
export const TMDB_PER_PAGE = 20

export const BASE_URL = 'https://api.themoviedb.org/3/movie';

export const TMDB_ACCOUNT_ID = 22024061;

export const ACCOUNT_BASE = `https://api.themoviedb.org/3/account/${TMDB_ACCOUNT_ID}`;

export const MAX_TOTAL_RESULTS = 10000;
export const MAX_TMDB_PAGE = 500;

export const initialState: AuthState = {
    token: null,
    user: null,
};
