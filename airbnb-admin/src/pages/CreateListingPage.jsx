import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import AdminFormLayout from "../components/AdminFormLayout";
import useAuth from "../context/useAuth";
import listingService from "../services/listingService";

import "../styles/createListingPage.css";

const TYPE_OPTIONS = [
    "Entire home",
    "Private room",
    "Shared room",
    "Hotel room",
    "Entire Apartment",
];

const CreateListingPage = () => {
    const { token } = useAuth();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [bedrooms, setBedrooms] = useState("");
    const [bathrooms, setBathrooms] = useState("");
    const [type, setType] = useState("");
    const [guests, setGuests] = useState("");
    const [price, setPrice] = useState("");
    const [amenityInput, setAmenityInput] = useState("");
    const [amenities, setAmenities] = useState([]);
    const [images, setImages] = useState([]);

    const [imageUrl, setImageUrl] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleAddAmenity = () => {
        const value = amenityInput.trim();
        if (!value || amenities.includes(value)) return;

        setAmenities((current) => [...current, value]);
        setAmenityInput("");
    };

    const handleRemoveAmenity = (amenity) => {
        setAmenities((current) =>
            current.filter((item) => item !== amenity)
        );
    };

    const handleAddImage = () => {

        const value = imageUrl.trim();

        if (!value) {
            return;
        }

        setImages((current) => [
            ...current,
            value
        ]);

        setImageUrl("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setSuccess("");

        if (
            !title ||
            !location ||
            !description ||
            !type ||
            !guests ||
            !bedrooms ||
            !bathrooms ||
            !price
        ) {
            setError("Please complete all fields");
            return;
        }

        try {
            setLoading(true);

            await listingService.createListing(
                {
                    title,
                    location,
                    description,
                    type,
                    guests: Number(guests),
                    bedrooms: Number(bedrooms),
                    bathrooms: Number(bathrooms),
                    price: Number(price),
                    amenities,
                    images,
                },
                token
            );

            setSuccess("Listing created successfully");

            setTitle("");
            setLocation("");
            setDescription("");
            setBedrooms("");
            setBathrooms("");
            setType("");
            setGuests("");
            setPrice("");
            setAmenities([]);
            setImages([]);
            setImageUrl("");
        } catch (err) {
            setError(
                err.response?.data?.message || "Failed to create listing"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminFormLayout>
            <div className="create-listing">
                <h1 className="create-listing__title">Create Listing</h1>

                {error && (
                    <p className="create-listing__message create-listing__message--error">
                        {error}
                    </p>
                )}

                {success && (
                    <p className="create-listing__message create-listing__message--success">
                        {success}
                    </p>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="create-listing__grid">
                        <div className="create-listing__column">

                            <div className="create-listing__field">
                                <label htmlFor="listing-name">
                                    Listing Name
                                </label>
                                <input
                                    id="listing-name"
                                    type="text"
                                    value={title}
                                    onChange={(e) =>
                                        setTitle(e.target.value)
                                    }
                                />
                            </div>

                            <div className="create-listing__field">
                                <label htmlFor="listing-location">
                                    Location
                                </label>
                                <input
                                    id="listing-location"
                                    type="text"
                                    value={location}
                                    onChange={(e) =>
                                        setLocation(e.target.value)
                                    }
                                />
                            </div>

                            <div className="create-listing__field">
                                <label htmlFor="listing-description">
                                    Description
                                </label>
                                <textarea
                                    id="listing-description"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div className="create-listing__column">
                            <div className="create-listing__field">
                                <label>Rooms, Baths, &amp; Type</label>
                                <div className="create-listing__row">
                                    <input
                                        type="number"
                                        min="0"
                                        placeholder="Rooms"
                                        value={bedrooms}
                                        onChange={(e) =>
                                            setBedrooms(e.target.value)
                                        }
                                    />
                                    <input
                                        type="number"
                                        min="0"
                                        placeholder="Baths"
                                        value={bathrooms}
                                        onChange={(e) =>
                                            setBathrooms(e.target.value)
                                        }
                                    />
                                    <select
                                        value={type}
                                        onChange={(e) =>
                                            setType(e.target.value)
                                        }
                                    >
                                        <option value="">Type</option>
                                        {TYPE_OPTIONS.map((option) => (
                                            <option
                                                key={option}
                                                value={option}
                                            >
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="create-listing__field">
                                <label htmlFor="listing-guests">
                                    Guests
                                </label>
                                <input
                                    id="listing-guests"
                                    type="number"
                                    min="1"
                                    value={guests}
                                    onChange={(e) =>
                                        setGuests(e.target.value)
                                    }
                                />
                            </div>

                            <div className="create-listing__field">
                                <label htmlFor="listing-price">
                                    Price
                                </label>
                                <input
                                    id="listing-price"
                                    type="number"
                                    min="0"
                                    value={price}
                                    onChange={(e) =>
                                        setPrice(e.target.value)
                                    }
                                />
                            </div>

                            <div className="create-listing__field">
                                <label htmlFor="listing-amenity">
                                    Amenities
                                </label>
                                <div className="create-listing__amenities">
                                    <input
                                        id="listing-amenity"
                                        type="text"
                                        value={amenityInput}
                                        onChange={(e) =>
                                            setAmenityInput(e.target.value)
                                        }
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();
                                                handleAddAmenity();
                                            }
                                        }}
                                    />
                                    <button
                                        type="button"
                                        className="create-listing__add-btn"
                                        onClick={handleAddAmenity}
                                    >
                                        Add
                                    </button>
                                </div>

                                {amenities.length > 0 && (
                                    <div className="create-listing__amenity-tags">
                                        {amenities.map((amenity) => (
                                            <span
                                                key={amenity}
                                                className="create-listing__amenity-tag"
                                            >
                                                {amenity}
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleRemoveAmenity(
                                                            amenity
                                                        )
                                                    }
                                                    aria-label={`Remove ${amenity}`}
                                                >
                                                    ×
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="create-listing__field create-listing__images-section">
                        <label>Images</label>

                        <div className="create-listing__amenities  create-listing__images-section">

                            <input
                                type="text"
                                placeholder="Paste image URL"
                                value={imageUrl}
                                onChange={(e) =>
                                    setImageUrl(
                                        e.target.value
                                    )
                                }
                            />

                            <button
                                type="button"
                                className="create-listing__upload-btn"
                                onClick={handleAddImage}
                            >
                                Add Image
                            </button>

                        </div>

                        <div className="create-listing__image-preview">
                            {images.length === 0 ? (
                                <p className="create-listing__image-placeholder">
                                    Uploaded images will appear here
                                </p>
                            ) : (
                                images.map((image, index) => (
                                    <img
                                        key={`${index}-${image.slice(0, 20)}`}
                                        src={image}
                                        alt={`Preview ${index + 1}`}
                                    />
                                ))
                            )}

                        </div>
                    </div>

                    <div className="create-listing__actions">
                        <button
                            type="submit"
                            className="create-listing__submit"
                            disabled={loading}
                        >
                            {loading ? "Creating..." : "Create"}
                        </button>

                        <button
                            type="button"
                            className="create-listing__cancel"
                            onClick={() => navigate("/listings")}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </AdminFormLayout>
    );
};

export default CreateListingPage;
