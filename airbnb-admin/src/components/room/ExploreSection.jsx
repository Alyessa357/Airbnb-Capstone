import "./ExploreSection.css";

// City links grouped into four columns for the "Explore other options" grid
const CITY_GROUPS = [
    ["Paris", "Lille", "Toulouse"],
    ["Nice", "Aix-en-Provence", "Montpellier"],
    ["Lyon", "Rouen", "Dijon"],
    ["Marseille", "Amiens", "Grenoble"],
];

// Unique stay type links grouped into four columns
const STAY_GROUPS = [
    ["Beach House Rentals", "Cabin Rentals"],
    ["Camper Rentals", "Tiny House Rentals"],
    ["Glamping Rentals", "Lakehouse Rentals"],
    ["Treehouse Rentals", "Mountain Chalet Rentals"],
];

// Footer-style section with city links, stay types, and breadcrumb navigation
const ExploreSection = ({ location = "Bordeaux" }) => {
    // Parse country from "City, Country" format, defaulting to France
    const country = location.includes(",")
        ? location.split(",").pop().trim()
        : "France";
    const city = location.split(",")[0].trim();

    return (
        <section className="explore-section">
            <h2>Explore other options in {country}</h2>

            {/* City link grid — four columns of destination buttons */}
            <div className="explore-section__grid">
                {CITY_GROUPS.map((group, index) => (
                    <div key={`city-${index}`} className="explore-section__column">
                        {group.map((item) => (
                            <button key={item} type="button">
                                {item}
                            </button>
                        ))}
                    </div>
                ))}
            </div>

            <h3>Unique stays on Airbnb</h3>

            {/* Stay type link grid — four columns of rental category buttons */}
            <div className="explore-section__grid">
                {STAY_GROUPS.map((group, index) => (
                    <div key={`stay-${index}`} className="explore-section__column">
                        {group.map((item) => (
                            <button key={item} type="button">
                                {item}
                            </button>
                        ))}
                    </div>
                ))}
            </div>

            {/* Location breadcrumb: Airbnb › Europe › Country › City */}
            <nav className="explore-section__breadcrumb" aria-label="Breadcrumb">
                <button type="button">Airbnb</button>
                <span>›</span>
                <button type="button">Europe</button>
                <span>›</span>
                <button type="button">{country}</button>
                <span>›</span>
                <button type="button">{city}</button>
            </nav>
        </section>
    );
};

export default ExploreSection;
