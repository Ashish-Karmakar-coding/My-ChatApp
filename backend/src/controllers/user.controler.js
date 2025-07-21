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

    // Validate required fields
    if (!profilePicture) {
      return res.status(400).json({
        success: false,
        message: "Profile picture is required"
      });
    }

    // Validate base64 format
    const base64Pattern = /^data:image\/(jpeg|jpg|png|webp);base64,/;
    if (!base64Pattern.test(profilePicture)) {
      return res.status(400).json({
        success: false,
        message: "Invalid image format"
      });
    }

    // Check base64 size (approximate file size)
    const sizeInBytes = (profilePicture.length * 3) / 4;
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (sizeInBytes > maxSize) {
      return res.status(400).json({
        success: false,
        message: "File size too large"
      });
    }

    // Upload to Cloudinary with security options
    const uploadResponse = await cloudinary.uploader.upload(profilePicture, {
      resource_type: "image",
      allowed_formats: ["jpg", "png", "webp"],
      max_file_size: 5000000, // 5MB
      quality: "auto:good",
      fetch_format: "auto"
    });

    // Update user profile
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePicture: uploadResponse.secure_url },
      { new: true }
    ).select('-password -__v');

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      user: updatedUser
    });

  } catch (error) {
    console.error("Error in updateProfile:", error.message);
    
    // Don't expose internal errors
    if (error.http_code === 400) {
      return res.status(400).json({
        success: false,
        message: "Invalid image data"
      });
    }
    
    return res.status(500).json({
      success: false,
      message: "Upload failed. Please try again."
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