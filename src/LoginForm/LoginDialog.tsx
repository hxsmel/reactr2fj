import { useState, FC, useCallback } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { LoginDialogProps, LoginStep } from '../types';
import { useEmailValidation } from '../hooks/useEmailValidation';
import { stepConfig } from './stepConfig';
import { useAppDispatch } from '../hooks/redux';
import { setCredentials } from '../store/authSlice';

export const LoginDialog: FC<LoginDialogProps> = ({ open, onClose }) => {
    const dispatch = useAppDispatch();
    const [step, setStep] = useState<LoginStep>('email');
    const [email, setEmail] = useState<string>('');
    const [inputToken, setInputToken] = useState<string>('');
    const isEmailValid = useEmailValidation(email);

    const handleRequest = useCallback(() => {
        // Здесь можно будет вызвать API для отправки кода на email
        setStep('token');
    }, []);

    const handleConfirmToken = useCallback(() => {
        dispatch(setCredentials({ token: inputToken, user: { email } }));
        onClose();
    }, [dispatch, inputToken, email, onClose]);

    const handleBackToEmail = useCallback(() => {
        setInputToken('');
        setStep('email');
    }, []);

    const handleDialogClose = useCallback(() => {
        setEmail('');
        setInputToken('');
        setStep('email');
        onClose();
    }, [onClose]);

    return (
        <Dialog open={open} onClose={handleDialogClose}>
            <DialogTitle>
                {step === 'email' ? stepConfig.email.title : stepConfig.token.title}
            </DialogTitle>

            <DialogContent sx={{ minWidth: 300 }}>
                {step === 'email' &&
                    stepConfig.email.content({ email, setEmail, isEmailValid })}
                {step === 'token' &&
                    stepConfig.token.content({ token: inputToken, setToken: setInputToken })}
            </DialogContent>

            <DialogActions>
                {step === 'email' &&
                    stepConfig.email.actions({
                        isEmailValid,
                        handleRequest,
                        handleDialogClose,
                    })}
                {step === 'token' &&
                    stepConfig.token.actions({
                        token: inputToken,
                        handleConfirmToken,
                        handleBackToEmail,
                    })}
            </DialogActions>
        </Dialog>
    );
};