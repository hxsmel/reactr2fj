import { Action, State } from '../types';
import { INITIAL_SORT_BY, INITIAL_YEAR_RANGE } from '../constants';

export function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'setSortBy':
            return { ...state, sortBy: action.payload };

        case 'initGenres':
            return { ...state, selectedGenres: action.payload };

        case 'toggleGenre':
            return {
                ...state,
                selectedGenres: {
                    ...state.selectedGenres,
                    [action.payload.id]: action.payload.checked,
                },
            };

        case 'setYearRange':
            return { ...state, yearRange: action.payload };

        case 'reset':
            return {
                sortBy: INITIAL_SORT_BY,
                selectedGenres: {},
                yearRange: INITIAL_YEAR_RANGE,
            };

        default:
            return state;
    }
}