import "./ExperienceCard.css";

// Promo card with background image, title, and CTA button
const ExperienceCard = ({ image, title, buttonText }) => {
    return (
        <div
            className="experience-card"
            style={{ backgroundImage: `url(${image})` }}
        >
            <div className="experience-overlay">
                <h3>{title}</h3>
                <button type="button">{buttonText}</button>
            </div>
        </div>
    );
};

export default ExperienceCard;
