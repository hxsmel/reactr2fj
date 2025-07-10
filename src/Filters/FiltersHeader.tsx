import {memo} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { FiltersHeaderProps } from '../types'

function FiltersHeaderComponent({ onReset }: FiltersHeaderProps) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">Фильтры</Typography>
            <IconButton size="small" onClick={onReset}>
                <CloseIcon />
            </IconButton>
        </Box>
    )
}

export const FiltersHeader = memo(FiltersHeaderComponent)
FiltersHeader.displayName = 'FiltersHeader'