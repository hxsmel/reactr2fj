import { createSelector } from 'reselect';
import { RootState } from '../types';

const selectFilters = (state: RootState) => state.filters;

export const selectSortBy = createSelector(
    [selectFilters],
    filters => filters.sortBy
);

export const selectYearRange = createSelector(
    [selectFilters],
    filters => filters.yearRange
);

export const selectGenreMap = createSelector(
    [selectFilters],
    filters => filters.selectedGenres
);