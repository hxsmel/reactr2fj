import Box from '@mui/material/Box';
import { MovieCard } from './MovieCard';
import { Loader } from '../Loader';
import { ErrorMessage } from '../ErrorMessage';
import { MoviesListProps } from '../../types';
import { useMoviesList } from '../../hooks/useMoviesList';
import { useFavoriteIds } from '../../hooks/useFavoriteIds';
import { useToggleFavorite } from '../../hooks/useToggleFavorite';

export const MoviesList = ({ currentPage, onTotalPagesChange }: MoviesListProps) => {
    const { visibleMovies, loading, error } = useMoviesList(currentPage, onTotalPagesChange);

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
    if (error) return <ErrorMessage message={error} />;
    if (favError || toggleError) return <ErrorMessage message={favError || toggleError!} />;

    return (
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Box
                sx={{
                    flex: 1,
                    overflowY: 'auto',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 2,
                    p: 2,
                }}
            >
                {visibleMovies.map(m => {
                    const isFav = favoriteIds.includes(m.id);
                    const disabled = processingId === m.id;

                    return (
                        <MovieCard
                            key={m.id}
                            id={m.id}
                            title={m.title}
                            rating={m.vote_average}
                            image={
                                m.poster_path
                                    ? `https://image.tmdb.org/t/p/w300${m.poster_path}`
                                    : 'Здесь должна была быть картинка'
                            }
                            favorite={isFav}
                            disabled={disabled}
                            onToggleFavorite={() => toggle({ movieId: m.id, isFavorite: isFav })}
                        />
                    );
                })}
            </Box>
        </Box>
    );
};