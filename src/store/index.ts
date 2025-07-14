import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        // здесь можно зарегистрировать другие слайсы: movies, filters и т.д.
    },
});