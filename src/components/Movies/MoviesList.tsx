import Box from '@mui/material/Box';
import { MovieCard } from './MovieCard';
import { Loader } from '../Loader';
import { ErrorMessage } from '../ErrorMessage';
import { MoviesListProps } from '../../types';
import { useMoviesList } from '../../hooks/useMoviesList';

export const MoviesList = ({ currentPage, onTotalPagesChange }: MoviesListProps) => {
    const { visibleMovies, loading, error } = useMoviesList(
        currentPage,
        onTotalPagesChange
    );

    if (loading) return <Loader />;
    if (error) return <ErrorMessage message={error} />;

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
                {visibleMovies.map((m) => (
                    <MovieCard
                        key={m.id}
                        title={m.title}
                        rating={m.vote_average}
                        image={
                            m.poster_path
                                ? `https://image.tmdb.org/t/p/w300${m.poster_path}`
                                : 'Здесь должна была быть картинка'
                        }
                        onToggleFavorite={() => {}}
                    />
                ))}
            </Box>
        </Box>
    );
};