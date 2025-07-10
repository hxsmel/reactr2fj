import React from 'react';
import { IconButton, CircularProgress } from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';
import { FavoriteBtnProps } from '../types'

export const FavoriteBtn: React.FC<FavoriteBtnProps> = ({
                                                            favorite,
                                                            disabled,
                                                            position,
                                                            onToggle,
                                                        }) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();
        onToggle();
    };

    const style = {
        position: 'absolute' as const,
        right: 8,
        ...(position === 'top' ? { top: 8 } : { bottom: 8 }),
        backgroundColor: 'rgba(255,255,255,0.8)',
        '&:hover': { backgroundColor: 'rgba(255,255,255,1)' },
    };

    return (
        <IconButton
            size="medium"
            disabled={disabled}
            onClick={handleClick}
            sx={style}
        >
            {disabled ? (
                <CircularProgress size={24} />
            ) : favorite ? (
                <Star sx={{ color: 'gold' }} />
            ) : (
                <StarBorder />
            )}
        </IconButton>
    );
};