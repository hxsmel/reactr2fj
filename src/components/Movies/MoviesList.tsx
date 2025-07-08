import { useState } from 'react';
import Box from '@mui/material/Box';
import { MovieCard } from './MovieCard';
import { Loader } from '../Loader';
import { ErrorMessage } from '../ErrorMessage';
import { MoviesListProps } from '../../types';
import { useMoviesList } from '../../hooks/useMoviesList';
import { useFavoriteIds } from '../../hooks/useFavoriteIds';
import { useToggleFavorite } from '../../hooks/useToggleFavorite';

export const MoviesList = ({
                               currentPage,
                               onTotalPagesChange,
                               movieTitleFilter = '',
                           }: MoviesListProps) => {
    const { visibleMovies, loading, error } = useMoviesList(
        currentPage,
        onTotalPagesChange,
        movieTitleFilter
    );

    const {
        favoriteIds,
        setFavoriteIds,
        error: favError,
        refresh: reloadFavorites,
    } = useFavoriteIds();

    const {
        toggle,
        processingId,
        error: toggleError,
    } = useToggleFavorite(reloadFavorites);

    const [localError, setLocalError] = useState<string | null>(null);

    if (loading) return <Loader />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <>
            {(favError || toggleError || localError) && (
                <ErrorMessage
                    message={localError || favError || toggleError!}
                />
            )}
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

                        const handleToggle = () => {
                            const prev = [...favoriteIds];
                            const next = isFav
                                ? favoriteIds.filter(id => id !== m.id)
                                : [...favoriteIds, m.id];
                            setFavoriteIds(next);

                            toggle({ movieId: m.id, isFavorite: isFav }).catch(e => {
                                setFavoriteIds(prev);
                                setLocalError(
                                    e.message || 'Ошибка при обновлении избранного'
                                );
                            });
                        };

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
                                onToggleFavorite={handleToggle}
                            />
                        );
                    })}
                </Box>
            </Box>
        </>
    );
};
