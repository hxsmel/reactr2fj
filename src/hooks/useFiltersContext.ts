import { useContext } from 'react'
import { FiltersStateContext } from '../Contexts/FiltersContext.ts'

export function useFiltersContext() {
    const filtersContext = useContext(FiltersStateContext)
    if (!filtersContext) {
        throw new Error('useFiltersContext должен вызываться внутри FiltersProvider')
    }
    return filtersContext
}