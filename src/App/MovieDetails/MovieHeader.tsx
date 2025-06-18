import { FC } from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { ArrowBack, Star, StarBorder } from '@mui/icons-material';
import { MovieHeaderProps } from '../../types';

export const MovieHeader: FC<MovieHeaderProps> = ({ movie, isFav, onBack, onToggleFavorite }) => {
    const year = new Date(movie.release_date).getFullYear();

    return (
        <AppBar position="static" sx={{ backgroundColor: '#2196F3' }}>
            <Toolbar>
                <IconButton edge="start" color="inherit" onClick={onBack}>
                    <ArrowBack sx={{ color: '#fff' }} />
                </IconButton>
                <Typography variant="h6" sx={{ flex: 1, color: '#fff' }}>
                    {movie.title} ({year})
                </Typography>
                <IconButton color="inherit" onClick={onToggleFavorite}>
                    {isFav ? <Star sx={{ color: 'gold' }} /> : <StarBorder sx={{ color: '#fff' }} />}
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};