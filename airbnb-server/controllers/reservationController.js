const Reservation = require("../models/Reservation");

// Create reservation
const createReservation = async (req, res) => {

    try {

        const reservation =
            await Reservation.create({

                user: req.user.id,

                listing: req.body.listing,

                checkInDate:
                    req.body.checkInDate,

                checkOutDate:
                    req.body.checkOutDate,

                guests:
                    req.body.guests,

                totalPrice:
                    req.body.totalPrice

            });

        res.status(201).json({

            success: true,

            message:
                "Reservation created successfully",

            reservation

        });

    }
    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// Get all reservations
const getReservations = async (req, res) => {

    try {

        const reservations = await Reservation.find()

            .populate("user")
            .populate("listing");

        res.status(200).json({

            success: true,

            count: reservations.length,

            reservations

        });

    }
    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// Get logged in user's reservations
const getMyReservations =
    async (req, res) => {

        try {

            const reservations =
                await Reservation.find({

                    user: req.user.id

                })

                .populate("listing");

            res.status(200).json({

                success: true,

                count:
                    reservations.length,

                reservations

            });

        }
        catch (error) {

            res.status(500).json({

                success: false,

                message:
                    error.message

            });

        }

    };

// Get one reservation
const getReservationById = async (req, res) => {

    try {

        const reservation = await Reservation.findById(
            req.params.id
        )

        .populate("user")
        .populate("listing");

        if (!reservation) {

            return res.status(404).json({

                success: false,

                message: "Reservation not found"

            });

        }

        res.status(200).json({

            success: true,

            reservation

        });

    }
    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// Update reservation
const updateReservation = async (req, res) => {

    try {

        const reservation = await Reservation.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new: true,
                runValidators: true
            }

        );

        if (!reservation) {

            return res.status(404).json({

                success: false,

                message: "Reservation not found"

            });

        }

        res.status(200).json({

            success: true,

            message: "Reservation updated successfully",

            reservation

        });

    }
    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// Delete reservation
const deleteReservation = async (req, res) => {

    try {

        const reservation = await Reservation.findByIdAndDelete(
            req.params.id
        );

        if (!reservation) {

            return res.status(404).json({

            success: false,

            message: "Reservation not found"

            });

        }

        res.status(200).json({

            success: true,

            message: "Reservation deleted successfully"

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

    createReservation,

    getReservations,

    getMyReservations,

    getReservationById,

    updateReservation,

    deleteReservation

};