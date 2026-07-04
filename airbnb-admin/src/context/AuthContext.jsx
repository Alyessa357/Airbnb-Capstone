// Import React hooks and functions
import { createContext, useState } from "react";

// Create the context
export const AuthContext = createContext();

// Create Provider component
export const AuthProvider = ({ children }) => {

    // Restore token and user from localStorage on first render
    // so a page refresh does not treat the user as logged out
    const [token, setToken] = useState(
        localStorage.getItem("token")
    );

    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user"))
    );


    // Login function
    const login = (userData, tokenData) => {

        // Save values in browser storage
        localStorage.setItem(
            "token",
            tokenData
        );

        localStorage.setItem(
            "user",
            JSON.stringify(userData)
        );

        // Save values in state
        setUser(userData);
        setToken(tokenData);
    };


    // Logout function
    const logout = () => {

        // Remove values from local storage
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // Clear state
        setUser(null);
        setToken(null);

    };


    // Values shared across the application
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
