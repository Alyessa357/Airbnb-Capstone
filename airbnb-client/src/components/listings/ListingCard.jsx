import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";

import useLocale from "../../context/useLocale";

import "./ListingCard.css";

const ListingCard = ({ listing }) => {
    const navigate = useNavigate();
    const { t, formatPrice } = useLocale();
    const [saved, setSaved] = useState(false);

    const rating = listing.rating || 4.8;
    const reviewCount = listing.reviews || 0;

    const handleHeartClick = (e) => {
        e.stopPropagation();
        setSaved((current) => !current);
    };

    return (
        <article
            className="listing-card"
            onClick={() => navigate(`/rooms/${listing._id}`)}
        >
            <img
                className="listing-card__image"
                src={
                    listing.images?.[0] ||
                    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
                }
                alt={listing.title}
            />

            <div className="listing-card__content">
                <button
                    type="button"
                    className="listing-card__heart"
                    onClick={handleHeartClick}
                    aria-label={saved ? "Unsave listing" : "Save listing"}
                >
                    {saved ? (
                        <FaHeart className="listing-card__heart--saved" />
                    ) : (
                        <FaRegHeart />
                    )}
                </button>

                <p className="listing-card__category">
                    {listing.type} in {listing.location}
                </p>

                <h3 className="listing-card__title">{listing.title}</h3>

                <p className="listing-card__specs">
                    {listing.guests} guests · {listing.type} ·{" "}
                    {listing.bedrooms} beds · {listing.bathrooms} bath
                </p>

                {listing.amenities?.length > 0 && (
                    <p className="listing-card__amenities">
                        {listing.amenities.slice(0, 3).join(" · ")}
                    </p>
                )}

                <div className="listing-card__divider" />

                <div className="listing-card__footer">
                    <div className="listing-card__rating">
                        <span className="listing-card__rating-score">
                            {rating.toFixed(1)}
                        </span>
                        <FaStar className="listing-card__star" />
                        <span className="listing-card__reviews">
                            ({reviewCount} {t("reviews")})
                        </span>
                    </div>

                    <p className="listing-card__price">
                        <span>{formatPrice(listing.price)}</span> {t("perNight")}
                    </p>
                </div>
            </div>
        </article>
    );
};

export default ListingCard;

