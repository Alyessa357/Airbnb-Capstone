import ExperienceCard from "./ExperienceCard";
import "./ExperienceSection.css";

const experiences = [
    {
        title: "Things to do on your trip",
        buttonText: "Experiences",
        image:
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    },
    {
        title: "Things to do from home",
        buttonText: "Online Experiences",
        image:
            "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80",
    },
];

const ExperienceSection = () => {
    return (
        <section className="experience-section">
            <h2>Discover Airbnb Experiences</h2>

            <div className="experience-grid">
                {experiences.map((experience) => (
                    <ExperienceCard
                        key={experience.title}
                        title={experience.title}
                        buttonText={experience.buttonText}
                        image={experience.image}
                    />
                ))}
            </div>
        </section>
    );
};

export default ExperienceSection;
