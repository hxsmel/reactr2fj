import { useReducer } from 'react';
import { reducer } from '../Filters/Reducer.ts';
import { INITIAL_STATE } from '../constants';
import { FiltersStateContext, FiltersDispatchContext } from './FiltersContext.ts';
import { FiltersProviderProps } from '../types';

export function FiltersProvider({ children }: FiltersProviderProps) {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    return (
        <FiltersStateContext.Provider value={state}>
            <FiltersDispatchContext.Provider value={dispatch}>
                {children}
            </FiltersDispatchContext.Provider>
        </FiltersStateContext.Provider>
    );
}