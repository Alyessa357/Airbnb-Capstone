import { useState } from "react";
import {
    FaBroom,
    FaCalendarAlt,
    FaDoorOpen,
    FaHome,
} from "react-icons/fa";

import "./ListingOverview.css";

// Fallback description when the listing has none saved
const DEFAULT_DESCRIPTION =
    "Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.";

// Title, host info, highlights, and expandable description
const ListingOverview = ({ listing }) => {
    const hostName = listing.host?.username || "Ghazal";
    const description = listing.description || DEFAULT_DESCRIPTION;
    const [showMore, setShowMore] = useState(false);

    // Icon + title + text rows below the host heading
    const highlights = [
        {
            icon: <FaHome />,
            title: "Entire home",
            text: "You'll have the apartment to yourself.",
        },
        {
            icon: <FaBroom />,
            title: "Enhanced Clean",
            text: "This Host committed to Airbnb's 5-step enhanced cleaning process.",
            link: "Show more",
        },
        {
            icon: <FaDoorOpen />,
            title: "Self check-in",
            text: "Check yourself in with the keypad.",
        },
        {
            icon: <FaCalendarAlt />,
            title: "Free cancellation before Feb 14",
            text: "",
        },
    ];

    return (
        <section className="listing-overview">
            {/* Listing type, host name, guest/bed/bath counts, and avatar */}
            <div className="listing-overview__host-row">
                <div>
                    <h2>
                        {listing.type} hosted by {hostName}
                    </h2>
                    <p>
                        {listing.guests} guests · {listing.bedrooms} bedroom
                        {listing.bedrooms > 1 ? "s" : ""} · {listing.bedrooms}{" "}
                        bed{listing.bedrooms > 1 ? "s" : ""} · {listing.bathrooms}{" "}
                        bath
                    </p>
                </div>

                <img
                    className="listing-overview__avatar"
                    src="https://i.pravatar.cc/120?img=47"
                    alt={hostName}
                />
            </div>

            <div className="listing-overview__highlights">
                {highlights.map((item) => (
                    <div key={item.title} className="listing-overview__highlight">
                        <span className="listing-overview__icon">{item.icon}</span>
                        <div>
                            <p className="listing-overview__highlight-title">
                                {item.title}
                            </p>
                            {item.text && (
                                <p className="listing-overview__highlight-text">
                                    {item.text}{" "}
                                    {item.link && (
                                        <button type="button">{item.link}</button>
                                    )}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Description clamped to three lines until "Show more" is clicked */}
            <div className="listing-overview__description">
                <p className={showMore ? "" : "listing-overview__description--clamped"}>
                    {description}
                </p>
                <button
                    type="button"
                    className="listing-overview__show-more"
                    onClick={() => setShowMore((current) => !current)}
                >
                    {showMore ? "Show less" : "Show more ›"}
                </button>
            </div>
        </section>
    );
};

export default ListingOverview;
