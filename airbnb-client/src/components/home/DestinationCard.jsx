import { useNavigate } from "react-router-dom";

import "./DestinationCard.css";

// Clickable destination card — photo, city name, and drive time
const DestinationCard = ({
    image,
    title,
    distance,
    footerColor,
}) => {
    const navigate = useNavigate();

    return (
        <div
            className="destination-card"
            onClick={() => navigate("/location")}
        >
            <div className="destination-card__image">
                <img src={image} alt={title} />
            </div>

            {/* Colored footer bar — background color passed via prop */}
            <div
                className="destination-card__info"
                style={{ backgroundColor: footerColor }}
            >
                <h3>{title}</h3>
                <p>{distance}</p>
            </div>
        </div>
    );
};

export default DestinationCard;
