import styles from './RegisterForm.module.scss';

export default function RegisterForm() {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const email = (formData.get('email') as string || '').trim();
        const username = (formData.get('username') as string || '').trim();
        const password = (formData.get('password') as string || '').trim();

        // Валидация
        if (email.length < 4) {
            alert('Email должен содержать минимум 1 символ');
            return;
        }

        if (username.length < 4) {
            alert('Username должен содержать минимум 4 символа');
            return;
        }

        if (password.length < 8) {
            alert('Password должен содержать минимум 8 символов');
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
            />
            <input
                type="text"
                name="username"
                className={styles.registerUsernameInput}
                placeholder="Username"
            />
            <input
                type="password"
                name="password"
                className={styles.registerPasswordInput}
                placeholder="Password"
            />
            <button
                type="submit"
                className={styles.registerButton}
            >
                WELCOME TO THE CLUB, BODY
            </button>
        </form>
    );
}
