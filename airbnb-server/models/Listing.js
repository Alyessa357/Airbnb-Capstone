const mongoose = require("mongoose");

// Define the structure for property listing documents in MongoDB
const listingSchema = new mongoose.Schema(
{
    // Basic listing details
    title: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    // Property type (e.g. Entire home, Private room)
    type: {
        type: String,
        required: true
    },

    // Capacity and room counts
    guests: {
        type: Number,
        required: true
    },

    bedrooms: {
        type: Number,
        required: true
    },

    bathrooms: {
        type: Number,
        required: true
    },

    // Nightly price in USD
    price: {
        type: Number,
        required: true
    },

    // List of amenity names (e.g. WiFi, Pool)
    amenities: [
        {
            type: String
        }
    ],

    // Image URLs for the listing
    images: [
        {
            type: String
        }
    ],

    // Reservation pricing — used on the client reservation card
    weeklyDiscount: {
        type: Number,
        default: 0
    },

    cleaningFee: {
        type: Number,
        default: 50
    },

    serviceFee: {
        type: Number,
        default: 50
    },

    occupancyTaxes: {
        type: Number,
        default: 30
    },

    // Review summary shown on listing cards
    rating: {
        type: Number,
        default: 4.8
    },

    reviews: {
        type: Number,
        default: 0
    },

    // Reference to the user who created the listing
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

},
{
    // Automatically adds createdAt and updatedAt fields
    timestamps: true
});

// Register the schema as a Mongoose model
module.exports = mongoose.model(
    "Listing",
    listingSchema
);