import {memo} from "react";
import {TSortBy} from "../types.ts";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import {SORT_OPTIONS} from "../constants";
import MenuItem from "@mui/material/MenuItem";
import { SortByFilterProps } from "../types";

function SortByFilterComponent({ sortBy, onChange }: SortByFilterProps) {
    return (
        <FormControl fullWidth variant="standard" sx={{ mb: 2 }}>
            <InputLabel>Сортировать по</InputLabel>
            <Select
                variant="standard"
                value={sortBy}
                onChange={e => onChange(e.target.value as TSortBy)}
            >
                {SORT_OPTIONS.map(opt => (
                    <MenuItem key={opt.value} value={opt.value}>
                        {opt.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export const SortByFilter = memo(SortByFilterComponent)
SortByFilter.displayName = 'SortByFilter'