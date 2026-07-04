const express = require("express");

const router = express.Router();

const {

    createReservation,

    getReservations,

    getMyReservations,

    getReservationById,

    updateReservation,

    deleteReservation

}
=
require("../controllers/reservationController");

const {

    protect

}
=
require("../middleware/authMiddleware");


// CREATE
router.post(
    "/",
    protect,
    createReservation
);


// READ ALL
router.get(
    "/",
    protect,
    getReservations
);

// Logged in user's trips
router.get(
    "/my-trips",
    protect,
    getMyReservations
);


// READ ONE
router.get(
    "/:id",
    protect,
    getReservationById
);


// UPDATE
router.put(
    "/:id",
    protect,
    updateReservation
);


// DELETE
router.delete(
    "/:id",
    protect,
    deleteReservation
);

module.exports = router;