import React from 'react';
import MuiPagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { PaginationProps } from '../types';

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        onPageChange(value);
    };

    if (totalPages <= 1) return null;

    return (
        <Stack spacing={2} alignItems="center" sx={{ my: 2 }}>
            <MuiPagination
                count={totalPages}
                page={currentPage}
                onChange={handleChange}
                color="primary"
            />
        </Stack>
    );
}