import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import LocationPage from "../pages/LocationPage";
import RoomDetailsPage from "../pages/RoomDetailsPage";
import LoginPage from "../pages/LoginPage";

import MyTripsPage
    from "../pages/MyTripsPage";

// Central route map for the client app
const AppRoutes = () => {
    return (
        <Routes>
            {/* Landing page with search and featured sections */}
            <Route path="/" element={<HomePage />}/>

            {/* Search results for a selected location */}
            <Route path="/location" element={<LocationPage />}/>

            {/* Single listing detail and booking */}
            <Route path="/rooms/:id" element={<RoomDetailsPage />}/>

            <Route path="/login" element={<LoginPage />}/>

            {/* Logged-in user's reservations */}
            <Route path="/my-trips" element={ <MyTripsPage /> }/>
        </Routes>
    );
};

export default AppRoutes;
