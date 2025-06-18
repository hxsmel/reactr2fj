import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { ErrorMessageProps } from '../types'

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
    <Box p={2}>
        <Typography variant="body1" color="error">
            {message}
        </Typography>
    </Box>
)