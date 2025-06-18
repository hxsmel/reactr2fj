import { AuthProvider } from '../Contexts/AuthProvider'
import { FiltersProvider } from '../Contexts/FiltersProvider'
import { Routes, Route } from 'react-router-dom'
import { MainPage } from './MainPage'
import { MovieDetails } from './MovieDetails/MovieDetails'

export function App() {
    return (
        <AuthProvider>
            <FiltersProvider>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/movies/:id" element={<MovieDetails />} />
                </Routes>
            </FiltersProvider>
        </AuthProvider>
    )
}