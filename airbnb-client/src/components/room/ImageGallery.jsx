import { FaTh } from "react-icons/fa";

import "./ImageGallery.css";

// Placeholder when the listing has no uploaded images
const FALLBACK_IMAGE =
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85";

// Hero + four-thumbnail photo grid at the top of room details
const ImageGallery = ({ listing }) => {
    const images =
        listing.images?.length > 0
            ? listing.images
            : Array(5).fill(FALLBACK_IMAGE);

    // Always show five slots — reuse the first image when fewer are available
    const galleryImages = [
        images[0],
        images[1] || images[0],
        images[2] || images[0],
        images[3] || images[0],
        images[4] || images[0],
    ];

    return (
        <div className="image-gallery">
            <div className="image-gallery__main">
                <img src={galleryImages[0]} alt={listing.title} />
            </div>

            <div className="image-gallery__grid">
                {galleryImages.slice(1).map((image, index) => (
                    <img
                        key={`${image}-${index}`}
                        src={image}
                        alt={`${listing.title} ${index + 2}`}
                    />
                ))}
            </div>

            {/* UI only — not wired to a full-screen gallery yet */}
            <button type="button" className="image-gallery__show-all">
                <FaTh />
                Show all photos
            </button>
        </div>
    );
};

export default ImageGallery;
