import "./SleepSection.css";

// Placeholder bedroom photo when listing images are missing
const FALLBACK_IMAGE =
    "https://images.unsplash.com/photo-1562438668-bcf0ca6578f0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW9kZXJuJTIwYmVkcm9vbXxlbnwwfHwwfHx8MA%3D%3D";

// "Where you'll sleep" bedroom card on room details
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
