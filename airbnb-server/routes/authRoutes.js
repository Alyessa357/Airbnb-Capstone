const express = require("express");

const router = express.Router();

const {
    registerUser,
    loginUser
}
=
require("../controllers/authController");

const { protect } =
require("../middleware/authMiddleware");

// POST /api/auth/register
router.post(
    "/register",
    registerUser
);

// POST /api/auth/login
router.post(
    "/login",
    loginUser
);

// Test route
router.get(
    "/profile",
    protect,
    (req, res) => {

        res.status(200).json({

            success: true,

            message: "Protected route accessed",

            user: req.user

        });

    }
);

module.exports = router;