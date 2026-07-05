import "./LocationFilters.css";

// Filter options shown as pill buttons (UI only — not wired yet)
const FILTER_PILLS = [
    "Free cancellation",
    "Type of place",
    "Price",
    "Instant Book",
    "More filters",
];

// Horizontal row of quick filter pills on the listings page
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
