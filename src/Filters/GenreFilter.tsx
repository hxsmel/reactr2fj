import { memo, useCallback, useMemo } from 'react'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { Genre, GenreFilterProps } from '../types'

function GenreFilterComponent({
                                  allGenres,
                                  selectedMap,
                                  onChange,
                              }: GenreFilterProps) {
    const value = useMemo(
        () => allGenres.filter((g) => Boolean(selectedMap[g.id])),
        [allGenres, selectedMap]
    )

    const renderOption = useCallback(
        (props: any, option: Genre, { selected }: { selected: boolean }) => (
            <li {...props}>
                <Checkbox sx={{ mr: 1 }} checked={selected} size="small" />
                {option.name}
            </li>
        ),
        []
    )

    const renderValue = useCallback(
        (selected: Genre[], getTagProps: any) =>
            selected.map((option, idx) => (
                <Chip
                    key={option.id}
                    label={option.name}
                    size="small"
                    {...getTagProps({ index: idx })}
                />
            )),
        []
    )

    return (
        <Autocomplete
            multiple
            disableCloseOnSelect
            options={allGenres}
            getOptionLabel={(g) => g.name}
            value={value}
            onChange={(_, v) => onChange(v)}
            renderOption={renderOption}
            renderValue={renderValue}
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant="standard"
                    label="Жанры"
                    placeholder="Выберите жанры"
                />
            )}
            sx={{ mb: 3 }}
        />
    )
}

export const GenreFilter = memo(GenreFilterComponent)
GenreFilter.displayName = 'GenreFilter'
