import {memo, useMemo} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import {MAX_YEAR, MIN_YEAR} from "../constants";
import { YearFilterProps } from "../types";

function YearFilterComponent({ yearRange, onChange }: YearFilterProps) {
    const marks = useMemo(
        () => [
            { value: MIN_YEAR, label: String(MIN_YEAR) },
            { value: MAX_YEAR, label: String(MAX_YEAR) },
        ],
        []
    )

    return (
        <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Год релиза</Typography>
            <Slider
                value={yearRange}
                onChange={(_, val) => onChange(val as [number, number])}
                valueLabelDisplay="on"
                min={MIN_YEAR}
                max={MAX_YEAR}
                marks={marks}
            />
        </Box>
    )
}

export const YearFilter = memo(YearFilterComponent)
YearFilter.displayName = 'YearFilter'