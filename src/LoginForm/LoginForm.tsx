import styles from './LoginForm.module.scss';
import { useState } from 'react';

export function LoginForm() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

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
    }

    return (
        <form className={styles.loginForm} onSubmit={handleSubmit}>
            <p className={styles.loginFormTitle}>Login Form</p>
            <input
                type="text"
                name="username"
                className={styles.usernameInput}
                placeholder="Username"
                value={username}
                onChange={e => {
                    setUsername(e.target.value);
                    setErrors(prev => ({ ...prev, username: '' }));
                }}
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
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors(prev => ({ ...prev, password: '' }));
                    }}
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
