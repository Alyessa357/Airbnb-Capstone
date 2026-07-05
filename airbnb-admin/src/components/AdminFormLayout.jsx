import { useNavigate, useLocation } from "react-router-dom";

import AdminHeader from "./AdminHeader";
import AdminFooter from "./AdminFooter";

import "../styles/adminFormLayout.css";

// Admin sub-navigation links shown below the header
const NAV_ITEMS = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "View Reservations", path: "/reservations" },
    { label: "View Listings", path: "/listings" },
    { label: "Create Listing", path: "/create-listing" },
];

// Shared page shell — header, optional subnav, main content, and footer
const AdminFormLayout = ({ children, showSubnav = true }) => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className="admin-form-layout">
            <AdminHeader />

            {/* Horizontal nav bar — hidden when showSubnav is false */}
            {showSubnav && (
                <div className="admin-form-layout__subnav">
                    {NAV_ITEMS.map((item) => {
                        // Highlight active tab — /listings also active on /rooms/:id pages
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

            {/* Page-specific content passed in as children */}
            <main className="admin-form-layout__content">
                {children}
            </main>

            <AdminFooter />
        </div>
    );
};

export default AdminFormLayout;
