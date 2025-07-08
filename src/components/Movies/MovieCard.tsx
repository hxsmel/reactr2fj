import React from 'react';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { MovieCardProps } from '../../types';
import { FavoriteBtn } from '../FavoriteBtn';

export const MovieCard: React.FC<MovieCardProps> = ({
                                                        id,
                                                        title,
                                                        rating,
                                                        image,
                                                        favorite = false,
                                                        disabled = false,
                                                        onToggleFavorite,
                                                        starPosition = 'top',
                                                    }) => (
    <Card
        sx={{
            width: 286,
            height: 324,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
        }}
    >
        <Box
            component={RouterLink}
            to={`/movies/${id}`}
            sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                textDecoration: 'none',
                color: 'inherit',
            }}
        >
            <CardMedia
                component="img"
                height="240"
                image={image}
                alt="Постер фильма"
            />
            <CardContent sx={{ flex: 1 }}>
                <Typography variant="subtitle1">{title}</Typography>
                <Typography variant="body2" color="text.secondary">
                    Рейтинг {rating}
                </Typography>
            </CardContent>
        </Box>

        <FavoriteBtn
            favorite={favorite}
            disabled={disabled}
            position={starPosition}
            onToggle={onToggleFavorite!}
        />
    </Card>
);