import {
    FaBicycle,
    FaFan,
    FaLeaf,
    FaPaw,
    FaSnowflake,
    FaUtensils,
    FaVideo,
    FaWifi,
    FaWineBottle,
} from "react-icons/fa";

import "./Amenities.css";

const AMENITY_ICONS = {
    "Garden view": FaLeaf,
    Wifi: FaWifi,
    Kitchen: FaUtensils,
    "Pets allowed": FaPaw,
    "Free washer - In building": FaFan,
    Dryer: FaFan,
    "Central air conditioning": FaSnowflake,
    Refrigerator: FaWineBottle,
    "Security cameras on property": FaVideo,
    Bicycles: FaBicycle,
};

const DEFAULT_AMENITIES = [
    "Garden view",
    "Wifi",
    "Free washer - In building",
    "Central air conditioning",
    "Refrigerator",
    "Kitchen",
    "Pets allowed",
    "Dryer",
    "Security cameras on property",
    "Bicycles",
];

const Amenities = ({ listing }) => {
    const amenities =
        listing.amenities?.length > 0
            ? listing.amenities
            : DEFAULT_AMENITIES;

    const visibleAmenities = amenities.slice(0, 10);

    return (
        <section className="amenities">
            <h2>What this place offers</h2>

            <div className="amenities__grid">
                {visibleAmenities.map((amenity) => {
                    const Icon = AMENITY_ICONS[amenity] || FaLeaf;

                    return (
                        <div key={amenity} className="amenity">
                            <Icon />
                            <span>{amenity}</span>
                        </div>
                    );
                })}
            </div>

            <button type="button" className="amenities__show-all">
                Show all {amenities.length || 37} amenities
            </button>
        </section>
    );
};

export default Amenities;
