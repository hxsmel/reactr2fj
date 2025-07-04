import { useParams, useNavigate } from 'react-router-dom';
import { Box, CardMedia, Typography } from '@mui/material';
import { useMovieDetails } from '../../hooks/useMovieDetails';
import { useFavoriteIds } from '../../hooks/useFavoriteIds';
import { useToggleFavorite } from '../../hooks/useToggleFavorite';
import { MovieHeader } from './MovieHeader';
import { CastList } from './CastList';
import { InfoGrid } from './InfoGrid';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Loader } from '../../components/Loader';

export function MovieDetails() {
    const { id } = useParams<{ id: string }>();
    const movieId = Number(id);
    const navigate = useNavigate();
    const { movie, credits, loading, error } = useMovieDetails(id);
    const {
        favoriteIds,
        error: favError,
        refresh: reloadFavorites,
    } = useFavoriteIds();
    const {
        toggle,
        processingId,
        error: toggleError,
    } = useToggleFavorite(reloadFavorites);

    if (loading) return <Loader />;

    if (error || !movie || !credits) {
        return (
            <Typography p={2} color="error">
                {error || 'Что-то пошло не так'}
            </Typography>
        );
    }

    if (favError || toggleError) {
        return <ErrorMessage message={favError || toggleError!} />;
    }

    const isFav = favoriteIds.includes(movieId);
    const disabled = processingId === movieId;

    return (
        <>
            <MovieHeader
                movie={movie}
                isFav={isFav}
                onBack={() => navigate(-1)}
                onToggleFavorite={() => toggle({ movieId, isFavorite: isFav })}
                disabled={disabled}
            />

            <Box sx={{ display: 'flex', p: 2, gap: 4, color: '#fff' }}>
                <CardMedia
                    component="img"
                    sx={{ width: 300, borderRadius: 1 }}
                    image={
                        movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                            : ''
                    }
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
