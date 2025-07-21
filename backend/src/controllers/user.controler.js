import {User} from '../models/user.model.js';
import {generateToken} from '../utils/generateToken.js';
import bcrypt from 'bcryptjs';
import {cloudinary} from '../utils/cloudinary.util.js';

const signup = async (req,res) => {
    const {username,password,email} = req.body;

    try {
        if(!username || !password || !email) return res.status(400).json({
            message: "invalid credentials"
        })

        const isAlreadyExist = await User.findOne({email})
        if(isAlreadyExist) return res.status(409).json({ // Changed from 404 to 409 (Conflict)
                message:"user already exists with this email"
            })

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password : hashedPassword,
        })
        await user.save()

        if (user) {
            generateToken(user._id,res);
        }else{
            return res.status(500).json({
                message: "Error creating user"
            })
        }

        return res.status(201)
            .json({
                message: "User created successfully",
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                }
            })
    } catch (error) {
        console.error("Error in signup:", error.message);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

const login = async (req,res) => {
    const {password,email} = req.body

    try {
        if (!password || !email) {
            return res.status(400).json({
                message: "invalid credentials"
            })
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters long"
            })
        }

        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({
                message:"user not found"
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password); // Use async version
        if(!isPasswordCorrect){
            return res.status(401).json({
                message:"Invalid password"
            })
        }

        generateToken(user._id,res);
        
        return res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            }
        })
        
    } catch (error) {
        console.error("Error in login:", error.message);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

const logout = (req,res) => {
    try {
        res.cookie('jwt', '', {
            maxAge: 0,
            httpOnly: true,
            sameSite: 'Strict',
            secure: process.env.NODE_ENV !== 'development',
        });
        return res.status(200).json({
            message: "Logout successful"
        });
    } catch (error) {
        console.error("Error in logout:", error.message);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

const updateProfile = async (req, res) => {
    try {
        const { profilePicture } = req.body;
        const userId = req.user._id;

        console.log('📝 Update profile request:', {
            userId: userId,
            hasProfilePicture: !!profilePicture,
            base64Length: profilePicture ? profilePicture.length : 0
        });

        if (!profilePicture) {
            return res.status(400).json({
                message: "Profile picture is required to update the profile"
            });
        }

        // Validate base64 format
        if (!profilePicture.startsWith('data:image/')) {
            return res.status(400).json({
                message: "Invalid image format. Please upload a valid image file."
            });
        }

        // Check base64 size (rough estimate: base64 is ~33% larger than binary)
        const estimatedSizeKB = (profilePicture.length * 3) / 4 / 1024;
        if (estimatedSizeKB > 2048) { // 2MB limit
            return res.status(400).json({
                message: "Image is too large. Please compress the image and try again."
            });
        }

        console.log('☁️  Uploading to Cloudinary...');
        
        // Upload to Cloudinary with additional options
        const uploadResponse = await cloudinary.uploader.upload(profilePicture, {
            folder: "profile_pictures", // Optional: organize uploads
            transformation: [
                { width: 400, height: 400, crop: "fill" }, // Ensure consistent size
                { quality: "auto:good" } // Auto quality optimization
            ]
        });

        console.log('✅ Cloudinary upload successful:', {
            public_id: uploadResponse.public_id,
            secure_url: uploadResponse.secure_url
        });

        // Update user in database
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePicture: uploadResponse.secure_url },
            { new: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        console.log('🎉 Profile updated successfully for user:', userId);

        return res.status(200).json({
            message: "Profile updated successfully",
            user: updatedUser
        });

    } catch (error) {
        console.error("❌ Error in updateProfile:", error);
        
        // Handle Cloudinary specific errors
        if (error.name === 'Error' && error.message.includes('cloudinary')) {
            return res.status(400).json({
                message: "Image upload failed. Please try with a different image.",
                error: "Cloudinary upload error"
            });
        }

        // Handle MongoDB errors
        if (error.name === 'CastError') {
            return res.status(400).json({
                message: "Invalid user ID",
                error: "Database error"
            });
        }

        return res.status(500).json({
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? error.message : "Server error"
        });
    }
};

const checkUser = (req, res) => {
    try {
        return res.status(200).json(req.user);
    } catch (error) {
        console.error("Error in checkUser:", error.message);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

export {signup , login, logout , updateProfile , checkUser};