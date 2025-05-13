import { useState } from 'react';
import styles from './EnterSiteForm.module.scss';
import { LoginForm } from '../LoginForm/LoginForm';
import { RegisterForm } from '../RegisterForm/RegisterForm';
import { TFormType } from "./types";

export function EnterSiteForm() {

    const [isOpen, setIsOpen] = useState(true);
    const [formType, setFormType] = useState<TFormType>('register');

    const openModal = (type: TFormType) => {
        setFormType(type);
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    return (
        <section className={styles.enterButtons}>

            {!isOpen && (
                <>
                    <button
                        type="button"
                        className={styles.loginBtn}
                        onClick={() => openModal("login")}>Войти</button>
                    <button
                        type="button"
                        className={styles.registerBtn}
                        onClick={() => openModal("register")}>Регистрация</button>
                </>
            )}

            {isOpen && (
                <div className={styles.modalContent}>
                    <button
                        type="button"
                        onClick={closeModal}
                        className={styles.closeBtn}>X</button>
                    {formType === "login" ? <LoginForm /> : <RegisterForm />}
                </div>
            )}
        </section>
    );
}