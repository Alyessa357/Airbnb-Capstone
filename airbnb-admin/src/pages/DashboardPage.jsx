import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminFormLayout from "../components/AdminFormLayout";
import AdminListingCard from "../components/AdminListingCard";
import listingService from "../services/listingService";
import reservationService from "../services/reservationService";
import useAuth from "../context/useAuth";

import "../styles/dashboardPage.css";

const getCheckIn = (reservation) =>
    reservation.checkInDate || reservation.checkIn;

const getCheckOut = (reservation) =>
    reservation.checkOutDate || reservation.checkOut;

const getReservationStats = (reservations) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let upcoming = 0;
    let active = 0;
    let revenue = 0;

    reservations.forEach((reservation) => {
        const checkIn = new Date(getCheckIn(reservation));
        const checkOut = new Date(getCheckOut(reservation));

        if (Number.isNaN(checkIn.getTime()) || Number.isNaN(checkOut.getTime())) {
            return;
        }

        checkIn.setHours(0, 0, 0, 0);
        checkOut.setHours(0, 0, 0, 0);

        if (checkIn > today) {
            upcoming += 1;
        }

        if (checkIn <= today && checkOut >= today) {
            active += 1;
        }

        revenue += reservation.totalPrice || 0;
    });

    return {
        total: reservations.length,
        upcoming,
        active,
        revenue,
    };
};

const DashboardPage = () => {
    const { token } = useAuth();
    const navigate = useNavigate();

    const [listings, setListings] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchDashboardData();
    }, [token]);

    const fetchDashboardData = async () => {
        try {
            const [listingsData, reservationsData] = await Promise.all([
                listingService.getListings(token),
                reservationService.getReservations(token),
            ]);

            setListings(listingsData.listings || []);
            setReservations(reservationsData.reservations || []);
        } catch {
            setError("Failed to load dashboard data");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (listingId) => {
        if (!window.confirm("Delete this listing?")) return;

        try {
            await listingService.deleteListing(listingId, token);
            setListings((current) =>
                current.filter((listing) => listing._id !== listingId)
            );
        } catch {
            alert("Failed to delete listing");
        }
    };

    const handleUpdate = (listingId) => {
        navigate(`/update-listing/${listingId}`);
    };

    const stats = getReservationStats(reservations);

    if (loading) {
        return (
            <AdminFormLayout>
                <p className="dashboard__message">Loading...</p>
            </AdminFormLayout>
        );
    }

    return (
        <AdminFormLayout>
            <div className="dashboard">
                <h1 className="dashboard__title">Dashboard</h1>

                {error && (
                    <p className="dashboard__message dashboard__message--error">
                        {error}
                    </p>
                )}

                {!error && (
                    <>
                        <section className="dashboard__stats">
                            <article className="dashboard__stat-card">
                                <p className="dashboard__stat-label">
                                    Total Reservations
                                </p>
                                <p className="dashboard__stat-value">
                                    {stats.total}
                                </p>
                            </article>

                            <article className="dashboard__stat-card">
                                <p className="dashboard__stat-label">
                                    Upcoming Check-ins
                                </p>
                                <p className="dashboard__stat-value">
                                    {stats.upcoming}
                                </p>
                            </article>

                            <article className="dashboard__stat-card">
                                <p className="dashboard__stat-label">
                                    Active Stays
                                </p>
                                <p className="dashboard__stat-value">
                                    {stats.active}
                                </p>
                            </article>

                            <article className="dashboard__stat-card">
                                <p className="dashboard__stat-label">
                                    Total Revenue
                                </p>
                                <p className="dashboard__stat-value">
                                    ${stats.revenue.toLocaleString()}
                                </p>
                            </article>
                        </section>

                        <div className="dashboard__section-header">
                            <h2 className="dashboard__section-title">
                                My Hotel List
                            </h2>
                        </div>

                        {listings.length === 0 ? (
                            <p className="dashboard__message">
                                No listings found.
                            </p>
                        ) : (
                            <div className="dashboard__list">
                                {listings.map((listing) => (
                                    <AdminListingCard
                                        key={listing._id}
                                        listing={listing}
                                        onUpdate={handleUpdate}
                                        onDelete={handleDelete}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </AdminFormLayout>
    );
};

export default DashboardPage;
