import styles from './Header.module.scss';

export function Header() {
    return (
        <header className={styles.header}>
            <h1 className={styles.films}>
                Фильмы
            </h1>
            <button className={styles.enterBtn}>
                Войти
            </button>
        </header>
    )
}