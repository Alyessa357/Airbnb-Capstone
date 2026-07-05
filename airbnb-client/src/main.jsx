import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";

import { AuthProvider } from "./context/AuthContext";
import { LocaleProvider } from "./context/LocaleContext";

createRoot(document.getElementById("root")).render(
    <StrictMode>

        <BrowserRouter>
            <AuthProvider>
                <LocaleProvider>
                    <App />
                </LocaleProvider>
            </AuthProvider>
        </BrowserRouter>

    </StrictMode>
);