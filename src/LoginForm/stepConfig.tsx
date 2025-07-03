import { Button, TextField } from '@mui/material';
import {
    EmailStepProps,
    EmailStepActionsProps,
    TokenStepProps,
    TokenStepActionsProps,
    StepConfigMap,
} from '../types';

export const stepConfig: StepConfigMap = {
    email: {
        title: 'Запросить токен',
        content: ({ email, setEmail, isEmailValid }: EmailStepProps) => (
            <TextField
                autoFocus
                label="почта"
                type="email"
                fullWidth
                variant="standard"
                value={email}
                onChange={e => setEmail(e.target.value)}
                error={email.length > 0 && !isEmailValid}
                helperText={
                    email.length > 0 && !isEmailValid
                        ? 'Введите корректный email'
                        : undefined
                }
            />
        ),
        actions: ({ isEmailValid, handleRequest, handleDialogClose }: EmailStepActionsProps) => (
            <>
                <Button onClick={handleDialogClose}>ОТМЕНА</Button>
                <Button onClick={handleRequest} disabled={!isEmailValid}>
                    ЗАПРОСИТЬ
                </Button>
            </>
        ),
    },
    token: {
        title: 'Введите токен',
        content: ({ token, setToken }: TokenStepProps) => (
            <TextField
                autoFocus
                label="токен"
                type="text"
                fullWidth
                variant="standard"
                value={token}
                onChange={e => setToken(e.target.value)}
            />
        ),
        actions: ({ token, handleConfirmToken, handleBackToEmail }: TokenStepActionsProps) => (
            <>
                <Button onClick={handleBackToEmail}>ОТМЕНА</Button>
                <Button onClick={handleConfirmToken} disabled={!token.trim()}>
                    ОК
                </Button>
            </>
        ),
    },
};