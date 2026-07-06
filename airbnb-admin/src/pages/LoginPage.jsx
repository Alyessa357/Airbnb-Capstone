import { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import useAuth from "../context/useAuth";
import authService from "../services/authService";
import Logo from "../components/Logo";

import "./LoginPage.css";

// Login and sign-up page — toggled via ?mode=signup URL param
const LoginPage = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const { login } = useAuth();

    const isSignUp = searchParams.get("mode") === "signup";

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Clear error when switching between login and sign up
    useEffect(() => {
        setError("");
    }, [isSignUp]);

    // Toggle between login and sign-up modes via URL search params
    const switchMode = (signUp) => {
        setError("");
        if (signUp) {
            setSearchParams({ mode: "signup" });
        } else {
            setSearchParams({});
        }
    };

    // Authenticate existing user and redirect to dashboard
    const handleLogin = async (event) => {
        event.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Please enter username and password");
            return;
        }

        try {
            setLoading(true);

            const data = await authService.loginUser(
                email,
                password
            );

            login(data.user, data.token);
            navigate("/dashboard");
        } catch {
            setError("Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    // Register new admin user, then log in and redirect to dashboard
    const handleSignUp = async (event) => {
        event.preventDefault();
        setError("");

        if (!username || !email || !password) {
            setError("Please fill in all fields");
            return;
        }

        try {
            setLoading(true);

            await authService.registerUser(
                username,
                email,
                password,
                "admin"
            );

            const data = await authService.loginUser(
                email,
                password
            );

            login(data.user, data.token);
            navigate("/dashboard");
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Sign up failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            {/* Logo — redirects to the client frontend */}
            <Link
                to="/"
                className="login-page__logo"
                onClick={(event) => {
                    event.preventDefault();
                    // window.location.assign("http://localhost:5174");
                    window.location.assign("https://airbnb-capstone-frontend-client.onrender.com");
                    
                }}
            >
                <Logo />
            </Link>

            <div className="login-page__content">
                <h1 className="login-page__title">
                    {isSignUp ? "Sign up" : "Login"}
                </h1>

                {/* Tab toggle between Login and Sign up */}
                <div className="login-page__toggle">
                    <button
                        type="button"
                        className={`login-page__toggle-btn${
                            !isSignUp
                                ? " login-page__toggle-btn--active"
                                : ""
                        }`}
                        onClick={() => switchMode(false)}
                    >
                        Login
                    </button>
                    <button
                        type="button"
                        className={`login-page__toggle-btn${
                            isSignUp
                                ? " login-page__toggle-btn--active"
                                : ""
                        }`}
                        onClick={() => switchMode(true)}
                    >
                        Sign up
                    </button>
                </div>

                {error && (
                    <p className="login-page__error">{error}</p>
                )}

                {isSignUp ? (
                    // Sign-up form — username, email, password
                    <form
                        className="login-page__form"
                        onSubmit={handleSignUp}
                    >
                        <div className="login-field">
                            <label htmlFor="signup-username">
                                Username
                            </label>
                            <input
                                id="signup-username"
                                type="text"
                                value={username}
                                onChange={(event) =>
                                    setUsername(event.target.value)
                                }
                            />
                        </div>

                        <div className="login-field">
                            <label htmlFor="signup-email">Email</label>
                            <input
                                id="signup-email"
                                type="email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                            />
                        </div>

                        <div className="login-field">
                            <label htmlFor="signup-password">
                                Password
                            </label>
                            <input
                                id="signup-password"
                                type="password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                            />
                        </div>

                        <button
                            type="submit"
                            className="login-page__submit"
                            disabled={loading}
                        >
                            {loading ? "Signing up..." : "Sign up"}
                        </button>

                        <p className="login-page__switch">
                            Already have an account?{" "}
                            <button
                                type="button"
                                onClick={() => switchMode(false)}
                            >
                                Login
                            </button>
                        </p>
                    </form>
                ) : (
                    // Login form — email and password
                    <form
                        className="login-page__form"
                        onSubmit={handleLogin}
                    >
                        <div className="login-field">
                            <label htmlFor="username">Username</label>
                            <input
                                id="username"
                                type="email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                            />
                        </div>

                        <div className="login-field">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                            />
                        </div>

                        <button
                            type="button"
                            className="login-page__forgot"
                        >
                            Forgot Password?
                        </button>

                        <button
                            type="submit"
                            className="login-page__submit"
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>

                        <p className="login-page__switch">
                            New to Airbnb?{" "}
                            <button
                                type="button"
                                onClick={() => switchMode(true)}
                            >
                                Sign up
                            </button>
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
};

export default LoginPage;
