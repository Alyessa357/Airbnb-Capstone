import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

import "./DetailsSearchBar.css";

// Compact search pill on listing details — navigates back to home on click
const DetailsSearchBar = () => {
    const navigate = useNavigate();

    return (
        <button
            type="button"
            className="details-search-bar"
            onClick={() => navigate("/")}
        >
            <span className="details-search-bar__label">
                Start your search
            </span>
            <span className="details-search-bar__btn">
                <FaSearch />
            </span>
        </button>
    );
};

export default DetailsSearchBar;
