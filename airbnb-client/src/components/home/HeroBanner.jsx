import "./HeroBanner.css";
import { useNavigate } from "react-router-dom";

const HeroBanner = () => {
    const navigate = useNavigate();

    return (
        <section className="hero-banner">
            <div className="hero-banner__image">
                <div className="hero-overlay">
                    <h1 className="hero-title">
                        Not sure where to go? Perfect.
                    </h1>

                    <button
                        className="hero-button"
                        onClick={() => navigate("/location")}
                    >
                        I'm flexible
                    </button>
                </div>
            </div>
        </section>
    );
};

export default HeroBanner;
