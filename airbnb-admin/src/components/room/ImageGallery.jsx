import { FaTh } from "react-icons/fa";

import "./ImageGallery.css";

// Default image used when the listing has no photos
const FALLBACK_IMAGE =
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85";

// Displays a main photo plus a 2x2 grid of thumbnails
const ImageGallery = ({ listing }) => {
    // Use listing images or repeat the fallback five times
    const images =
        listing.images?.length > 0
            ? listing.images
            : Array(5).fill(FALLBACK_IMAGE);

    // Always five slots — missing images fall back to the first photo
    const galleryImages = [
        images[0],
        images[1] || images[0],
        images[2] || images[0],
        images[3] || images[0],
        images[4] || images[0],
    ];

    return (
        <div className="image-gallery">
            {/* Large hero image on the left */}
            <div className="image-gallery__main">
                <img src={galleryImages[0]} alt={listing.title} />
            </div>

            {/* Four smaller thumbnails in a 2x2 grid on the right */}
            <div className="image-gallery__grid">
                {galleryImages.slice(1).map((image, index) => (
                    <img
                        key={`${image}-${index}`}
                        src={image}
                        alt={`${listing.title} ${index + 2}`}
                    />
                ))}
            </div>

            <button type="button" className="image-gallery__show-all">
                <FaTh />
                Show all photos
            </button>
        </div>
    );
};

export default ImageGallery;
