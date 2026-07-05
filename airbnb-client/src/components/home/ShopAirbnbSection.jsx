import { FaAirbnb } from "react-icons/fa";

import "./ShopAirbnbSection.css";

// Three overlapping gift cards — solid color or background image each
const GIFT_CARDS = [
    {
        id: "red",
        type: "solid",
        color: "#ff385c",
        className: "gift-card--center",
    },
    {
        id: "lavender",
        type: "image",
        image:
            "https://media.istockphoto.com/id/1463217398/photo/view-through-an-open-window-with-shutters-looking-down-on-the-colorful-picturesque-village-of.jpg?s=612x612&w=0&k=20&c=fpvSQTSw8Etk1op0VoeN7i8waS5Xk_lupJqMImNFXRU=",
        className: "gift-card--left",
    },
    {
        id: "coastal",
        type: "image",
        image:
            "https://media.istockphoto.com/id/2256921470/photo/a-family-stands-by-the-swimming-pool-and-looks-at-the-beautiful-summer-sunset.jpg?s=612x612&w=0&k=20&c=QGtjnzReOOhxC_ahepoGSI3AF1yfSGovnoaeDVLGxOc=",
        className: "gift-card--right",
    },
];

// Home page section — gift cards promo and hosting Q&A banner
const ShopAirbnbSection = () => {
    return (
        <section className="shop-hosting">
            {/* Gift cards block — heading, button, and stacked card visuals */}
            <div className="gift-cards">
                <div className="gift-cards__content">
                    <h2>
                        Shop Airbnb
                        <br />
                        gift cards
                    </h2>

                    <button type="button" className="shop-hosting__btn-dark">
                        Learn more
                    </button>
                </div>

                <div className="gift-cards__stack">
                    {GIFT_CARDS.map((card) => (
                        <div
                            key={card.id}
                            className={`gift-card ${card.className}`}
                            style={
                                card.type === "solid"
                                    ? { backgroundColor: card.color }
                                    : {
                                          backgroundImage: `url(${card.image})`,
                                      }
                            }
                        >
                            <FaAirbnb
                                className="gift-card__logo"
                                size={32}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Hosting banner — background photo with "Ask a Superhost" CTA */}
            <div className="hosting-banner">
                <div className="hosting-banner__overlay">
                    <h2>
                        Questions
                        <br />
                        about
                        <br />
                        hosting?
                    </h2>

                    <button
                        type="button"
                        className="shop-hosting__btn-light"
                    >
                        Ask a Superhost
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ShopAirbnbSection;
