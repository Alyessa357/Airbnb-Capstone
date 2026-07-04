const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
{
    // User making reservation
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    // Property being reserved
    listing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing",
        required: true
    },

    checkInDate: {
        type: Date,
        required: true
    },

    checkOutDate: {
        type: Date,
        required: true
    },

    guests: {
        type: Number,
        required: true
    },

    totalPrice: {
        type: Number,
        required: true
    }

},
{
    timestamps: true
});

module.exports = mongoose.model(
    "Reservation",
    reservationSchema
);