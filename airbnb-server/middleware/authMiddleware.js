const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {

    try {

        let token;

        // Check whether authorization header exists
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {

            // Remove the word "Bearer"
            token =
                req.headers.authorization.split(" ")[1];

            // Verify token
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            );

            // Save decoded information into request
            req.user = decoded;

            // Continue to route
            next();

        }
        else {

            res.status(401).json({

                success: false,

                message: "Not authorized, token missing"

            });

        }

    }
    catch (error) {

        res.status(401).json({

            success: false,

            message: "Not authorized"

        });

    }

};

module.exports = {
    protect
};