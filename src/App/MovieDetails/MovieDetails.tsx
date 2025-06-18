import { useParams, useNavigate } from 'react-router-dom';
import { Box, CardMedia, Typography, CircularProgress } from '@mui/material';
import { useMovieDetails } from '../../hooks/useMovieDetails';
import { MovieHeader } from './MovieHeader';
import { CastList } from './CastList';
import { InfoGrid } from './InfoGrid';

export function MovieDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { movie, credits, loading, error, isFav, toggleFavorite } = useMovieDetails(id);

    if (loading) {
        return (
            <Box sx={{ p: 2, textAlign: 'center', color: '#fff' }}>
                <CircularProgress color="inherit" />
                <Typography mt={1}>Загрузка…</Typography>
            </Box>
        );
    }

    if (error || !movie || !credits) {
        return <Typography p={2} color="#fff">{error}</Typography>;
    }

    return (
        <>
            <MovieHeader
                movie={movie}
                isFav={isFav}
                onBack={() => navigate(-1)}
                onToggleFavorite={toggleFavorite}
            />

            <Box sx={{ display: 'flex', p: 2, gap: 4, color: '#fff' }}>
                <CardMedia
                    component="img"
                    sx={{ width: 300, borderRadius: 1 }}
                    image={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : ''}
                    alt={movie.title}
                />

                <Box sx={{ flex: 1 }}>
                    <Typography variant="h4" gutterBottom color="#fff">
                        {movie.title} ({new Date(movie.release_date).getFullYear()})
                    </Typography>

                    <CastList cast={credits.cast} />
                    <InfoGrid movie={movie} credits={credits} />
                </Box>
            </Box>
        </>
    );
}