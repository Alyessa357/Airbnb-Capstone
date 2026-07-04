import "./LocationFilters.css";

const FILTER_PILLS = [
    "Free cancellation",
    "Type of place",
    "Price",
    "Instant Book",
    "More filters",
];

const LocationFilters = () => {
    return (
        <div className="location-filters">
            {FILTER_PILLS.map((label) => (
                <button
                    key={label}
                    type="button"
                    className="location-filters__pill"
                >
                    {label}
                </button>
            ))}
        </div>
    );
};

export default LocationFilters;
