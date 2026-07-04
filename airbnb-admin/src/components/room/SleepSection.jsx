import "./SleepSection.css";

const FALLBACK_IMAGE =
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304";

const SleepSection = ({ listing }) => {
    const bedroomImage = listing.images?.[1] || listing.images?.[0] || FALLBACK_IMAGE;

    return (
        <section className="sleep-section">
            <h2>Where you&apos;ll sleep</h2>

            <article className="sleep-section__card">
                <img src={bedroomImage} alt="Bedroom" />
                <div>
                    <h3>Bedroom</h3>
                    <p>1 queen bed</p>
                </div>
            </article>
        </section>
    );
};

export default SleepSection;
