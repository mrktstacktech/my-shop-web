import React, { useCallback, useEffect, useState } from 'react';
import type { User } from '../services/models';
import { AuthContext } from './auth-context';
import { AuthRepository } from '../services/repositories/authRepository.impl';
export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>();
    const [user, setUser] = useState<User | null>(null);

    const login = async ({ username, password }: { username: string, password: string }) => {
        try {
            // const response = await server.post<User>({ body: { username: username, password: password }, endpoint: EndPoints.LOGIN });
            const response = await new AuthRepository().login(username, password);
            const data = response;
            setUser(data);
            setIsAuthenticated(true);
            localStorage.setItem('accessToken', data.accessToken || '');
            return data;
        } catch (error) {
            console.error("Login error:", error);
            return null; // or throw an error based on your error handling strategy
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
    };

    const getUserInfo = useCallback(async () => {
        try {
            // const response = await server.post<User>({ body: { username: username, password: password }, endpoint: EndPoints.LOGIN });
            const response = await new AuthRepository().getUserInfo();
            const data = response;
            setUser(data);
            setIsAuthenticated(true);
            return data;
        } catch (error) {
            setUser(null);
            setIsAuthenticated(false);
            //clear localStorage
            return null;
        }
    }, []);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            getUserInfo();
        }else{
            setIsAuthenticated(false);
            setUser(null);
        }
    }, [getUserInfo]);

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

