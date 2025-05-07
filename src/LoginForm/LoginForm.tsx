import styles from './LoginForm.module.scss'

export default function LoginForm() {
    return (
        <>
            <form className={styles.loginForm}>
                <p className={styles.loginFormTitle}>Login Form</p>
                <input type="text" className={styles.usernameInput} placeholder="Username" />
                <input type="text" className={styles.passwordInput} placeholder="Password" />
                <button className={styles.loginButton}>LOGIN</button>
            </form>
        </>
    );
}