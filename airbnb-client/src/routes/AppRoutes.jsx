import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import LocationPage from "../pages/LocationPage";
import RoomDetailsPage from "../pages/RoomDetailsPage";
import LoginPage from "../pages/LoginPage";

import MyTripsPage
    from "../pages/MyTripsPage";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />}/>

            <Route path="/location" element={<LocationPage />}/>

            <Route path="/rooms/:id" element={<RoomDetailsPage />}/>

            <Route path="/login" element={<LoginPage />}/>

            <Route path="/my-trips" element={ <MyTripsPage /> }/>
        </Routes>
    );
};

export default AppRoutes;