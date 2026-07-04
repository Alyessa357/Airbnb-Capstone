import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminFormLayout from "../components/AdminFormLayout";
import AdminListingCard from "../components/AdminListingCard";
import listingService from "../services/listingService";
import useAuth from "../context/useAuth";

import "../styles/viewListingsPage.css";

const ViewListingsPage = () => {
    const { token } = useAuth();
    const navigate = useNavigate();

    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchListings();
    }, [token]);

    const fetchListings = async () => {
        try {
            const data = await listingService.getListings(token);
            setListings(data.listings || []);
        } catch {
            setError("Failed to load listings");
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

    const handleView = (listingId) => {
        navigate(`/rooms/${listingId}`);
    };

    const handleUpdate = (listingId) => {
        navigate(`/update-listing/${listingId}`);
    };

    if (loading) {
        return (
            <AdminFormLayout>
                <p className="view-listings__message">Loading...</p>
            </AdminFormLayout>
        );
    }

    return (
        <AdminFormLayout>
            <div className="view-listings">
                <h1 className="view-listings__title">My Hotel List</h1>

                {error && (
                    <p className="view-listings__message view-listings__message--error">
                        {error}
                    </p>
                )}

                {!error && listings.length === 0 ? (
                    <p className="view-listings__message">
                        No listings found.
                    </p>
                ) : (
                    <div className="view-listings__list">
                        {listings.map((listing) => (
                            <AdminListingCard
                                key={listing._id}
                                listing={listing}
                                onView={handleView}
                                onUpdate={handleUpdate}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AdminFormLayout>
    );
};

export default ViewListingsPage;
