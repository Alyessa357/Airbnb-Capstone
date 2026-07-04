import { createContext, useState } from "react";

export const AuthContext =
    createContext();

export const AuthProvider = ({
    children
}) => {

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