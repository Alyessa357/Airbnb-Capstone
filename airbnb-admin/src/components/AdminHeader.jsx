import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaAirbnb, FaBars, FaUserCircle } from "react-icons/fa";

import useAuth from "../context/useAuth";

import "../styles/adminHeader.css";

const AdminHeader = () => {
    const [profileOpen, setProfileOpen] = useState(false);
    const profileRef = useRef(null);
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const displayName =
        user?.username || user?.email?.split("@")[0] || "User";

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {
                setProfileOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        setProfileOpen(false);
        logout();
        // window.location.assign("http://localhost:5174");
        window.location.assign("https://airbnb-capstone-frontend-client.onrender.com");
    };

    return (
        <header className="admin-header">
            <div
                className="admin-header__logo"
                onClick={() => navigate("/dashboard")}
            >
                <FaAirbnb size={32} />
                <span>airbnb</span>
            </div>

            <div className="admin-header__right">
                <span className="admin-header__user-name">
                    {displayName}
                </span>

                <div className="admin-header__profile" ref={profileRef}>
                    <button
                        type="button"
                        className="admin-header__profile-btn"
                        onClick={() =>
                            setProfileOpen((open) => !open)
                        }
                    >
                        <FaBars />
                        <FaUserCircle size={28} />
                    </button>

                    {profileOpen && (
                        <div className="admin-header__dropdown">
                            <button
                                type="button"
                                onClick={() => {
                                    setProfileOpen(false);
                                    navigate("/reservations");
                                }}
                            >
                                View Reservations
                            </button>
                            <button
                                type="button"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;
