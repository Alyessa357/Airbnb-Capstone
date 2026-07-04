// Import React Router components
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import Pages
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import CreateListingPage from "../pages/CreateListingPage";
import ViewListingsPage from "../pages/ViewListingsPage"; 
import UpdateListingPage from "../pages/UpdateListingPage"; 
import ReservationsPage from "../pages/ReservationsPage";
import RoomDetailsPage from "../pages/RoomDetailsPage";

import ProtectedRoute from "../components/ProtectedRoute";

function AppRoutes() {
    return (
        <BrowserRouter>
        
            <Routes>
                {/* Login page */}
                <Route path="/" element={<LoginPage />} />

                {/* Dashboard */}
                <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />

                {/* Create Listing */}
                <Route path="/create-listing" element={<ProtectedRoute><CreateListingPage /></ProtectedRoute>} />

                {/* View Listings */}
                <Route path="/listings" element={<ProtectedRoute><ViewListingsPage /></ProtectedRoute>} />

                {/* Room Details */}
                <Route path="/rooms/:id" element={<ProtectedRoute><RoomDetailsPage /></ProtectedRoute>} />

                {/* Update Listing */}
                <Route path="/update-listing/:id" element={<ProtectedRoute><UpdateListingPage /></ProtectedRoute>} />

                {/* Edit Listing */}
                <Route path="/listings/edit/:id" element={<ProtectedRoute><UpdateListingPage /></ProtectedRoute>} />

                {/* Reservations */}
                <Route path="/reservations" element={<ProtectedRoute><ReservationsPage /></ProtectedRoute>} />
            </Routes>
        
        </BrowserRouter>
    ); 
}

export default AppRoutes;