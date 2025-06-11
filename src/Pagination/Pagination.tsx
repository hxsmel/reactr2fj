import React from 'react'
import MuiPagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { PaginationProps } from '../types'

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        onPageChange(value)
    }

    if (totalPages <= 1) return null

    return (
        <Stack
            direction="row"
            spacing={2}
            alignItems="center"
        >
            <MuiPagination
                count={totalPages}
                page={currentPage}
                onChange={handleChange}
                color="primary"
                size="small"
            />
        </Stack>
    )
}