import {memo} from "react";
import TextField from "@mui/material/TextField";
import { FiltersTitleProps } from '../types'

function FiltersTitleComponent({ value, onChange }: FiltersTitleProps) {
    return (
        <TextField
            fullWidth
            variant="standard"
            label="Название фильма"
            value={value}
            onChange={e => onChange(e.target.value)}
            sx={{ mb: 3 }}
        />
    )
}

export const FiltersTitle = memo(FiltersTitleComponent)
FiltersTitle.displayName = 'FiltersTitle'