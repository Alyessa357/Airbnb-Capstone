import { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
// import { FaAirbnb } from "react-icons/fa";---

import authService from "../services/authService";
import useAuth from "../context/useAuth";
import Logo from "../components/layout/Logo";

import "./LoginPage.css";

// Login and sign-up page — mode toggled via ?mode=signup URL param
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

    // Clear error when switching between login and sign-up
    useEffect(() => {
        setError("");
    }, [isSignUp]);

    const switchMode = (signUp) => {
        setError("");
        if (signUp) {
            setSearchParams({ mode: "signup" });
        } else {
            setSearchParams({});
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Please enter username and password");
            return;
        }

        try {
            setLoading(true);

            const data = await authService.login({
                email,
                password,
            });

            login(data.user, data.token);
            navigate("/location");
        } catch {
            setError("Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    // Register, then auto-login and redirect to search results
    const handleSignUp = async (e) => {
        e.preventDefault();
        setError("");

        if (!username || !email || !password) {
            setError("Please fill in all fields");
            return;
        }

        try {
            setLoading(true);

            await authService.register({
                username,
                email,
                password,
                role: "user",
            });

            const data = await authService.login({
                email,
                password,
            });

            login(data.user, data.token);
            navigate("/location");
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
        // Logo - (navigates to home page onclick)
        <div className="login-page">
            <Link to="/" className="login-page__logo">
                <Logo />
            </Link>

            <div className="login-page__content">
                <h1 className="login-page__title">
                    {isSignUp ? "Sign up" : "Login"}
                </h1>

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
                                onChange={(e) =>
                                    setUsername(e.target.value)
                                }
                            />
                        </div>

                        <div className="login-field">
                            <label htmlFor="signup-email">Email</label>
                            <input
                                id="signup-email"
                                type="email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
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
                                onChange={(e) =>
                                    setPassword(e.target.value)
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
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                            />
                        </div>

                        <div className="login-field">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                            />
                        </div>

                        {/* UI only — not wired to password reset yet */}
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
