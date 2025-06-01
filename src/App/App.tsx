import { Header } from '../Header/Header';
import { Filters } from '../Filters/Filters';
import { Pagination } from '../Pagination/Pagination';
import { AuthProvider } from '../Contexts/AuthContext';
import { FiltersProvider } from '../Contexts/FiltersProvider';
import styles from './App.module.scss';
import { INITIAL_PAGE, TOTAL_PAGES } from '../constants';
import { useState } from 'react';

export function App() {
    const [page, setPage] = useState<number>(INITIAL_PAGE);

    return (
        <AuthProvider>
            <FiltersProvider>
                <div className={styles.container}>
                    <Header />

                    <div className={styles.main}>
                        <aside className={styles.sidebar}>
                            <Filters />
                            <Pagination
                                currentPage={page}
                                totalPages={TOTAL_PAGES}
                                onPageChange={setPage}
                            />
                        </aside>

                        <main className={styles.content} />
                    </div>
                </div>
            </FiltersProvider>
        </AuthProvider>
    );
}
