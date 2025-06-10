import React, { useState} from 'react'
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    IconButton,
    Box
} from '@mui/material'
import { Star, StarBorder } from '@mui/icons-material'
import { MovieCardProps } from '../../types'

export const MovieCard: React.FC<MovieCardProps> = ({
                                                        title,
                                                        rating,
                                                        image,
                                                        favorite = false,
                                                        onToggleFavorite,
                                                    }) => {
    const [isFavorite, setIsFavorite] = useState<boolean>(favorite)

    const handleClick = () => {
        setIsFavorite(prev => !prev)
        if (onToggleFavorite) onToggleFavorite()
    }

    return (
        <Card sx={{width: 286, height: 324}}>
            <CardMedia
                component="img"
                height="240"
                image={image}
                alt={"Тут будет картинка"}
            />
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle1" component="div">
                        {title}
                    </Typography>
                    <IconButton size="medium" onClick={handleClick}>
                        {isFavorite ? (
                            <Star sx={{color: 'gold'}}/>
                        ) : (
                            <StarBorder/>
                        )}
                    </IconButton>
                </Box>
                <Typography variant="body2" color="text.secondary">
                    Рейтинг {rating}
                </Typography>
            </CardContent>
        </Card>
    )
}