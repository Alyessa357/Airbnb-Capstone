const mongoose = require("mongoose");

// Define the structure for booking/reservation documents in MongoDB
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

    // Start date of the stay
    checkInDate: {
        type: Date,
        required: true
    },

     // End date of the stay
    checkOutDate: {
        type: Date,
        required: true
    },

    // Number of guests for this booking
    guests: {
        type: Number,
        required: true
    },

    // Final calculated price at time of booking
    totalPrice: {
        type: Number,
        required: true
    }

},
{
    // Automatically adds createdAt and updatedAt fields
    timestamps: true
});

// Register the schema as a Mongoose model
module.exports = mongoose.model(
    "Reservation",
    reservationSchema
);