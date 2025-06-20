import { MovieInfo, Credits } from '../types';
import { formatYear, formatRuntime, formatBudget, formatRevenue } from './formatters';

export function getInfoGridRows(
    movie: MovieInfo,
    credits: Credits
): readonly (readonly [string, string])[] {
    return [
        ['Страна', movie.production_countries[0]?.name || '—'],
        ['Год', formatYear(movie.release_date)],
        ['Жанр', movie.genres.map(g => g.name).join(', ') || '—'],
        ['Режиссер', credits.crew.find(c => c.job === 'Director')?.name || '—'],
        [
            'Сценарий',
            credits.crew
                .filter(c => c.job === 'Screenplay')
                .map(c => c.name)
                .join(', ') || '—'
        ],
        ['Бюджет', formatBudget(movie.budget)],
        ['Выручка', formatRevenue(movie.revenue)],
        ['Время', formatRuntime(movie.runtime)],
    ] as const;
}
