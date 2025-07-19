import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import { filtersReducer } from './filtersSlice';
import { moviesReducer } from './moviesSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        filters: filtersReducer,
        movies: moviesReducer,
    },
});