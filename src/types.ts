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

export type State = {
    sortBy: TSortBy;
    year: string;
    selectedGenres: Record<number, boolean>;
};

export type Action =
    | { type: 'setSortBy'; payload: TSortBy }
    | { type: 'setYear'; payload: string }
    | { type: 'toggleGenre'; payload: { id: number; checked: boolean } }
    | { type: 'initGenres'; payload: Record<number, boolean> }
    | { type: 'reset' };

export interface AuthContextType {
    token: string;
    setToken: (token: string) => void;
}

export type FiltersProviderProps = {
    children: ReactNode;
};