import styles from './RegisterForm.module.scss'

export default function RegisterForm() {
    return (
        <>
            <form className={styles.registerForm}>
                <p className={styles.registerFormTitle}>Register Form</p>
                <input
                    type="email"
                    className={styles.registerEmailInput}
                    placeholder="Email"
                />
                <input
                    type="text"
                    className={styles.registerUsernameInput}
                    placeholder="Username"
                />
                <input
                    type="text"
                    className={styles.registerPasswordInput}
                    placeholder="Password"
                />
                <button className={styles.registerButton}>
                    WELCOME TO THE CLUB, BODY
                </button>
            </form>
        </>
    );
}