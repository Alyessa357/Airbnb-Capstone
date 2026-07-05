import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import listingService from "../services/listingService";
import useAuth from "../context/useAuth";

import AdminFormLayout from "../components/AdminFormLayout";
import "../styles/createListingPage.css";

const TYPE_OPTIONS = [
    "Entire home",
    "Private room",
    "Shared room",
    "Hotel room",
    "Entire Apartment",
];

const UpdateListingPage = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const { token } = useAuth();

    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [guests, setGuests] = useState("");
    const [bedrooms, setBedrooms] = useState("");
    const [bathrooms, setBathrooms] = useState("");
    const [price, setPrice] = useState("");
    const [weeklyDiscount, setWeeklyDiscount] = useState("");
    const [cleaningFee, setCleaningFee] = useState("");
    const [serviceFee, setServiceFee] = useState("");
    const [occupancyTaxes, setOccupancyTaxes] = useState("");

    const [amenityInput, setAmenityInput] = useState("");
    const [amenities, setAmenities] = useState([]);
    const [images, setImages] = useState([]);
    const [imageUrl, setImageUrl] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Fetch listing when page loads

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const data = await listingService.getListingById(
                    id,
                    token
                );

                const listing = data.listing;

                setTitle(listing.title);
                setLocation(listing.location);
                setDescription(listing.description);
                setType(listing.type);
                setGuests(listing.guests);
                setBedrooms(listing.bedrooms);
                setBathrooms(listing.bathrooms);
                setPrice(listing.price);
                setWeeklyDiscount(listing.weeklyDiscount ?? 0);
                setCleaningFee(listing.cleaningFee ?? 50);
                setServiceFee(listing.serviceFee ?? 50);
                setOccupancyTaxes(listing.occupancyTaxes ?? 30);
                setAmenities(listing.amenities || []);
                setImages(listing.images || []);
            }
            catch (error) {
                setError("Failed to load listing");
            }
            finally {
                setLoading(false);
            }
        };

        fetchListing();
    }, [id, token]);

    // Update listing

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        try {
            const updatedListing = {
                title,
                location,
                description,
                type,
                guests: Number(guests),
                bedrooms: Number(bedrooms),
                bathrooms: Number(bathrooms),
                price: Number(price),
                weeklyDiscount: Number(weeklyDiscount),
                cleaningFee: Number(cleaningFee),
                serviceFee: Number(serviceFee),
                occupancyTaxes: Number(occupancyTaxes),
                amenities,
                images
            };

            await listingService.updateListing(
                id,
                updatedListing,
                token
            );

            setSuccess(
                "Listing updated successfully!"
            );

            setTimeout(() => {
                navigate("/listings");
            }, 1500);
        }
        catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to update listing"
            );
        }
    };

    // ------------

    const handleAddAmenity = () => {
    const value = amenityInput.trim();

    if (!value || amenities.includes(value)) {
        return;
    }

    setAmenities([
        ...amenities,
        value
    ]);

    setAmenityInput("");
};

const handleRemoveAmenity = (amenity) => {
    setAmenities(
        amenities.filter(
            item => item !== amenity
        )
    );
};

const handleAddImage = () => {
    const value = imageUrl.trim();

    if (!value) {
        return;
    }

    setImages([
        ...images,
        value
    ]);

    setImageUrl("");
};

const handleRemoveImage = (imageToRemove) => {
    setImages(
        images.filter(
            image =>
                image !== imageToRemove
        )
    );
};

    // Loading state

    if (loading) {
    return (
        <AdminFormLayout>
            <h2>Loading listing...</h2>
        </AdminFormLayout>
    );
}

    // Page UI

    return (
    <AdminFormLayout>

        <div className="create-listing">

            <h1 className="create-listing__title">
                Update Listing
            </h1>

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
                                    {/* Price */}
                                    Price (per night)
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
                                <label>Fees &amp; Discounts</label>
                                <div className="create-listing__fees-grid">
                                    <div>
                                        <label htmlFor="listing-weekly-discount">
                                            Weekly discount
                                        </label>
                                        <input
                                            id="listing-weekly-discount"
                                            type="number"
                                            min="0"
                                            value={weeklyDiscount}
                                            onChange={(e) =>
                                                setWeeklyDiscount(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="listing-cleaning-fee">
                                            Cleaning fee
                                        </label>
                                        <input
                                            id="listing-cleaning-fee"
                                            type="number"
                                            min="0"
                                            value={cleaningFee}
                                            onChange={(e) =>
                                                setCleaningFee(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="listing-service-fee">
                                            Service fee
                                        </label>
                                        <input
                                            id="listing-service-fee"
                                            type="number"
                                            min="0"
                                            value={serviceFee}
                                            onChange={(e) =>
                                                setServiceFee(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="listing-occupancy-taxes">
                                            Occupancy taxes
                                        </label>
                                        <input
                                            id="listing-occupancy-taxes"
                                            type="number"
                                            min="0"
                                            value={occupancyTaxes}
                                            onChange={(e) =>
                                                setOccupancyTaxes(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
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
                                    <div key={index}>

                                        <img
                                            src={image}
                                            alt={`Preview ${index + 1}`}
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleRemoveImage(image)
                                            }
                                        >
                                            Remove
                                        </button>

                                    </div>
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
                            {loading ? "Updating..." : "Update Listing"}
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

export default UpdateListingPage;