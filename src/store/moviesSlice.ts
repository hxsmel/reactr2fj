import { createSlice } from '@reduxjs/toolkit';
import { MoviesState } from '../types';
import { fetchMovies } from './fetchMovies';
import { fetchMovieDetails } from './fetchMovieDetails';

const initialState: MoviesState = {
    list: [],
    totalUIpages: 0,
    loading: false,
    error: null,
    details: { movie: null, credits: null, loading: false, error: null },
};

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchMovies.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.list = action.payload.results;
                state.totalUIpages = action.payload.totalUIpages;
                state.loading = false;
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message || 'Ошибка при загрузке списка';
            })
            .addCase(fetchMovieDetails.pending, state => {
                state.details = { movie: null, credits: null, loading: true, error: null };
            })
            .addCase(fetchMovieDetails.fulfilled, (state, action) => {
                state.details = { movie: action.payload.movie, credits: action.payload.credits, loading: false, error: null };
            })
            .addCase(fetchMovieDetails.rejected, (state, action) => {
                state.details.loading = false;
                state.details.error = action.payload || action.error.message || 'Ошибка при загрузке деталей';
            });
    }
});

export const moviesReducer = moviesSlice.reducer;