import { useState } from 'react';
import styles from './LoginForm.module.scss';

type Credentials = {
    username: string;
    password: string;
};

export function LoginForm() {
    const [credentials, setCredentials] = useState<Credentials>({
        username: '',
        password: ''
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { username, password } = credentials;
        const newErrors: Record<string, string> = {};

        if (username.length < 4) {
            newErrors.username = 'Username должен содержать минимум 4 символа';
        }
        if (password.length < 8) {
            newErrors.password = 'Пароль должен содержать минимум 8 символов';
        }

        if (Object.keys(newErrors).length) {
            setErrors(newErrors);
            return;
        }

        console.log(`Пользователь успешно авторизован\nЛогин: ${username}\nПароль: ${password}`);
    };

    const handleChange = (field: keyof Credentials) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials(prev => ({ ...prev, [field]: e.target.value }));
        setErrors(prev => ({ ...prev, [field]: '' }));
    };

    return (
        <form className={styles.loginForm} onSubmit={handleSubmit}>
            <p className={styles.loginFormTitle}>Login Form</p>

            <input
                type="text"
                name="username"
                className={styles.usernameInput}
                placeholder="Username"
                value={credentials.username}
                onChange={handleChange('username')}
            />
            {errors.username && (
                <span className={styles.errorText}>
          {errors.username}
        </span>
            )}

            <input
                type="password"
                name="password"
                className={styles.passwordInput}
                placeholder="Password"
                value={credentials.password}
                onChange={handleChange('password')}
            />
            {errors.password && (
                <span className={styles.errorText}>
          {errors.password}
        </span>
            )}

            <button type="submit" className={styles.loginButton}>
                LOGIN
            </button>
        </form>
    );
}
