import {OptionData, TSortBy} from "./types.ts";

export const emailRegex = /^[a-zA-Z0-9.\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z0-9_-]+$/;

export const INITIAL_PAGE = 1
export const TOTAL_PAGES = 5

export const TMDB_GENRE_URL = 'https://api.themoviedb.org/3/genre/movie/list?language=ru';

const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4Yjc0MzM2ZTg4NjVmNTU5M2I0ZjMyMTgxMzI4MzhmOCIsIm5iZiI6MTc0Nzc5OTY1Mi40NTQwMDAyLCJzdWIiOiI2ODJkNGU2NDQzN2ZhZGNjNmY2NDk4YzIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.pg41oUGIaCbX1oT0xzpXyWiwCU9CWt_QD6d3XoYur4g'

export const TMDB_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TOKEN}`
    }
};

export const YEAR_OPTIONS: OptionData[] = Array.from(
    { length: new Date().getFullYear() - 1899 },
    (_, i) => {
        const year = (1900 + i).toString();
        return { label: year, value: year };
    }
);

export const SORT_OPTIONS: OptionData[] = [
    { label: 'Популярности', value: 'Популярности'},
    { label: 'Рейтингу', value: 'Рейтингу' },
    { label: 'Году', value: 'Году' },
];

export const INITIAL_SORT_BY: TSortBy = 'Популярности';
export const INITIAL_YEAR: string = new Date().getFullYear().toString();
export const INITIAL_SELECTED_GENRES: Record<number, boolean> = {};