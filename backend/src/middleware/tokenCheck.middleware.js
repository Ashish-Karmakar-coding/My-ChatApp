import jwt from 'jsonwebtoken';
import {User} from '../models/user.model.js';

const tokenCheck = async (req,res,next)=>{
    // Middleware to check if the user is authenticated
    const token = req.cookies.jwt // Get the token from cookies
    if (!token){
        return res.status(401).json({
            message: "Unauthorized, No token provided"
        });
    }

    // the token contain information about the usr such as username 

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) { // If the token is invalid or expired
        return res.status(401).json({
            message: "Unauthorized, Invalid token"
        });
    }

    try{
        const user = await User.findById(decoded.id).select("-password"); // Find the user by ID from the decoded token
        if (!user) {  
            return res.status(404).json({
                message: "User not found"
            });
        }
        req.user = user; // Attach the user field to the request object from the user in the database
        next(); // Call the next middleware or route handler
    }catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }


}

export {tokenCheck}