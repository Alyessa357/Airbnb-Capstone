const express = require("express");

const router = express.Router();

const {

    createListing,

    getListings,

    getListingById,

    updateListing,

    deleteListing

} = require("../controllers/listingController");

const {

    protect

} = require("../middleware/authMiddleware");


// CREATE
router.post(
    "/",
    protect,
    createListing
);


// READ ALL
router.get(
    "/",
    getListings
);


// READ ONE
router.get(
    "/:id",
    getListingById
);


// UPDATE
router.put(
    "/:id",
    protect,
    updateListing
);


// DELETE
router.delete(
    "/:id",
    protect,
    deleteListing
);

module.exports = router;