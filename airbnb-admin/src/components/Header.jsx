// React Router navigation
import { useNavigate } from "react-router-dom";

// Authentication hook
import useAuth from "../context/useAuth";
import Logo from "./Logo";

// Styling
import "../styles/header.css";

function Header() {

    const navigate = useNavigate();

    const { user, logout } = useAuth();

    // Runs when logout button clicked
    const handleLogout = () => {

        logout();

        navigate("/");

    };

    return (

        <header className="header">

            {/* Airbnb Logo */}
            <div
                className="header__logo"
                onClick={() => navigate("/dashboard")}
            >
                <Logo />
            </div>

            {/* User Section */}
            <div className="user-section">

                <span>

                    Welcome,

                    {" "}

                    {user?.username || "User"}

                </span>

                <button
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>

        </header>

    );

}

export default Header;