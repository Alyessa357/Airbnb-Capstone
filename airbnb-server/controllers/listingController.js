const Listing = require("../models/Listing");

// Create listing
const createListing = async (req, res) => {

    try {

        const listing = await Listing.create(req.body);

        res.status(201).json({

            success: true,

            message: "Listing created successfully",

            listing

        });

    }
    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// Get all listings
const getListings = async (req, res) => {

    try {

        const listings = await Listing.find();

        res.status(200).json({

            success: true,

            count: listings.length,

            listings

        });

    }
    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// Get single listing
const getListingById = async (req, res) => {

    try {

        const listing = await Listing.findById(req.params.id);

        if (!listing) {

            return res.status(404).json({

                success: false,

                message: "Listing not found"

            });

        }

        res.status(200).json({

            success: true,

            listing

        });

    }
    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// Update listing
const updateListing = async (req, res) => {

    try {

        const listing = await Listing.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new: true,
                runValidators: true
            }

        );

        if (!listing) {

            return res.status(404).json({

                success: false,

                message: "Listing not found"

            });

        }

        res.status(200).json({

            success: true,

            message: "Listing updated successfully",

            listing

        });

    }
    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// Delete listing
const deleteListing = async (req, res) => {

    try {

        const listing = await Listing.findByIdAndDelete(
            req.params.id
        );

        if (!listing) {

            return res.status(404).json({

                success: false,

                message: "Listing not found"

            });

        }

        res.status(200).json({

            success: true,

            message: "Listing deleted successfully"

        });

    }
    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {

    createListing,

    getListings,

    getListingById,

    updateListing,

    deleteListing

};