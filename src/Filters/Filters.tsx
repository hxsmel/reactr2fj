import { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Paper from '@mui/material/Paper';
import { TSortBy, Genre, FiltersProps, AppDispatch } from '../types';
import { TMDB_GENRE_URL } from '../constants';
import { useFetch } from '../hooks/useFetch';
import { Loader } from '../components/Loader';
import { ErrorMessage } from '../components/ErrorMessage';
import { Pagination } from '../Pagination/Pagination';
import { FiltersHeader } from './FiltersHeader';
import { FiltersTitle } from './FiltersTitle';
import { SortByFilter } from './SortByFilter';
import { YearFilter } from './YearFilter';
import { GenreFilter } from './GenreFilter';
import { getRequestOptions } from '../utils/api';
import {
    initGenres,
    setSortBy,
    setYearRange,
    resetFilters,
    setSelectedGenres,
} from '../store/filtersSlice';
import {
    selectSortBy,
    selectYearRange,
    selectGenreMap,
} from '../store/filtersSelectors';

export function Filters({
                            currentPage,
                            totalPages,
                            onPageChange,
                            movieTitleFilter = '',
                            onMovieTitleFilterChange = () => {},
                        }: FiltersProps) {
    const dispatch = useDispatch<AppDispatch>();
    const sortBy = useSelector(selectSortBy);
    const yearRange = useSelector(selectYearRange);
    const genreMap = useSelector(selectGenreMap);

    const [localTitle, setLocalTitle] = useState(movieTitleFilter);

    const { data, loading: loadingGenres, error: errorGenres } = useFetch<{ genres: Genre[] }>(
        TMDB_GENRE_URL,
        getRequestOptions()
    );

    useEffect(() => {
        if (data) {
            const map = data.genres.reduce<Record<number, boolean>>((m, g) => {
                m[g.id] = false;
                return m;
            }, {});
            dispatch(initGenres(map));
        }
    }, [data, dispatch]);

    const handleReset = useCallback(() => {
        dispatch(resetFilters());
        setLocalTitle('');
        onMovieTitleFilterChange('');
    }, [dispatch, onMovieTitleFilterChange]);

    const handleTitleChange = useCallback(
        (v: string) => {
            setLocalTitle(v);
            onMovieTitleFilterChange(v);
        },
        [onMovieTitleFilterChange]
    );

    const handleSortChange = useCallback(
        (v: TSortBy) => dispatch(setSortBy(v)),
        [dispatch]
    );

    const handleYearChange = useCallback(
        (value: [number, number]) => dispatch(setYearRange(value)),
        [dispatch]
    );

    const handleGenresChange = useCallback(
        (selected: Genre[]) => dispatch(setSelectedGenres(selected)),
        [dispatch]
    );

    const allGenres = data?.genres ?? [];

    return (
        <Paper elevation={4} sx={{ width: 300, p: 2, display: 'flex', flexDirection: 'column' }}>
            <FiltersHeader onReset={handleReset} />
            <FiltersTitle value={localTitle} onChange={handleTitleChange} />
            <SortByFilter sortBy={sortBy} onChange={handleSortChange} />
            <YearFilter yearRange={yearRange} onChange={handleYearChange} />

            {loadingGenres ? (
                <Loader />
            ) : errorGenres ? (
                <ErrorMessage message={errorGenres} />
            ) : (
                <GenreFilter allGenres={allGenres} selectedMap={genreMap} onChange={handleGenresChange} />
            )}

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
        </Paper>
    );
}
