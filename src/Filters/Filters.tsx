import { useContext, useEffect, useState, useCallback, } from 'react'
import Paper from '@mui/material/Paper'


import { TSortBy, Genre, FiltersProps } from '../types'
import {
    TMDB_GENRE_URL,
} from '../constants'
import { useAuth } from '../Contexts/UseAuth'
import { useFetch } from '../hooks/useFetch'
import { Loader } from '../components/Loader'
import { ErrorMessage } from '../components/ErrorMessage'
import {
    FiltersStateContext,
    FiltersDispatchContext,
} from '../Contexts/FiltersContext'
import { Pagination } from '../Pagination/Pagination'
import { FiltersHeader } from './FiltersHeader'
import { FiltersTitle } from './FiltersTitle'
import { SortByFilter } from './SortByFilter'
import { YearFilter } from './YearFilter'
import { GenreFilter } from './GenreFilter'

export function Filters({
                            currentPage,
                            totalPages,
                            onPageChange,
                            movieTitleFilter = '',
                            onMovieTitleFilterChange = () => {},
                        }: FiltersProps) {
    const [localTitle, setLocalTitle] = useState(movieTitleFilter)
    const state = useContext(FiltersStateContext)
    const dispatch = useContext(FiltersDispatchContext)

    if (!state || !dispatch) {
        throw new Error('Фильтры должны использоваться внутри FiltersProvider')
    }

    const { sortBy, yearRange, selectedGenres } = state
    const { token } = useAuth()
    const {
        data,
        loading: loadingGenres,
        error: errorGenres,
    } = useFetch<{ genres: Genre[] }>(
        TMDB_GENRE_URL,
        token
            ? {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
            : undefined
    )

    useEffect(() => {
        if (data) {
            dispatch({
                type: 'initGenres',
                payload: data.genres.reduce<Record<number, boolean>>((map, g) => {
                    map[g.id] = false
                    return map
                }, {}),
            })
        }
    }, [data, dispatch])

    const handleReset = useCallback(() => {
        dispatch({ type: 'reset' })
        setLocalTitle('')
        onMovieTitleFilterChange('')
    }, [dispatch, onMovieTitleFilterChange])

    const handleTitleChange = useCallback(
        (v: string) => {
            setLocalTitle(v)
            onMovieTitleFilterChange(v)
        },
        [onMovieTitleFilterChange]
    )

    const handleSortChange = useCallback(
        (v: TSortBy) => dispatch({ type: 'setSortBy', payload: v }),
        [dispatch]
    )

    const handleYearChange = useCallback(
        (value: [number, number]) => dispatch({ type: 'setYearRange', payload: value }),
        [dispatch]
    )

    const handleGenresChange = useCallback(
        (selected: Genre[]) => {
            const map: Record<number, boolean> = {}
            data?.genres.forEach((g) => {
                map[g.id] = selected.some((s) => s.id === g.id)
            })
            dispatch({ type: 'initGenres', payload: map })
        },
        [data, dispatch]
    )

    const allGenres = data?.genres ?? []

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
                <GenreFilter
                    allGenres={allGenres}
                    selectedMap={selectedGenres}
                    onChange={handleGenresChange}
                />
            )}

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
            />
        </Paper>
    )
}