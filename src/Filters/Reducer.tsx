import {Action, State} from "../types.ts";
import {INITIAL_SORT_BY, INITIAL_YEAR} from "../constants.ts";

export function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'setSortBy':
            return { ...state, sortBy: action.payload };
        case 'setYear':
            return { ...state, year: action.payload };
        case 'toggleGenre':
            return {
                ...state,
                selectedGenres: {
                    ...state.selectedGenres,
                    [action.payload.id]: action.payload.checked
                }
            };
        case 'initGenres':
            return {
                ...state,
                selectedGenres: action.payload
            };
        case 'reset':
            return {
                sortBy: INITIAL_SORT_BY,
                year: INITIAL_YEAR,
                selectedGenres: {}
            };
        default:
            return state;
    }
}