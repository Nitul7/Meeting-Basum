// src/context/AuthContext.tsx
import { createContext, useContext, useState } from "react";
import { getAccessToken, getRefreshToken, getUser } from "../utils/localstorage";


export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [accessToken, setAccessToken] = useState(getAccessToken());
    const [refreshToken, setRefreshToken] = useState(getRefreshToken());
    const [user, setUser] = useState(getUser());

    return (
        <AuthContext.Provider
            value={{ accessToken, refreshToken, user, setAccessToken, setRefreshToken, setUser }
            }
        >
            {children}
        </AuthContext.Provider>
    );
}


export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
