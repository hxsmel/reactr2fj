import { createAsyncThunk } from '@reduxjs/toolkit';
import {Credits, MovieInfo} from "../types";
import {fetchMovieCredits, fetchMovieInfo} from "../utils/movieApi";

export const fetchMovieDetails = createAsyncThunk<
    { movie: MovieInfo; credits: Credits },
    string,
    { rejectValue: string }
>(
    'movies/fetchMovieDetails',
    async (id, { rejectWithValue }) => {
        try {
            const [movie, credits] = await Promise.all([
                fetchMovieInfo(id),
                fetchMovieCredits(id),
            ]);
            return { movie, credits };
        } catch (err: any) {
            return rejectWithValue(err.message || 'Ошибка при загрузке деталей');
        }
    }
);