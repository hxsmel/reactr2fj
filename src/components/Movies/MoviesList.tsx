import React from 'react'
import Box from '@mui/material/Box'
import { MovieCard } from './MovieCard'
import { Movie } from '../../types'

const mockMovies: Movie[] = [
    { id: 1, title: 'Матрица',       rating: 9, image: '/images/matrix.jpg' },
    { id: 2, title: 'Терминатор 2',  rating: 9, image: '/images/terminator2.jpg' },
    { id: 3, title: 'Зелёная миля',  rating: 9, image: '/images/greenmile.jpg' },
    { id: 4, title: 'Терминатор 3',  rating: 9, image: '/images/terminator3.jpg' },
]
    //картинок пока нет, я на будущее прописал

export const MoviesList: React.FC = () => (
    <Box
        sx={{
            p: 2,
            elevation: 1,
            flex: 1,
            overflowY: 'auto',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            justifyContent: 'flex-start',
        }}
    >
        {mockMovies.map((m) => (
            <MovieCard
                key={m.id}
                title={m.title}
                rating={m.rating}
                image={m.image}
                onToggleFavorite={() => {}}
            />
        ))}
    </Box>
)