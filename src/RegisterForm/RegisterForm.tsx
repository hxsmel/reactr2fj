import styles from './RegisterForm.module.scss';
import { useState } from 'react';
import { emailRegex } from '../constants.ts';

export function RegisterForm() {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newErrors: Record<string, string> = {};

        if (!email) {
            newErrors.email = 'Email обязателен';
        } else if (!emailRegex.test(email)) {
            newErrors.email = 'Введите корректный email';
        }
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

        console.log(`Пользователь успешно зарегистрирован\nЛогин: ${username}\nПароль: ${password}`);
    };

    return (
        <form className={styles.registerForm} onSubmit={handleSubmit}>
            <p className={styles.registerFormTitle}>Register Form</p>

            <input
                type="email"
                name="email"
                className={styles.registerEmailInput}
                placeholder="Email"
                value={email}
                onChange={e => {
                    setEmail(e.target.value);
                    setErrors(prev => ({ ...prev, email: '' }));
                }}
            />
            {errors.email && (
                <span className={styles.errorText}>
        {errors.email}
      </span>
            )}

            <input
                type="text"
                name="username"
                className={styles.registerUsernameInput}
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
                className={styles.registerPasswordInput}
                placeholder="Password"
                value={password}
                onChange={e => {
                    setPassword(e.target.value);
                    setErrors(prev => ({ ...prev, password: '' }));
                }}
            />
            {errors.password && (
                <span className={styles.errorText}>
        {errors.password}
      </span>
            )}

            <button type="submit" className={styles.registerButton}>
                WELCOME TO THE CLUB, BUDDY
            </button>
        </form>
    );
}
