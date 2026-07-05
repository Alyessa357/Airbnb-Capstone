import "./SleepSection.css";

// Default bedroom photo when the listing has no images
const FALLBACK_IMAGE =
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304";

// Shows the bedroom photo and bed type for a listing
const SleepSection = ({ listing }) => {
    // Prefer second listing image (often a bedroom shot), then first, then fallback
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
