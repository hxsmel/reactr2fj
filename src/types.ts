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