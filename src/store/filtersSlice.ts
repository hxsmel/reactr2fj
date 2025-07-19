import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Genre, TSortBy } from '../types';
import { INITIAL_STATE } from '../constants';

export const filtersSlice = createSlice({
    name: 'filters',
    initialState: INITIAL_STATE,
    reducers: {
        initGenres(state, action: PayloadAction<Record<number, boolean>>) {
            state.selectedGenres = action.payload;
        },
        setSortBy(state, action: PayloadAction<TSortBy>) {
            state.sortBy = action.payload;
        },
        setYearRange(state, action: PayloadAction<[number, number]>) {
            state.yearRange = action.payload;
        },
        resetFilters(state) {
            state.sortBy = INITIAL_STATE.sortBy;
            state.yearRange = INITIAL_STATE.yearRange;
            state.selectedGenres = { ...INITIAL_STATE.selectedGenres };
        },
        toggleGenre(state, action: PayloadAction<number>) {
            const id = action.payload;
            state.selectedGenres[id] = !state.selectedGenres[id];
        },
        setSelectedGenres(state, action: PayloadAction<Genre[]>) {
            const map: Record<number, boolean> = {};
            action.payload.forEach(g => { map[g.id] = true; });
            state.selectedGenres = map;
        },
    },
});

export const {
    initGenres,
    setSortBy,
    setYearRange,
    resetFilters,
    toggleGenre,
    setSelectedGenres,
} = filtersSlice.actions;

export const filtersReducer = filtersSlice.reducer;

//Я видел, что через несколько уроков надо будет сделать жанры и год через redux, поэтому заранее подготовил их
//Всё равно придется редачить, но почва уже есть; на этом этапе мог убрать год и жанры, они пока нерабочие и в уроке не просили