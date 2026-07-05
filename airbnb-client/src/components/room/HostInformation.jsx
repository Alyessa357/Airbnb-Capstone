import {
    FaAward,
    FaShieldAlt,
    FaStar,
} from "react-icons/fa";

import "./HostInformation.css";

// Host profile, badges, and contact section on room details
const HostInformation = ({ listing }) => {
    const hostName = listing?.host?.username || "Ghazal";

    return (
        <section className="host">
            {/* Avatar and "Hosted by" heading */}
            <div className="host__profile">
                <img
                    src="https://i.pravatar.cc/120?img=47"
                    alt={hostName}
                    className="host__avatar"
                />

                <div>
                    <h2>Hosted by {hostName}</h2>
                    <p>Joined May 2021</p>
                </div>
            </div>

            {/* Reviews, verified identity, and Superhost badges */}
            <div className="host__badges">
                <span>
                    <FaStar /> 12 Reviews
                </span>
                <span>
                    <FaShieldAlt /> Identity verified
                </span>
                <span>
                    <FaAward /> Superhost
                </span>
            </div>

            <div className="host__details">
                <h3>{hostName} is a Superhost</h3>
                <p>
                    Superhosts are experienced, highly rated hosts who are
                    committed to providing great stays for guests.
                </p>
                <p>Response rate: 100%</p>
                <p>Response time: within an hour</p>
            </div>

            {/* UI only — not wired to messaging yet */}
            <button type="button" className="host__contact">
                Contact Host
            </button>

            <p className="host__notice">
                <FaShieldAlt />
                To protect your payment, never transfer money or communicate
                outside of the Airbnb website or app.
            </p>
        </section>
    );
};

export default HostInformation;
