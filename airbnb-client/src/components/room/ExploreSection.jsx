import "./ExploreSection.css";

const CITY_GROUPS = [
    ["Paris", "Lille", "Toulouse"],
    ["Nice", "Aix-en-Provence", "Montpellier"],
    ["Lyon", "Rouen", "Dijon"],
    ["Marseille", "Amiens", "Grenoble"],
];

const STAY_GROUPS = [
    ["Beach House Rentals", "Cabin Rentals"],
    ["Camper Rentals", "Tiny House Rentals"],
    ["Glamping Rentals", "Lakehouse Rentals"],
    ["Treehouse Rentals", "Mountain Chalet Rentals"],
];

const ExploreSection = ({ location = "Bordeaux" }) => {
    const country = location.includes(",")
        ? location.split(",").pop().trim()
        : "France";
    const city = location.split(",")[0].trim();

    return (
        <section className="explore-section">
            <h2>Explore other options in {country}</h2>

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
