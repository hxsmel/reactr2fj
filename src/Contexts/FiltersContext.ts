import { createContext, Dispatch } from 'react';
import { Action, State } from '../types';

export const FiltersStateContext = createContext<State | undefined>(undefined);
export const FiltersDispatchContext = createContext<Dispatch<Action> | undefined>(undefined);