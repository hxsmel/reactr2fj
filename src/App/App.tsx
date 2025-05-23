import { useState} from "react";
import { Header} from "../Header/Header";
import { Filters } from "../Filters/Filters";
import { Pagination} from "../Pagination/Pagination";
import styles from './App.module.scss'
import { INITIAL_PAGE, TOTAL_PAGES } from "../constants";

export function App() {
    const [page, setPage] = useState(INITIAL_PAGE);

    return (
        <div className={styles.container}>
            <Header />

            <div className={styles.main}>
                <div className={styles.sidebar}>
                    <Filters />
                    <Pagination
                        currentPage={page}
                        totalPages={TOTAL_PAGES}
                        onPageChange={setPage}
                    />
                </div>
                <main className={styles.content}>

                </main>
            </div>
        </div>
    );
}