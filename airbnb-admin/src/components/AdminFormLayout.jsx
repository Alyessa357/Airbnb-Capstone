import { useNavigate, useLocation } from "react-router-dom";

import AdminHeader from "./AdminHeader";
import AdminFooter from "./AdminFooter";

import "../styles/adminFormLayout.css";

const NAV_ITEMS = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "View Reservations", path: "/reservations" },
    { label: "View Listings", path: "/listings" },
    { label: "Create Listing", path: "/create-listing" },
];

const AdminFormLayout = ({ children, showSubnav = true }) => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className="admin-form-layout">
            <AdminHeader />

            {showSubnav && (
                <div className="admin-form-layout__subnav">
                    {NAV_ITEMS.map((item) => {
                        const isActive =
                            location.pathname === item.path ||
                            (item.path === "/listings" &&
                                location.pathname.startsWith("/rooms/"));

                        return (
                            <button
                                key={item.path}
                                type="button"
                                className={`admin-form-layout__nav-btn${
                                    isActive
                                        ? " admin-form-layout__nav-btn--active"
                                        : ""
                                }`}
                                onClick={() => navigate(item.path)}
                            >
                                {item.label}
                            </button>
                        );
                    })}
                </div>
            )}

            <main className="admin-form-layout__content">
                {children}
            </main>

            <AdminFooter />
        </div>
    );
};

export default AdminFormLayout;

