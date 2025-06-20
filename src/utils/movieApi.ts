import { getRequestOptions } from './api';
import { MovieInfo, Credits } from '../types';
import { BASE_URL } from '../constants';

export async function fetchMovieInfo(id: string): Promise<MovieInfo> {
    const options = getRequestOptions();
    if (!options) throw new Error('Не авторизован');

    const res = await fetch(`${BASE_URL}/${id}?language=ru-RU`, options);
    if (!res.ok) throw new Error(`Movie fetch failed: ${res.status}`);
    return res.json();
}

export async function fetchMovieCredits(id: string): Promise<Credits> {
    const options = getRequestOptions();
    if (!options) throw new Error('Не авторизован');

    const res = await fetch(`${BASE_URL}/${id}/credits?language=ru-RU`, options);
    if (!res.ok) throw new Error(`Credits fetch failed: ${res.status}`);
    return res.json();
}