import {ReactNode} from "react";

export type TFormType = 'login' | 'register';

export type TSortBy = 'Популярности' | 'Рейтингу' | 'Году';

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

export interface Movie {
    id: number
    title: string
    rating: number
    image: string
}

export interface MovieCardProps {
    title: string
    rating: number
    image: string
    favorite?: boolean
    onToggleFavorite?: () => void
}

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}