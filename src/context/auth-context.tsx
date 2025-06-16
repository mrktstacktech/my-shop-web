import { createContext } from "react";
import type { User } from "../services/models";


export interface AuthContextType {
    isAuthenticated?: boolean;
    setAuthenticated?: (isAuthenticated: boolean) => void;
    login: ({ username, password }: { username: string, password: string }) => Promise<User | null>;
    logout: () => void;
    user: User | null;
    setUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    setAuthenticated: () => { },
    login:() => Promise.resolve(null),
    logout: () => { },
    user: null,
    setUser: (user: User | null) => { }
})
