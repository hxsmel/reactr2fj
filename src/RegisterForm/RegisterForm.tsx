import styles from './RegisterForm.module.scss';
import { useState } from 'react';
import { emailRegex } from '../constants.ts';

type Credentials = {
    email: string;
    username: string;
    password: string;
};

export function RegisterForm() {
    const [credentials, setCredentials] = useState<Credentials>({
        email: '',
        username: '',
        password: ''
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { email, username, password } = credentials;
        const newErrors: Record<string, string> = {};

        if (!emailRegex.test(email)) {
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

        console.log(`Регистрация прошла успешно\nEmail: ${email}\nUsername: ${username}\nПароль: ${password}`);
    };

    const handleChange = (field: keyof Credentials) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials(prev => ({ ...prev, [field]: e.target.value }));
        setErrors(prev => ({ ...prev, [field]: '' }));
    };

    return (
        <form className={styles.registerForm} onSubmit={handleSubmit}>
            <p className={styles.formTitle}>Register Form</p>

            <input
                type="email"
                name="email"
                placeholder="Email"
                className={styles.emailInput}
                value={credentials.email}
                onChange={handleChange('email')}
            />
            {errors.email && <span className={styles.errorText}>{errors.email}</span>}

            <input
                type="text"
                name="username"
                placeholder="Username"
                className={styles.usernameInput}
                value={credentials.username}
                onChange={handleChange('username')}
            />
            {errors.username && <span className={styles.errorText}>{errors.username}</span>}

            <input
                type="password"
                name="password"
                placeholder="Password"
                className={styles.passwordInput}
                value={credentials.password}
                onChange={handleChange('password')}
            />
            {errors.password && <span className={styles.errorText}>{errors.password}</span>}

            <button type="submit" className={styles.registerButton}>
                WELCOME TO THE CLUB, BUDDY
            </button>
        </form>
    );
}
