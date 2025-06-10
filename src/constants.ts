import { createContext } from "react";
import { OptionData, State, TSortBy, AuthContextType } from './types';

export const emailRegex = /^[a-zA-Z0-9.\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z0-9_-]+$/;

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
    { label: 'Году', value: 'Году' },
];

export const INITIAL_SORT_BY: TSortBy = 'Популярности';

export const INITIAL_STATE: State = {
    sortBy: INITIAL_SORT_BY,
    selectedGenres: {},
    yearRange: INITIAL_YEAR_RANGE,
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);