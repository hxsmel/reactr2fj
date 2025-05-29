import { ReactNode, useState } from 'react';
import { TOKEN, AuthContext } from '../constants';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string>(TOKEN);
    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};