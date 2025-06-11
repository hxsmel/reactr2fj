import React, { useContext, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { MovieCard } from './MovieCard'
import { useFetch } from '../../hooks/useFetch'
import { useAuth } from '../../Contexts/UseAuth'
import { FiltersStateContext } from '../../Contexts/FiltersContext'
import { MoviesListProps, TMDBResponse } from '../../types'
import { MOVIES_PER_PAGE, TMDB_PER_PAGE } from '../../constants'

export const MoviesList: React.FC<MoviesListProps> = ({
                                                          currentPage,
                                                          onTotalPagesChange,
                                                      }) => {
    const { token } = useAuth()
    const filtersContext = useContext(FiltersStateContext)
    if (!filtersContext) throw new Error('MoviesList должен находиться внутри FiltersProvider')
    const { sortBy } = filtersContext

    const rawTmdbPage = Math.ceil((currentPage * MOVIES_PER_PAGE) / TMDB_PER_PAGE)
    const tmdbPage = Math.min(rawTmdbPage, 500)

    const endpoint = sortBy === 'Популярности' ? 'movie/popular' : 'movie/top_rated'
    const url = `https://api.themoviedb.org/3/${endpoint}?language=ru-RU&page=${tmdbPage}`

    const options = token
        ? {
            method: 'GET' as const,
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }
        : undefined

    const { data, loading, error } = useFetch<TMDBResponse>(url, options)

    useEffect(() => {
        if (data) {
            const total = Math.min(data.total_results, 10000)
            const pages = Math.ceil(total / MOVIES_PER_PAGE)
            onTotalPagesChange(pages)
        }
    }, [data, onTotalPagesChange])

    if (loading) return <Typography>Загрузка...</Typography>
    if (error) return <Typography color="error">{error}</Typography>
    if (!data) return null

    const startIndex = ((currentPage - 1) * MOVIES_PER_PAGE) % TMDB_PER_PAGE
    const visibleMovies = data.results.slice(startIndex, startIndex + MOVIES_PER_PAGE)

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
    )
}