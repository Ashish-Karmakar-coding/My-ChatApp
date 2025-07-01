import {User} from '../models/user.model.js';
import {generateToken} from '../utils/generateToken.js';
import bcrypt from 'bcryptjs';

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
        })
        
    } catch (error) {
        throw new Error("Error in login : ", error.message)
    }

}
const logout = (req,res) => {
    // Logic for user signup
    res.send("!    You are in the logout page   !");
}

export {signup , login, logout};