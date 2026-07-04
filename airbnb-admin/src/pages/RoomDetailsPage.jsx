import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    FaAward,
    FaFlag,
    FaHeart,
    FaShare,
    FaStar,
} from "react-icons/fa";

import AdminFormLayout from "../components/AdminFormLayout";
import listingService from "../services/listingService";
import useAuth from "../context/useAuth";

import ImageGallery from "../components/room/ImageGallery";
import ListingOverview from "../components/room/ListingOverview";
import SleepSection from "../components/room/SleepSection";
import Amenities from "../components/room/Amenities";
import StayCalendar from "../components/room/StayCalendar";
import Reviews from "../components/room/Reviews";
import HostInformation from "../components/room/HostInformation";
import ThingsToKnow from "../components/room/ThingsToKnow";
import ExploreSection from "../components/room/ExploreSection";
import ReservationCard from "../components/listings/ReservationCard";

import "../styles/roomDetailsPage.css";

const RoomDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useAuth();

    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [guestCount, setGuestCount] = useState(2);

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const data = await listingService.getListingById(id, token);
                setListing(data.listing);
                setGuestCount(
                    Math.min(2, data.listing?.guests || 2) || 1
                );
            } catch {
                setError("Failed to load listing");
            } finally {
                setLoading(false);
            }
        };

        fetchListing();
    }, [id, token]);

    const nights =
        checkIn && checkOut
            ? Math.max(
                  0,
                  (new Date(checkOut) - new Date(checkIn)) /
                      (1000 * 60 * 60 * 24)
              )
            : 0;

    if (loading) {
        return (
            <AdminFormLayout>
                <p className="room-details__message">Loading...</p>
            </AdminFormLayout>
        );
    }

    if (error || !listing) {
        return (
            <AdminFormLayout>
                <p className="room-details__message room-details__message--error">
                    {error || "Listing not found."}
                </p>
            </AdminFormLayout>
        );
    }

    const rating = listing.rating || 5.0;
    const reviewCount = listing.reviews || 7;

    return (
        <AdminFormLayout>
            <div className="room-details">
                <button
                    type="button"
                    className="room-details__back"
                    onClick={() => navigate("/listings")}
                >
                    ← Back to listings
                </button>

                <div className="room-details__title-row">
                    <h1>{listing.title}</h1>

                    <div className="room-details__actions">
                        <button type="button">
                            <FaShare />
                            Share
                        </button>
                        <button type="button">
                            <FaHeart />
                            Save
                        </button>
                    </div>
                </div>

                <div className="room-details__meta">
                    <FaStar />
                    <strong>{rating.toFixed(1)}</strong>
                    <span>·</span>
                    <button type="button">{reviewCount} reviews</button>
                    <span>·</span>
                    <span>
                        <FaAward /> Superhost
                    </span>
                    <span>·</span>
                    <button type="button">{listing.location}</button>
                </div>

                <ImageGallery listing={listing} />

                <div className="room-details__body">
                    <div className="room-details__main">
                        <ListingOverview listing={listing} />
                        <SleepSection listing={listing} />
                        <Amenities listing={listing} />
                        <StayCalendar
                            location={listing.location.split(",")[0]}
                            checkIn={checkIn}
                            checkOut={checkOut}
                            nights={nights || 7}
                            onClearDates={() => {
                                setCheckIn("");
                                setCheckOut("");
                            }}
                        />
                    </div>

                    <aside className="room-details__sidebar">
                        <ReservationCard
                            listing={listing}
                            checkIn={checkIn}
                            checkOut={checkOut}
                            guestCount={guestCount}
                            onCheckInChange={setCheckIn}
                            onCheckOutChange={setCheckOut}
                            onGuestCountChange={setGuestCount}
                            onReserve={() =>
                                navigate(`/update-listing/${listing._id}`)
                            }
                            reserveLabel="Update listing"
                            requireAuth={false}
                        />
                        <button type="button" className="room-details__report">
                            <FaFlag />
                            Report this listing
                        </button>
                    </aside>

                    <div className="room-details__full">
                        <Reviews rating={rating} reviewCount={reviewCount} />
                        <HostInformation listing={listing} />
                        <ThingsToKnow />
                        <ExploreSection location={listing.location} />
                    </div>
                </div>
            </div>
        </AdminFormLayout>
    );
};

export default RoomDetailsPage;
