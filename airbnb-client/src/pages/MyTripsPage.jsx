import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import CopyrightFooter from "../components/layout/CopyrightFooter";
import useAuth from "../context/useAuth";
import reservationService from "../services/reservationService";

import "./MyTripsPage.css";

const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

const MyTripsPage = () => {
    const navigate = useNavigate();
    const { user, token } = useAuth();

    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    const bookedByName =
        user?.username || user?.email?.split("@")[0] || "Guest";

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }

        const fetchTrips = async () => {
            try {
                const data =
                    await reservationService.getMyReservations(token);
                setReservations(data.reservations || []);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchTrips();
    }, [token, navigate]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this reservation?")) {
            return;
        }

        try {
            await reservationService.deleteReservation(id, token);
            setReservations((current) =>
                current.filter((reservation) => reservation._id !== id)
            );
        } catch (error) {
            console.error(error);
            alert("Failed to delete reservation.");
        }
    };

    return (
        <div className="my-trips-page">
            <Header variant="simple" />

            <main className="my-trips-page__content">
                <h1 className="my-trips-page__title">My Reservations</h1>

                {loading ? (
                    <p className="my-trips-page__message">Loading...</p>
                ) : reservations.length === 0 ? (
                    <p className="my-trips-page__message">
                        No reservations booked yet.
                    </p>
                ) : (
                    <div className="my-trips-table-wrapper">
                        <table className="my-trips-table">
                            <thead>
                                <tr>
                                    <th>Booked by</th>
                                    <th>Property</th>
                                    <th>Checkin</th>
                                    <th>Checkout</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reservations.map((reservation) => (
                                    <tr key={reservation._id}>
                                        <td>{bookedByName}</td>
                                        <td>
                                            {reservation.listing?.title ||
                                                "Listing unavailable"}
                                        </td>
                                        <td>
                                            {formatDate(
                                                reservation.checkInDate
                                            )}
                                        </td>
                                        <td>
                                            {formatDate(
                                                reservation.checkOutDate
                                            )}
                                        </td>
                                        <td>
                                            <button
                                                type="button"
                                                className="my-trips-table__delete-btn"
                                                onClick={() =>
                                                    handleDelete(
                                                        reservation._id
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>

            <Footer />
            <CopyrightFooter />
        </div>
    );
};

export default MyTripsPage;
