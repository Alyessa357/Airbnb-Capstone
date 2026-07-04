const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(
{
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

    type: {
        type: String,
        required: true
    },

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

    price: {
        type: Number,
        required: true
    },

    amenities: [
        {
            type: String
        }
    ],

    images: [
        {
            type: String
        }
    ],

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

    rating: {
        type: Number,
        default: 4.8
    },

    reviews: {
        type: Number,
        default: 0
    },

    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

},
{
    timestamps: true
});

module.exports = mongoose.model(
    "Listing",
    listingSchema
);