import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";

import { AuthProvider } from "./context/AuthContext";
import { LocaleProvider } from "./context/LocaleContext";

// Mount the app with routing and global context providers
createRoot(document.getElementById("root")).render(
    <StrictMode>

        <BrowserRouter>
            {/* Auth state (user, token, login/logout) */}
            <AuthProvider>
                {/* Language and currency (t, formatPrice) */}
                <LocaleProvider>
                    <App />
                </LocaleProvider>
            </AuthProvider>
        </BrowserRouter>

    </StrictMode>
);
