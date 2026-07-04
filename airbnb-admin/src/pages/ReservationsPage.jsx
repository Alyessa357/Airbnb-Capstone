import { useEffect, useState } from "react";

import AdminFormLayout from "../components/AdminFormLayout";
import useAuth from "../context/useAuth";
import reservationService from "../services/reservationService";

import "../styles/reservationsPage.css";

const formatDate = (dateValue) => {
    if (!dateValue) return "-";

    const date = new Date(dateValue);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
};

const ReservationsPage = () => {
    const { token } = useAuth();
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchReservations();
    }, [token]);

    const fetchReservations = async () => {
        try {
            const data = await reservationService.getReservations(token);
            setReservations(data.reservations || []);
        } catch {
            setError("Failed to load reservations");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (reservationId) => {
        const confirmed = window.confirm("Delete this reservation?");
        if (!confirmed) {
            return;
        }

        try {
            await reservationService.deleteReservation(reservationId, token);
            setReservations((previousReservations) =>
                previousReservations.filter(
                    (reservation) => reservation._id !== reservationId
                )
            );
        } catch {
            alert("Failed to delete reservation");
        }
    };

    return (
        <AdminFormLayout>
            <div className="reservations-page">
                <h1 className="reservations-page__title">My Reservations</h1>

                {loading && (
                    <p className="reservations-page__message">
                        Loading reservations...
                    </p>
                )}

                {!loading && error && (
                    <p className="reservations-page__message reservations-page__message--error">
                        {error}
                    </p>
                )}

                {!loading && !error && reservations.length === 0 && (
                    <p className="reservations-page__message">
                        No reservations found.
                    </p>
                )}

                {!loading && !error && reservations.length > 0 && (
                    <div className="reservations-page__table-wrap">
                        <table className="reservations-page__table">
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
                                        <td>
                                            {reservation.user?.username ||
                                                "Unknown User"}
                                        </td>
                                        <td>
                                            {reservation.listing?.title ||
                                                "Unknown Listing"}
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
                                                className="reservations-page__delete-btn"
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
            </div>
        </AdminFormLayout>
    );
};

export default ReservationsPage;
