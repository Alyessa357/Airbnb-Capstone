import { FaTh } from "react-icons/fa";

import "./ImageGallery.css";

const FALLBACK_IMAGE =
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85";

const ImageGallery = ({ listing }) => {
    const images =
        listing.images?.length > 0
            ? listing.images
            : Array(5).fill(FALLBACK_IMAGE);

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

            <button type="button" className="image-gallery__show-all">
                <FaTh />
                Show all photos
            </button>
        </div>
    );
};

export default ImageGallery;
