import { useContext, useEffect } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Checkbox from '@mui/material/Checkbox'
import Slider from '@mui/material/Slider'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Chip from '@mui/material/Chip'

import { TSortBy, Genre } from '../types'
import {
    TMDB_GENRE_URL,
    SORT_OPTIONS,
    MIN_YEAR,
    MAX_YEAR,
} from '../constants'
import { useAuth } from '../Contexts/UseAuth'
import { useFetch } from '../hooks/useFetch'
import {
    FiltersStateContext,
    FiltersDispatchContext,
} from '../Contexts/FiltersContext'
import { Pagination } from '../Pagination/Pagination'

interface FiltersProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export function Filters({ currentPage, totalPages, onPageChange }: FiltersProps) {
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

    const handleReset = () => {
        dispatch({ type: 'reset' })
    }

    const handleYearChange = (_: Event, value: number | number[]) => {
        dispatch({
            type: 'setYearRange',
            payload: value as [number, number],
        })
    }

    const allGenres = data?.genres ?? []

    const handleGenresChange = (_: any, value: Genre[]) => {
        const newMap: Record<number, boolean> = {}
        allGenres.forEach((g) => {
            newMap[g.id] = value.some((sel) => sel.id === g.id)
        })
        dispatch({ type: 'initGenres', payload: newMap })
    }

    return (
        <Paper
            elevation={4}
            sx={{
                width: 300,
                p: 2,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Фильтры</Typography>
                <IconButton size="small" onClick={handleReset}>
                    <CloseIcon />
                </IconButton>
            </Box>

            <FormControl fullWidth variant="standard" sx={{ mb: 2 }}>
                <InputLabel>Сортировать по</InputLabel>
                <Select
                    variant="standard"
                    value={sortBy}
                    onChange={(e) =>
                        dispatch({
                            type: 'setSortBy',
                            payload: e.target.value as TSortBy,
                        })
                    }
                >
                    {SORT_OPTIONS.map((opt) => (
                        <MenuItem key={opt.value} value={opt.value}>
                            {opt.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Box sx={{ mb: 4 }}>
                <Typography gutterBottom>Год релиза</Typography>
                <Slider
                    value={yearRange}
                    onChange={handleYearChange}
                    valueLabelDisplay="on"
                    min={MIN_YEAR}
                    max={MAX_YEAR}
                    marks={[
                        { value: MIN_YEAR, label: String(MIN_YEAR) },
                        { value: MAX_YEAR, label: String(MAX_YEAR) },
                    ]}
                />
            </Box>

            <Autocomplete
                multiple
                disableCloseOnSelect
                options={allGenres}
                getOptionLabel={(g) => g.name}
                loading={loadingGenres}
                value={allGenres.filter((g) => selectedGenres[g.id])}
                onChange={handleGenresChange}
                renderOption={(props, option, { selected }) => (
                    <li {...props}>
                        <Checkbox sx={{ mr: 1 }} checked={selected} size="small" />
                        {option.name}
                    </li>
                )}
                renderValue={(value, getTagProps) =>
                    value.map((option, idx) => {
                        const tagProps = getTagProps({ index: idx })
                        return <Chip label={option.name} size="small" {...tagProps} />
                    })
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="standard"
                        label="Жанры"
                        placeholder="Выберите жанры"
                        error={Boolean(errorGenres)}
                        helperText={errorGenres}
                    />
                )}
                sx={{ mb: 3 }}
            />

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
            />
        </Paper>
    )
}