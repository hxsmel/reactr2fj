import { useState, FC, useCallback } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { LoginDialogProps, LoginStep } from '../types';
import { useEmailValidation } from '../hooks/useEmailValidation';
import { stepConfig } from './stepConfig';

export const LoginDialog: FC<LoginDialogProps> = ({ open, onClose }) => {
    const [step, setStep] = useState<LoginStep>('email');
    const [email, setEmail] = useState<string>('');
    const [token, setToken] = useState<string>('');
    const isEmailValid = useEmailValidation(email);

    const handleRequest = useCallback(() => {
        setStep('token');
    }, []);

    const handleConfirmToken = useCallback(() => {
        onClose();
    }, [onClose]);

    const handleBackToEmail = useCallback(() => {
        setToken('');
        setStep('email');
    }, []);

    const handleDialogClose = useCallback(() => {
        setEmail('');
        setToken('');
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
                    stepConfig.token.content({ token, setToken })}
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
                        token,
                        handleConfirmToken,
                        handleBackToEmail,
                    })}
            </DialogActions>
        </Dialog>
    );
};