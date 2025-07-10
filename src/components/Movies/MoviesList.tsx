import Box from '@mui/material/Box';
import { MovieCard } from './MovieCard';
import { Loader } from '../Loader';
import { ErrorMessage } from '../ErrorMessage';
import { MoviesListProps } from '../../types';
import { useMoviesList } from '../../hooks/useMoviesList';
import { useToggleFavorite } from '../../hooks/useToggleFavorite';

export const MoviesList = ({ currentPage, onTotalPagesChange, movieTitleFilter = '' }: MoviesListProps) => {
    const { visibleMovies, loading, error } = useMoviesList(currentPage, onTotalPagesChange, movieTitleFilter);
    const { favoriteIds, toggle, processingId, error: toggleError } = useToggleFavorite();

    if (loading) return <Loader />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <>
            {toggleError && <ErrorMessage message={toggleError} />}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ flex: 1, overflowY: 'auto', display: 'flex', flexWrap: 'wrap', gap: 2, p: 2 }}>
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
                                        : ''
                                }
                                favorite={isFav}
                                disabled={disabled}
                                starPosition="bottom"
                                onToggleFavorite={() => toggle({ movieId: m.id, isFavorite: isFav })}
                            />
                        );
                    })}
                </Box>
            </Box>
        </>
    );
};
