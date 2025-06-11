import { useState } from 'react'
import Box from '@mui/material/Box'
import { Header } from '../Header/Header'
import { Filters } from '../Filters/Filters'
import { MoviesList } from '../components/Movies/MoviesList'
import { AuthProvider } from '../Contexts/AuthContext'
import { FiltersProvider } from '../Contexts/FiltersProvider'
import { INITIAL_PAGE, TOTAL_PAGES } from '../constants'

export function App() {
    const [page, setPage] = useState<number>(INITIAL_PAGE)
    const [pagesCount, setPagesCount] = useState<number>(TOTAL_PAGES)

    return (
        <AuthProvider>
            <FiltersProvider>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: 1280,
                        height: 771,
                    }}
                >
                    <Header />

                    <Box
                        component="main"
                        sx={{
                            display: 'flex',
                            flex: 1,
                            mb: 2,
                        }}
                    >
                        <Box
                            component="aside"
                            sx={{
                                pl: 2,
                                pt: 2,
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <Filters
                                currentPage={page}
                                totalPages={pagesCount}
                                onPageChange={setPage}
                            />
                        </Box>

                        <Box
                            component="section"
                            sx={{
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                overflow: 'hidden',
                            }}
                        >
                            <MoviesList
                                currentPage={page}
                                onTotalPagesChange={setPagesCount}
                            />
                        </Box>
                    </Box>
                </Box>
            </FiltersProvider>
        </AuthProvider>
    )
}