import { FaStar } from "react-icons/fa";

import "../styles/AdminListingCard.css";

// Clickable listing card for the admin listings page — view, update, delete actions
const AdminListingCard = ({ listing, onView, onUpdate, onDelete }) => {
    const rating = listing.rating || 4.8;
    const reviewCount = listing.reviews || 0;

    return (
        <article
            className="admin-listing-card"
            onClick={() => onView(listing._id)}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onView(listing._id);
                }
            }}
        >
            {/* Left column — image and action buttons */}
            <div className="admin-listing-card__left">
                <img
                    className="admin-listing-card__image"
                    src={
                        listing.images?.[0] ||
                        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
                    }
                    alt={listing.title}
                />

                {/* stopPropagation prevents the card's onView click from firing */}
                <button
                    type="button"
                    className="admin-listing-card__update-btn"
                    onClick={(event) => {
                        event.stopPropagation();
                        onUpdate(listing._id);
                    }}
                >
                    Update
                </button>

                <button
                    type="button"
                    className="admin-listing-card__delete-btn"
                    onClick={(event) => {
                        event.stopPropagation();
                        onDelete(listing._id);
                    }}
                >
                    Delete
                </button>
            </div>

            {/* Middle column — type, title, specs, amenities, and rating */}
            <div className="admin-listing-card__details">
                <p className="admin-listing-card__category">
                    {listing.type} in {listing.location}
                </p>

                <h3 className="admin-listing-card__title">
                    {listing.title}
                </h3>

                <div className="admin-listing-card__divider" />

                <p className="admin-listing-card__specs">
                    {listing.guests} guests · {listing.type} ·{" "}
                    {listing.bedrooms} beds · {listing.bathrooms} bath
                </p>

                {listing.amenities?.length > 0 && (
                    <p className="admin-listing-card__amenities">
                        {listing.amenities.slice(0, 3).join(" · ")}
                    </p>
                )}

                <div className="admin-listing-card__rating">
                    <span className="admin-listing-card__rating-score">
                        {rating.toFixed(1)}
                    </span>
                    <FaStar className="admin-listing-card__star" />
                    <span className="admin-listing-card__reviews">
                        ({reviewCount} reviews)
                    </span>
                </div>
            </div>

            {/* Right column — nightly price */}
            <div className="admin-listing-card__price">
                <span>${listing.price}</span> / night
            </div>
        </article>
    );
};

export default AdminListingCard;
