import { useMemo } from 'react';

export function useEmailValidation(email: string): boolean {
    return useMemo(() => {
        if (email.length === 0) return false;
        return /^\S+@\S+\.\S+$/.test(email);
    }, [email]);
}