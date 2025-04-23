import styles from './Pagination.module.scss';
import { getPageItems } from './getPageItems';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    if (totalPages <= 1) return null;

    const items = getPageItems(currentPage, totalPages);
    const handle = (p: number) => {
        const next = Math.min(Math.max(p, 1), totalPages);
        if (next !== currentPage) onPageChange(next);
    };

    return (
        <ul className={styles.pagination}>
            <li>
                <button onClick={() => handle(currentPage - 1)} disabled={currentPage === 1}>
                    &lt;
                </button>
            </li>
            {items.map((item, idx) =>
                typeof item === 'number' ? (
                    <li key={idx}>
                        <button
                            className={item === currentPage ? styles.active : ''}
                            onClick={() => handle(item)}
                        >
                            {item}
                        </button>
                    </li>
                ) : (
                    <li key={idx} className={styles.ellipsis}>
                        &hellip;
                    </li>
                )
            )}
            <li>
                <button onClick={() => handle(currentPage + 1)} disabled={currentPage === totalPages}>
                    &gt;
                </button>
            </li>
        </ul>
    );
}