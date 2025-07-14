import { FiltersProvider } from '../Contexts/FiltersProvider'
import { Routes, Route } from 'react-router-dom'
import { MainPage } from './MainPage'
import { MovieDetails } from './MovieDetails/MovieDetails'
import { Provider } from 'react-redux';
import { store } from '../store';

export function App() {
    return (
        <Provider store={store}>
            <FiltersProvider>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/movies/:id" element={<MovieDetails />} />
                </Routes>
            </FiltersProvider>
        </Provider>
    )
}