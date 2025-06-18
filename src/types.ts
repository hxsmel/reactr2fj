import { ReactNode } from 'react';

export type TFormType = 'login' | 'register';

export type TSortBy = 'Популярности' | 'Рейтингу';

export interface Genre {
    id: number;
    name: string;
}

export interface OptionData {
    label: string;
    value: string;
}

export type Action =
    | { type: 'setSortBy'; payload: TSortBy }
    | { type: 'initGenres'; payload: Record<number, boolean> }
    | { type: 'toggleGenre'; payload: { id: number; checked: boolean } }
    | { type: 'reset' }
    | { type: 'setYearRange'; payload: [number, number] };

export interface State {
    sortBy: TSortBy;
    selectedGenres: Record<number, boolean>;
    yearRange: [number, number];
}

export interface AuthContextType {
    token: string;
    setToken: (token: string) => void;
}

export type FiltersProviderProps = {
    children: ReactNode;
};

export interface MovieCardProps {
    id: number;
    title: string;
    rating: number;
    image: string;
    favorite?: boolean;
    onToggleFavorite?: (id: number) => void;
}

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export interface MoviesListProps {
    currentPage: number;
    onTotalPagesChange: (total: number) => void;
}

export interface TMDBResponse {
    page: number;
    results: Array<{
        id: number;
        title: string;
        vote_average: number;
        poster_path: string | null;
    }>;
    total_pages: number;
    total_results: number;
}

export interface ErrorMessageProps {
    message: string;
}

export type MovieInfo = {
    id: number;
    title: string;
    release_date: string;
    poster_path: string | null;
    production_countries: { name: string }[];
    genres: { name: string }[];
    budget: number;
    revenue: number;
    runtime: number;
};

export type Credits = {
    cast: { id: number; name: string }[];
    crew: { job: string; name: string }[];
};

export interface MovieHeaderProps {
    movie: MovieInfo;
    isFav: boolean;
    onBack: () => void;
    onToggleFavorite: () => void;
}

export interface CastListProps {
    cast: Credits['cast'];
}

export interface InfoGridProps {
    movie: MovieInfo;
    credits: Credits;
}