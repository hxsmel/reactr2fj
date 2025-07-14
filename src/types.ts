import { ReactNode } from 'react';
import {store} from "./store";

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
    disabled?: boolean;
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
    movieTitleFilter: string;
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
    disabled?: boolean;
}

export interface CastListProps {
    cast: Credits['cast'];
}

export interface InfoGridProps {
    movie: MovieInfo;
    credits: Credits;
}

export interface LoginDialogProps {
    open: boolean;
    onClose: () => void;
}

export type LoginStep = 'email' | 'token';

export interface EmailStepProps {
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    isEmailValid: boolean;
}

export interface EmailStepActionsProps {
    isEmailValid: boolean;
    handleRequest: () => void;
    handleDialogClose: () => void;
}

export interface TokenStepProps {
    token: string;
    setToken: React.Dispatch<React.SetStateAction<string>>;
}

export interface TokenStepActionsProps {
    token: string;
    handleConfirmToken: () => void;
    handleBackToEmail: () => void;
}

export type StepConfigMap = {
    email: {
        title: string;
        content: (props: EmailStepProps) => ReactNode;
        actions: (props: EmailStepActionsProps) => ReactNode;
    };
    token: {
        title: string;
        content: (props: TokenStepProps) => ReactNode;
        actions: (props: TokenStepActionsProps) => ReactNode;
    };
};

export interface FiltersProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
    movieTitleFilter?: string
    onMovieTitleFilterChange?: (value: string) => void
}

export interface GenreFilterProps {
    allGenres: Genre[]
    selectedMap: Record<number, boolean>
    onChange: (selected: Genre[]) => void
}

export interface FiltersHeaderProps {
    onReset: () => void
}

export interface FiltersTitleProps {
    value: string
    onChange: (value: string) => void
}

export interface SortByFilterProps {
    sortBy: TSortBy
    onChange: (value: TSortBy) => void
}

export interface YearFilterProps {
    yearRange: [number, number]
    onChange: (value: [number, number]) => void
}

export interface GenreFilterProps {
    allGenres: Genre[]
    selectedMap: Record<number, boolean>
    onChange: (value: Genre[]) => void
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface AuthState {
    token: string | null;
    user: { email: string } | null;
}

export interface CredentialsPayload {
    token: string;
    user: { email: string };
}