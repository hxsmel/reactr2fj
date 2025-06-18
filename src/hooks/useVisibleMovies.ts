import { TMDBResponse } from '../types'
import { MOVIES_PER_PAGE, TMDB_PER_PAGE } from '../constants'

export function useVisibleMovies(data: TMDBResponse, currentPage: number) {
    const startIndex = ((currentPage - 1) * MOVIES_PER_PAGE) % TMDB_PER_PAGE
    const visibleMovies = data.results.slice(startIndex, startIndex + MOVIES_PER_PAGE)
    const total = Math.min(data.total_results, 10000)
    const totalPages = Math.ceil(total / MOVIES_PER_PAGE)
    return { visibleMovies, totalPages }
}