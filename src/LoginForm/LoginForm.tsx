import styles from './LoginForm.module.scss';

export default function LoginForm() {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const username = (formData.get('username') as string || '').trim();
        const password = (formData.get('password') as string || '').trim();

        if (username.length < 4) {
            alert('Логин должен содержать минимум 4 символа');
            return;
        }

        if (password.length < 8) {
            alert('Пароль должен содержать минимум 8 символов');
            return;
        }

        console.log(`Пользователь успешно авторизован\nЛогин: ${username}\nПароль: ${password}`);
    };

    return (
        <form className={styles.loginForm} onSubmit={handleSubmit}>
            <p className={styles.loginFormTitle}>Login Form</p>
            <input
                type="text"
                name="username"
                className={styles.usernameInput}
                placeholder="Username"
            />
            <input
                type="password"
                name="password"
                className={styles.passwordInput}
                placeholder="Password"
            />
            <button type="submit" className={styles.loginButton}>
                LOGIN
            </button>
        </form>
    );
}
