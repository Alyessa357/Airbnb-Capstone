import {
    FaBan,
    FaClock,
    FaDog,
    FaGlassCheers,
    FaKey,
    FaShieldAlt,
    FaSmokingBan,
    FaSprayCan,
    FaUserSlash,
    FaWind,
} from "react-icons/fa";

import "./ThingsToKnow.css";

const ThingsToKnow = () => {
    return (
        <section className="things-to-know">
            <h2>Things to know</h2>

            <div className="things-to-know__grid">
                <div>
                    <h3>House rules</h3>
                    <ul>
                        <li>
                            <FaClock /> Check-in: After 4:00 PM
                        </li>
                        <li>
                            <FaClock /> Checkout: 10:00 AM
                        </li>
                        <li>
                            <FaKey /> Self check-in with lockbox
                        </li>
                        <li>
                            <FaUserSlash /> Not suitable for infants (under 2
                            years)
                        </li>
                        <li>
                            <FaSmokingBan /> No smoking
                        </li>
                        <li>
                            <FaDog /> No pets
                        </li>
                        <li>
                            <FaGlassCheers /> No parties or events
                        </li>
                    </ul>
                </div>

                <div>
                    <h3>Health &amp; safety</h3>
                    <ul>
                        <li>
                            <FaSprayCan /> Committed to Airbnb&apos;s enhanced
                            cleaning process. <button type="button">Show more</button>
                        </li>
                        <li>
                            <FaShieldAlt /> Airbnb&apos;s social-distancing and
                            other COVID-19-related guidelines apply
                        </li>
                        <li>
                            <FaWind /> Carbon monoxide alarm
                        </li>
                        <li>
                            <FaBan /> Smoke alarm
                        </li>
                        <li>
                            Security Deposit - if you damage the home, you may
                            be charged up to $566
                        </li>
                    </ul>
                    <button type="button" className="things-to-know__link">
                        Show more &gt;
                    </button>
                </div>

                <div>
                    <h3>Cancellation policy</h3>
                    <p>Free cancellation before Feb 14</p>
                    <button type="button" className="things-to-know__link">
                        Show more &gt;
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ThingsToKnow;
