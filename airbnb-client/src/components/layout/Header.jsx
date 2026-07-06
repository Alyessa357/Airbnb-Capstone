import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaGlobe, FaBars, FaUserCircle } from "react-icons/fa";
import SearchBar from "./SearchBar";
import CompactSearchBar from "./CompactSearchBar";
import DetailsSearchBar from "./DetailsSearchBar";
import Logo from "./Logo";
import useAuth from "../../context/useAuth";
import "./Header.css";

// Admin app URL for host login/signup redirect
const ADMIN_LOGIN_URL =
    // import.meta.env.VITE_ADMIN_URL || "http://localhost:5173";
    import.meta.env.VITE_ADMIN_URL || "https://airbnb-capstone-admin.onrender.com";
    

// Center nav links shown on the home page header
const NAV_LINKS = [
    "Places to stay",
    "Experiences",
    "Online Experiences",
];

// Site header — adapts layout via variant: default, simple, results, or details
const Header = ({ variant = "default" }) => {
    const [profileOpen, setProfileOpen] = useState(false);
    const [hostOpen, setHostOpen] = useState(false);
    const [isCompactSearch, setIsCompactSearch] = useState(() =>
        typeof window !== "undefined"
            ? window.matchMedia("(max-width: 768px)").matches
            : false
    );
    const profileRef = useRef(null);
    const hostRef = useRef(null);
    const navigate = useNavigate();
    const { user, token, logout } = useAuth();

    const isLoggedIn = Boolean(token && user);
    const displayName =
        user?.username || user?.email?.split("@")[0] || "Guest";

    // Close profile and host dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {
                setProfileOpen(false);
            }

            if (
                hostRef.current &&
                !hostRef.current.contains(event.target)
            ) {
                setHostOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Switch between full SearchBar and CompactSearchBar at 768px
    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 768px)");

        const updateSearchLayout = () => {
            setIsCompactSearch(mediaQuery.matches);
        };

        updateSearchLayout();
        mediaQuery.addEventListener("change", updateSearchLayout);

        return () =>
            mediaQuery.removeEventListener("change", updateSearchLayout);
    }, []);

    // Redirect to admin app for host login or sign up
    const goToAdminLogin = (signUp = false) => {
        setHostOpen(false);
        const url = signUp
            ? `${ADMIN_LOGIN_URL}/?mode=signup`
            : ADMIN_LOGIN_URL;
        window.location.href = url;
    };

    const handleLogout = () => {
        setProfileOpen(false);
        logout();
        navigate("/");
    };

    const isSimple = variant === "simple";
    const isResults = variant === "results";
    const isDetails = variant === "details";

    return (
        <header
            className={`header${
                isSimple ? " header--simple" : ""
            }${isResults ? " header--results" : ""}${
                isDetails ? " header--details" : ""
            }`}
        >
            <div
                className={`header__top${
                    isResults || isDetails ? " header__top--results" : ""
                }`}
            >
                {/* Logo — navigates to home on click */}
                <div
                    className="header__logo"
                    onClick={() => navigate("/")}
                >
                     <Logo />
                </div>

                {/* Center nav — only on default home header */}
                {!isSimple && !isResults && !isDetails && (
                    <nav className="header__nav">
                        {NAV_LINKS.map((label) => (
                            <button
                                key={label}
                                type="button"
                                className="header__nav-link"
                            >
                                {label}
                            </button>
                        ))}
                    </nav>
                )}

                {/* Compact search bar on location results page */}
                {isResults && (
                    <div className="header__compact-search">
                        <CompactSearchBar />
                    </div>
                )}

                {/* Simple search pill on listing details page */}
                {isDetails && (
                    <div className="header__compact-search">
                        <DetailsSearchBar />
                    </div>
                )}

                <div
                    className={`header__right${
                        isSimple ? " header__right--simple" : ""
                    }`}
                >
                    {!isSimple && (
                        <>
                            {/* Become a Host dropdown — links to admin login/signup */}
                            <div
                                className="header__host-wrapper"
                                ref={hostRef}
                            >
                                <button
                                    type="button"
                                    className={`header__host-button${
                                        isResults || isDetails
                                            ? " header__host-button--dark"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        setHostOpen((open) => !open)
                                    }
                                    aria-expanded={hostOpen}
                                    aria-haspopup="true"
                                >
                                    Become a host
                                </button>

                                {hostOpen && (
                                    <div className="header__profile-dropdown">
                                        <button
                                            type="button"
                                            className="header__dropdown-item"
                                            onClick={() =>
                                                goToAdminLogin(false)
                                            }
                                        >
                                            Login
                                        </button>
                                        <button
                                            type="button"
                                            className="header__dropdown-item"
                                            onClick={() =>
                                                goToAdminLogin(true)
                                            }
                                        >
                                            Sign up
                                        </button>
                                    </div>
                                )}
                            </div>

                            <button
                                type="button"
                                className={`header__globe-button${
                                    isResults || isDetails
                                        ? " header__globe-button--dark"
                                        : ""
                                }`}
                                aria-label="Language and currency"
                            >
                                <FaGlobe />
                            </button>
                        </>
                    )}

                    {isLoggedIn && !isSimple && !isDetails && (
                        <span
                            className={`header__welcome${
                                isResults
                                    ? " header__welcome--dark"
                                    : ""
                            }`}
                        >
                            Welcome, {displayName}
                        </span>
                    )}

                    {isLoggedIn && isSimple && (
                        <span className="header__user-name">
                            {displayName}
                        </span>
                    )}

                    {/* Profile menu — login/signup or reservations/logout */}
                    <div
                        className="header__profile-wrapper"
                        ref={profileRef}
                    >
                        <button
                            type="button"
                            className="header__profile-menu"
                            onClick={() =>
                                setProfileOpen((open) => !open)
                            }
                            aria-expanded={profileOpen}
                            aria-haspopup="true"
                        >
                            <FaBars />
                            <FaUserCircle size={30} />
                        </button>

                        {profileOpen && (
                            <div className="header__profile-dropdown">
                                {isLoggedIn ? (
                                    <>
                                        <button
                                            type="button"
                                            className="header__dropdown-item"
                                            onClick={() => {
                                                setProfileOpen(false);
                                                navigate("/my-trips");
                                            }}
                                        >
                                            View Reservations
                                        </button>
                                        <button
                                            type="button"
                                            className="header__dropdown-item"
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            type="button"
                                            className="header__dropdown-item"
                                            onClick={() => {
                                                setProfileOpen(false);
                                                navigate("/login");
                                            }}
                                        >
                                            Login
                                        </button>
                                        <button
                                            type="button"
                                            className="header__dropdown-item"
                                            onClick={() => {
                                                setProfileOpen(false);
                                                navigate(
                                                    "/login?mode=signup"
                                                );
                                            }}
                                        >
                                            Sign up
                                        </button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Full or compact search bar below nav — home page only */}
            {!isSimple && !isResults && !isDetails && (
                <div
                    className={`header__search${
                        isCompactSearch
                            ? " header__search--compact"
                            : ""
                    }`}
                >
                    {isCompactSearch ? (
                        <CompactSearchBar />
                    ) : (
                        <SearchBar />
                    )}
                </div>
            )}
        </header>
    );
};

export default Header;

