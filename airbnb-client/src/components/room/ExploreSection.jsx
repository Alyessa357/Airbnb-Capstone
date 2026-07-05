import "./ExploreSection.css";

// French cities grouped into four columns for the explore grid
const CITY_GROUPS = [
    ["Paris", "Lille", "Toulouse"],
    ["Nice", "Aix-en-Provence", "Montpellier"],
    ["Lyon", "Rouen", "Dijon"],
    ["Marseille", "Amiens", "Grenoble"],
];

// Unique stay types grouped into four columns
const STAY_GROUPS = [
    ["Beach House Rentals", "Cabin Rentals"],
    ["Camper Rentals", "Tiny House Rentals"],
    ["Glamping Rentals", "Lakehouse Rentals"],
    ["Treehouse Rentals", "Mountain Chalet Rentals"],
];

// Footer-style section with related cities, stay types, and breadcrumb
const ExploreSection = ({ location = "Bordeaux" }) => {
    // Parse "City, Country" from the listing location string
    const country = location.includes(",")
        ? location.split(",").pop().trim()
        : "France";
    const city = location.split(",")[0].trim();

    return (
        <section className="explore-section">
            <h2>Explore other options in {country}</h2>

            {/* City link columns — buttons are UI only for now */}
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

            {/* Breadcrumb: Airbnb › Europe › country › city */}
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
