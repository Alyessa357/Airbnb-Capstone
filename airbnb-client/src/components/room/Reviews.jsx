import { useState } from "react";
import { FaStar } from "react-icons/fa";

import "./Reviews.css";

const RATING_CATEGORIES = [
    { label: "Cleanliness", score: 5.0 },
    { label: "Communication", score: 5.0 },
    { label: "Check-in", score: 5.0 },
    { label: "Accuracy", score: 5.0 },
    { label: "Location", score: 4.9 },
    { label: "Value", score: 4.7 },
];

const REVIEWS = [
    {
        id: 1,
        name: "Jose",
        date: "December 2021",
        comment: "Host was very attentive.",
        avatar: "https://i.pravatar.cc/80?img=12",
    },
    {
        id: 2,
        name: "Luke",
        date: "December 2021",
        comment: "Nice place to stay!",
        avatar: "https://i.pravatar.cc/80?img=15",
    },
    {
        id: 3,
        name: "Shayna",
        date: "December 2021",
        comment:
            "This was such a lovely apartment in a central location. It was very clean and comfortable, and a great find in the neighborhood. Cool murphy bed that was easy to pull out and put away.",
        showMore: true,
        avatar: "https://i.pravatar.cc/80?img=23",
    },
    {
        id: 4,
        name: "Josh",
        date: "November 2021",
        comment:
            "Great space and the neighborhood had a lot of energy.",
        avatar: "https://i.pravatar.cc/80?img=33",
    },
    {
        id: 5,
        name: "Vladko",
        date: "November 2020",
        comment:
            "I stayed here for a business trip and the host was very hospitable.",
        avatar: "https://i.pravatar.cc/80?img=52",
    },
    {
        id: 6,
        name: "Jennifer",
        date: "January 2022",
        comment:
            "Great apartment in a central location. It is walking distance from many attractions. There is a substation nearby that you can hear at times, but it did not bother us.",
        showMore: true,
        avatar: "https://i.pravatar.cc/80?img=45",
    },
];

const ReviewCard = ({ review }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <article className="review">
            <div className="review__header">
                <img src={review.avatar} alt={review.name} />
                <div>
                    <h3>{review.name}</h3>
                    <p>{review.date}</p>
                </div>
            </div>

            <p
                className={`review__comment${
                    review.showMore && !expanded
                        ? " review__comment--clamped"
                        : ""
                }`}
            >
                {review.comment}
            </p>

            {review.showMore && !expanded && (
                <button
                    type="button"
                    className="review__show-more"
                    onClick={() => setExpanded(true)}
                >
                    Show more &gt;
                </button>
            )}
        </article>
    );
};

const Reviews = ({ rating = 5.0, reviewCount = 7 }) => {
    return (
        <section className="reviews">
            <h2 className="reviews__heading">
                <FaStar className="reviews__star" />
                <span>
                    {rating.toFixed(1)} · {reviewCount} reviews
                </span>
            </h2>

            <div className="reviews__categories">
                {RATING_CATEGORIES.map((category) => (
                    <div key={category.label} className="reviews__category">
                        <span className="reviews__category-label">
                            {category.label}
                        </span>
                        <div className="reviews__bar">
                            <span
                                style={{
                                    width: `${(category.score / 5) * 100}%`,
                                }}
                            />
                        </div>
                        <strong className="reviews__category-score">
                            {category.score.toFixed(1)}
                        </strong>
                    </div>
                ))}
            </div>

            <div className="reviews__grid">
                {REVIEWS.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                ))}
            </div>

            <button type="button" className="reviews__show-all">
                Show all 12 reviews
            </button>
        </section>
    );
};

export default Reviews;

