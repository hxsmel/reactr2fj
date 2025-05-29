import { useContext } from 'react';
import { AuthContext } from '../constants';
import { AuthContextType } from '../types';

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth должен использоваться внутри AuthProvider');
    }
    return context;
}