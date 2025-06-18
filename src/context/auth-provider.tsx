import React, { useCallback, useEffect, useState } from 'react';
import type { User } from '../services/models';
import { AuthContext } from './auth-context';
import { AuthRepository } from '../services/repositories/authRepository.impl';
import { useNavigate } from 'react-router-dom';
export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>();
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    const login = async ({ username, password }: { username: string, password: string }) => {
        try {
            // const response = await server.post<User>({ body: { username: username, password: password }, endpoint: EndPoints.LOGIN });
            const response = await new AuthRepository().login(username, password);
            const data = response;
            setUser(data);
            setIsAuthenticated(true);
            localStorage.setItem('accessToken', data.accessToken || '');
            localStorage.setItem('refreshToken', data.refreshToken || '');
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

    const refreshToken = async (refreshToken: string) => {
        try {
            // const response = await server.post<User>({ body: { refreshToken: refreshToken }, endpoint: EndPoints.REFRESH_TOKEN });
            const response = await new AuthRepository().requestNewToken(refreshToken);
            const data = response;
            setIsAuthenticated(true);
            localStorage.setItem('accessToken', data.accessToken || '');
            localStorage.setItem('refreshToken', data.refreshToken || '');
        } catch (error) {
            localStorage.removeItem('refreshToken');
            navigate("/login");
            console.error("Refresh token error:", error);
        }
    }

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
            localStorage.removeItem('accessToken');
            return null;
        }
    }, []);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const storedRefreshToken = localStorage.getItem('refreshToken');
        if (accessToken) {
            getUserInfo();
        } else if (storedRefreshToken) {
            refreshToken(storedRefreshToken)
                .catch(() => {
                    // setIsAuthenticated(false);
                    // setUser(null);
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    navigate("/login");
                });
        }
        else {
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

