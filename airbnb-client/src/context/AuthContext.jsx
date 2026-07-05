import { createContext, useState } from "react";

// Shared auth state — consumed via useAuth hook
export const AuthContext =
    createContext();

// Wraps the app and provides login/logout to all children
export const AuthProvider = ({
    children
}) => {

    // JWT restored from localStorage on page load
    const [token, setToken] =
        useState(
            localStorage.getItem(
                "token"
            )
        );

    const [user, setUser] =
        useState(
            JSON.parse(
                localStorage.getItem(
                    "user"
                )
            )
        );

    // Save credentials to localStorage and update state
    const login = (
        userData,
        jwtToken
    ) => {

        localStorage.setItem(
            "token",
            jwtToken
        );

        localStorage.setItem(
            "user",
            JSON.stringify(
                userData
            )
        );

        setToken(jwtToken);
        setUser(userData);
    };

    // Clear credentials from localStorage and state
    const logout = () => {

        localStorage.removeItem(
            "token"
        );

        localStorage.removeItem(
            "user"
        );

        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
