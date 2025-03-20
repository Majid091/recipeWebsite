const jwt = require('jsonwebtoken');
const User = require('../Models/user.model'); // Ensure the path is correct

const authMiddleware = async (req, res, next) => {
    try {
        // Get token from headers
        const token = req.header("Authorization")?.split(" ")[1]; // Extract token from "Bearer <token>"

        if (!token) {
            return res.status(401).json({ 
                message: "No token, authorization denied", 
                error: true, 
                success: false 
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find user from decoded token
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({ 
                message: "User not found", 
                error: true, 
                success: false 
            });
        }

        req.user = user; // Attach user to req
        next(); // Proceed to controller

    } catch (error) {
        return res.status(401).json({
            message: "Invalid token",
            error: true,
            success: false
        });
    }
};

module.exports = authMiddleware;
