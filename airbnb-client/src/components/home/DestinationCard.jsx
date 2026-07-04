import { useNavigate } from "react-router-dom";

import "./DestinationCard.css";

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
