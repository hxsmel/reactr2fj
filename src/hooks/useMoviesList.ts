import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../store/fetchMovies';
import { RootState, AppDispatch } from '../types';
import { selectSortBy } from '../store/filtersSelectors';

export function useMoviesList(
    currentPage: number,
    onTotalPagesChange: (pages: number) => void,
    movieTitleFilter: string = ''
) {
    const dispatch = useDispatch<AppDispatch>();
    const sortBy         = useSelector((state: RootState) => selectSortBy(state));
    const visibleMovies  = useSelector((state: RootState) => state.movies.list);
    const totalUIpages   = useSelector((state: RootState) => state.movies.totalUIpages);
    const loading        = useSelector((state: RootState) => state.movies.loading);
    const error          = useSelector((state: RootState) => state.movies.error);

    useEffect(() => {
        dispatch(fetchMovies({
            currentPage,
            searchQuery: movieTitleFilter.trim() ? movieTitleFilter : undefined
        }));
    }, [dispatch, currentPage, movieTitleFilter, sortBy]);

    useEffect(() => {
        onTotalPagesChange(totalUIpages);
    }, [totalUIpages, onTotalPagesChange]);

    return { visibleMovies, loading, error };
}
