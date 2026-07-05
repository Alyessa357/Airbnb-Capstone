import { useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

import "./SearchBar.css";
import "./CompactSearchBar.css";

// Location options for the dropdown
const LOCATIONS = [
    { label: "All Locations", value: "" },
    { label: "New York", value: "New York" },
    { label: "Paris", value: "Paris" },
    { label: "Tokyo", value: "Tokyo" },
    { label: "Cape Town", value: "Cape Town" },
    { label: "Thailand", value: "Thailand" },
];

// Formats check-in/check-out as "Feb 14-16" or "Feb 28 - Mar 2"
const formatDateRange = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return "Add dates";

    const start = new Date(`${checkIn}T00:00:00`);
    const end = new Date(`${checkOut}T00:00:00`);

    const startMonth = start.toLocaleDateString("en-US", {
        month: "short",
    });
    const endMonth = end.toLocaleDateString("en-US", { month: "short" });

    if (startMonth === endMonth) {
        return `${startMonth} ${start.getDate()}-${end.getDate()}`;
    }

    return `${startMonth} ${start.getDate()} - ${endMonth} ${end.getDate()}`;
};

// Today's date as YYYY-MM-DD for date input min values
const todayString = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
};

// Compact header search bar — location, dates, guests, and search button
const CompactSearchBar = () => {
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [adults, setAdults] = useState(0);
    const [children, setChildren] = useState(0);

    const containerRef = useRef(null);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // Sync form state from URL query params on load and when params change
    useEffect(() => {
        const city = searchParams.get("city");

        if (city) {
            const match = LOCATIONS.find((loc) => loc.value === city);
            setSelectedLocation(
                match || { label: city, value: city }
            );
        } else {
            setSelectedLocation(null);
        }

        setCheckIn(searchParams.get("checkIn") || "");
        setCheckOut(searchParams.get("checkOut") || "");

        const guestsParam = searchParams.get("guests");
        if (guestsParam) {
            setAdults(Number(guestsParam));
            setChildren(0);
        } else {
            setAdults(0);
            setChildren(0);
        }
    }, [searchParams]);

    // Close any open dropdown when clicking outside the bar
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target)
            ) {
                setActiveDropdown(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const totalGuests = adults + children;

    // Build URLSearchParams from current filter values
    const buildSearchParams = (cityValue = selectedLocation?.value ?? "") => {
        const params = new URLSearchParams();

        if (cityValue) params.set("city", cityValue);
        if (checkIn) params.set("checkIn", checkIn);
        if (checkOut) params.set("checkOut", checkOut);
        if (totalGuests > 0) params.set("guests", totalGuests);

        return params;
    };

    // Navigate to /location with current search params
    const navigateWithParams = (cityValue = selectedLocation?.value ?? "") => {
        const params = buildSearchParams(cityValue);
        const query = params.toString();
        navigate(`/location${query ? `?${query}` : ""}`);
    };

    // Open/close a dropdown — only one open at a time
    const toggleDropdown = (name) => {
        setActiveDropdown((current) =>
            current === name ? null : name
        );
    };

    // Select location and immediately navigate with updated params
    const handleLocationSelect = (location) => {
        setSelectedLocation(location.value ? location : null);
        setActiveDropdown(null);
        navigateWithParams(location.value);
    };

    // Update check-in and clear check-out if it becomes invalid
    const handleCheckInChange = (value) => {
        setCheckIn(value);
        if (checkOut && value >= checkOut) setCheckOut("");
    };

    // Close dropdowns and navigate to location page with all filters
    const handleSearch = () => {
        setActiveDropdown(null);
        navigateWithParams();
    };

    const locationLabel =
        selectedLocation?.value || selectedLocation?.label || "Anywhere";

    const guestsLabel =
        totalGuests === 0
            ? "Add guests"
            : `${totalGuests} guest${totalGuests !== 1 ? "s" : ""}`;

    // Check-out must be at least one day after check-in
    const minCheckOut = checkIn
        ? new Date(
              new Date(`${checkIn}T00:00:00`).getTime() + 86400000
          )
              .toISOString()
              .split("T")[0]
        : todayString();

    return (
        <div className="compact-search-bar" ref={containerRef}>
            {/* Location field and dropdown */}
            <div className="compact-search-bar__field">
                <button
                    type="button"
                    className="compact-search-bar__section"
                    onClick={() => toggleDropdown("location")}
                >
                    <span className="compact-search-bar__value">
                        {locationLabel}
                    </span>
                </button>

                {activeDropdown === "location" && (
                    <div className="search-bar__dropdown compact-search-bar__dropdown">
                        <button
                            type="button"
                            className={`search-bar__dropdown-item${
                                !selectedLocation
                                    ? " search-bar__dropdown-item--active"
                                    : ""
                            }`}
                            onClick={() => handleLocationSelect({ value: "" })}
                        >
                            Anywhere
                        </button>

                        {LOCATIONS.filter((loc) => loc.value).map(
                            (location) => (
                                <button
                                    key={location.label}
                                    type="button"
                                    className={`search-bar__dropdown-item${
                                        selectedLocation?.value ===
                                        location.value
                                            ? " search-bar__dropdown-item--active"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        handleLocationSelect(location)
                                    }
                                >
                                    {location.label}
                                </button>
                            )
                        )}
                    </div>
                )}
            </div>

            <div className="compact-search-bar__divider" />

            {/* Dates field and check-in/check-out picker dropdown */}
            <div className="compact-search-bar__field">
                <button
                    type="button"
                    className="compact-search-bar__section"
                    onClick={() => toggleDropdown("dates")}
                >
                    <span className="compact-search-bar__value">
                        {formatDateRange(checkIn, checkOut)}
                    </span>
                </button>

                {activeDropdown === "dates" && (
                    <div className="search-bar__dropdown search-bar__dropdown--date compact-search-bar__dropdown">
                        <label
                            className="search-bar__date-label"
                            htmlFor="compact-check-in"
                        >
                            Check-in
                        </label>
                        <input
                            id="compact-check-in"
                            type="date"
                            className="search-bar__date-input"
                            value={checkIn}
                            min={todayString()}
                            onChange={(e) =>
                                handleCheckInChange(e.target.value)
                            }
                        />

                        <label
                            className="search-bar__date-label"
                            htmlFor="compact-check-out"
                            style={{ marginTop: "12px" }}
                        >
                            Checkout
                        </label>
                        <input
                            id="compact-check-out"
                            type="date"
                            className="search-bar__date-input"
                            value={checkOut}
                            min={minCheckOut}
                            disabled={!checkIn}
                            onChange={(e) =>
                                setCheckOut(e.target.value)
                            }
                        />
                        {!checkIn && (
                            <p className="search-bar__date-hint">
                                Please select a check-in date first
                            </p>
                        )}
                    </div>
                )}
            </div>

            <div className="compact-search-bar__divider" />

            {/* Guests field and adults/children counter dropdown */}
            <div className="compact-search-bar__field compact-search-bar__field--guests">
                <button
                    type="button"
                    className="compact-search-bar__section compact-search-bar__section--guests"
                    onClick={() => toggleDropdown("guests")}
                >
                    <span className="compact-search-bar__value compact-search-bar__value--guests">
                        {guestsLabel}
                    </span>
                </button>

                {activeDropdown === "guests" && (
                    <div className="search-bar__dropdown search-bar__dropdown--guests compact-search-bar__dropdown compact-search-bar__dropdown--guests">
                        <div className="search-bar__guest-row">
                            <span className="search-bar__guest-type">
                                Adults
                            </span>
                            <div className="search-bar__guest-controls">
                                <button
                                    type="button"
                                    className="search-bar__guest-btn"
                                    disabled={adults === 0}
                                    onClick={() =>
                                        setAdults((count) =>
                                            Math.max(0, count - 1)
                                        )
                                    }
                                    aria-label="Decrease adults"
                                >
                                    −
                                </button>
                                <span className="search-bar__guest-count">
                                    {adults}
                                </span>
                                <button
                                    type="button"
                                    className="search-bar__guest-btn"
                                    onClick={() =>
                                        setAdults((count) => count + 1)
                                    }
                                    aria-label="Increase adults"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <div className="search-bar__guest-row">
                            <span className="search-bar__guest-type">
                                Children
                            </span>
                            <div className="search-bar__guest-controls">
                                <button
                                    type="button"
                                    className="search-bar__guest-btn"
                                    disabled={children === 0}
                                    onClick={() =>
                                        setChildren((count) =>
                                            Math.max(0, count - 1)
                                        )
                                    }
                                    aria-label="Decrease children"
                                >
                                    −
                                </button>
                                <span className="search-bar__guest-count">
                                    {children}
                                </span>
                                <button
                                    type="button"
                                    className="search-bar__guest-btn"
                                    onClick={() =>
                                        setChildren((count) => count + 1)
                                    }
                                    aria-label="Increase children"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Pink search button — navigates with all current filters */}
            <button
                type="button"
                className="compact-search-bar__btn"
                aria-label="Search"
                onClick={handleSearch}
            >
                <FaSearch />
            </button>
        </div>
    );
};

export default CompactSearchBar;
