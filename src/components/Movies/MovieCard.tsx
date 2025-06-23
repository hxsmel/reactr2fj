import React from 'react';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    IconButton,
    CircularProgress,
    Box,
    CardActionArea,
} from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { MovieCardProps } from '../../types';

export const MovieCard: React.FC<MovieCardProps> = ({
                                                        id,
                                                        title,
                                                        rating,
                                                        image,
                                                        favorite = false,
                                                        disabled = false,
                                                        onToggleFavorite,
                                                    }) => (
    <Card sx={{ width: 286, height: 324 }}>
        <CardActionArea component={RouterLink} to={`/movies/${id}`}>
            <CardMedia
                component="img"
                height="240"
                image={image}
                alt="Постер фильма"
            />
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle1">{title}</Typography>
                    <IconButton
                        size="medium"
                        disabled={disabled}
                        onClick={e => {
                            e.preventDefault();
                            onToggleFavorite?.(id);
                        }}
                    >
                        {disabled ? (
                            <CircularProgress size={24} />
                        ) : favorite ? (
                            <Star sx={{ color: 'gold' }} />
                        ) : (
                            <StarBorder />
                        )}
                    </IconButton>
                </Box>
                <Typography variant="body2" color="text.secondary">
                    Рейтинг {rating}
                </Typography>
            </CardContent>
        </CardActionArea>
    </Card>
);