import DestinationCard from "./DestinationCard";
import "./InspirationSection.css";

// Static destination data — image, title, distance, and footer color per card
const destinations = [
    {
        title: "Sandton City Hotel",
        distance: "53 km away",
        footerColor: "#DE3151",
        image:
            "https://plus.unsplash.com/premium_photo-1661929519129-7a76946c1d38?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bHV4dXJ5JTIwaG90ZWx8ZW58MHx8MHx8fDA%3D",
    },
    {
        title: "Joburg City Hotel",
        distance: "168 km away",
        footerColor: "#BC1A6E",
        image:
            "https://media.citizen.co.za/wp-content/uploads/2021/04/houghton-hotel-lead.jpg",
    },
    {
        title: "Woodmead Hotel",
        distance: "30 miles away",
        footerColor: "#DE3151",
        image:
            "https://plus.unsplash.com/premium_photo-1661964071015-d97428970584?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bHV4dXJ5JTIwaG90ZWx8ZW58MHx8MHx8fDA%3D",
    },
    {
        title: "Hyde Park Hotel",
        distance: "34 km away",
        footerColor: "#D93B30",
        image:
            "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGx1eHVyeSUyMGhvdGVsfGVufDB8fDB8fHww",
    },
];

// Home page section — grid of nearby destination cards
const InspirationSection = () => {
    return (
        <section className="inspiration-section">
            <h2>Inspiration for your next trip</h2>

            <div className="destination-grid">
                {destinations.map((destination) => (
                    <DestinationCard
                        key={destination.title}
                        title={destination.title}
                        distance={destination.distance}
                        image={destination.image}
                        footerColor={destination.footerColor}
                    />
                ))}
            </div>
        </section>
    );
};

export default InspirationSection;
