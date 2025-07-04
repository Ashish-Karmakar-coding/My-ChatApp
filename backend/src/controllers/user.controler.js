import {User} from '../models/user.model.js';
import {generateToken} from '../utils/generateToken.js';
import bcrypt from 'bcryptjs';
import {cloudinary} from '../utils/cloudinary.util.js';

const signup = async (req,res) => {
    // Logic for user signup

    const {username,password,email} = req.body;

    try {
        if(!username || !password || !email) return res.status(400).json({
            message: "invalid credentials"
        })

        if (password.length < 6) return res.status(400).json({
            message: "Password must be at least 6 characters long"
        })

        if (!email.includes('@gmail.com')) {
        return res.status(400).json({
            message: "The email is Invalid"
        });
}
        const isAreadyExist = await User.findOne({email})
        if(isAreadyExist) return res.status(404).json({
                message:"user aleardy exists with this email"
            })

        hashedPassword = bcrypt.hashSync(password, 10);

        const user = new User({
            username,
            email,
            password : hashedPassword,
        })

        if (user) {
            generateToken(user._id,res); //  this function generates a token
        }else{
            return res.status(500).json({
                message: "Error creating user"
            })
        }

        await user.save()
            .res.status(201)
            .json({
                message: "User created successfully",
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                }
            })
    } catch (error) {
        throw new Error("Error in signup : ", error.message);
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
        // Check if user exists
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({
                message:"user not found"
            })
        }

        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        if(!isPasswordCorrect){
            return res.status(401).json({
                message:"Invalid password"
            })
        }

        generateToken(user._id,res); //  this function generates a token
        
        return res.status(200).json({
            message: "Login successful",
            username:user.username,
            email: user.email,
        })
        
    } catch (error) {
        throw new Error("Error in login : ", error.message)
    }

}
const logout = (req,res) => {
    try {
        res.cookie('jwt', '', { // Clear the cookie
            maxAge: 0, // Set cookie to expire immediately
            httpOnly: true,
            sameSite: 'Strict',
            secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
        });
        return res.status(200).json({
            message: "Logout successful"
        });
    } catch (error) {
        throw new Error("Error in logout : ", error.message);
    }
}
const updateProfile = async (req, res) => {

    const {profilePicture} = req.body;
    const userId = req.user._id

    if(!profilePicture) {
        return res.status(400).json({
            message: "Profile picture is required to update the profile"
        });
    }

    try {
        
        const uploadResponse = await cloudinary.uploader.upload(profilePicture)
        if (!uploadResponse || !uploadResponse.secure_url) {
            return res.status(500).json({
                message: "Error uploading profile picture"
            });
        }

        const updateUser = User.findByIdAndUpdate(userId,{profilePicture: uploadResponse.secure_url},{new:true}); 

        return res.status(200).json({updateUser,
            message: "Profile updated successfully",
        })

    } catch (error) {
        throw new Error("Error in updateProfile : ", error.message);
    }

}
const checkUser = (req, res) => {
    try {
        const user = req.user; // Assuming user is set by tokenCheck middleware
        if (!user) {
            return res.status(401).json({
                message: "User not authenticated"
            });
        }
        return res.status(200).json({
            message: "User is authenticated",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                profilePicture: user.profilePicture
            }
        });
    } catch (error) {
        throw new Error("Error in checkUser : ", error.message);
    }
}

export {signup , login, logout , updateProfile , checkUser};