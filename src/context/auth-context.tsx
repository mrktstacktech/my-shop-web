import React, { createContext, useCallback, useEffect, useState } from 'react';
import type { User } from '../services/models/user.model';

export interface AuthContextType {
    isAuthenticated?: boolean;
    setAuthenticated?: (isAuthenticated: boolean) => void;
    login: ({ username, password }: { username: string, password: string }) => void;
    logout: () => void;
    user: User | null;
    setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    login: () => { },
    logout: () => { },
    user: null,
    setUser: (user: User | null) => { },
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>();
    const [user, setUser] = useState<User | null>(null);

    const login = () => {
        setIsAuthenticated(true);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
    };

    const checkIsUserLogin = useCallback(() => {
        const accessToken = localStorage.getItem('accessToken');
        console.log("Access Token:", accessToken);
        if (accessToken) {
            // Get me - check validation of access token
        } else {
            console.log("No access token found, user is not authenticated.");
            setIsAuthenticated(false);
            setUser(null);
        }
    }, []);

    useEffect(() => {
        checkIsUserLogin();
    }, [checkIsUserLogin]);

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            login, logout, user, setUser,
            setAuthenticated: setIsAuthenticated
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
}