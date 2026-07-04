const User = require("../models/User");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {

    try {

        const {
            username,
            email,
            password,
            role
        } = req.body;

        // Check if email already exists
        const existingUser =
            await User.findOne({ email });

        if (existingUser) {

            return res.status(400).json({
                success: false,
                message: "User already exists"
            });

        }

        // Encrypt password
        const hashedPassword =
            await bcrypt.hash(password, 10);

        // Create new user
        const user =
            await User.create({

                username,

                email,

                password: hashedPassword,

                role

            });

        res.status(201).json({

            success: true,

            message: "User registered successfully",

            user

        });

    }
    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

const loginUser = async (req, res) => {

    try {

        // Extract email and password from request body
        const { email, password } = req.body;

        // Look for the user in the database
        const user = await User.findOne({ email });

        // User not found
        if (!user) {

            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });

        }

        // Compare entered password with encrypted password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        // Password incorrect
        if (!isMatch) {

            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });

        }

        // Generate JWT token
        const token = jwt.sign(

            {
                id: user._id,
                role: user.role
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "1d"
            }

        );

        // Successful login
        res.status(200).json({

            success: true,

            message: "Login successful",

            token,

            user: {

                id: user._id,

                username: user.username,

                email: user.email,

                role: user.role

            }

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
    registerUser,
    loginUser
};