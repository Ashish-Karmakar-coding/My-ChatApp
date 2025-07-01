import {User} from '../models/user.model.js';
import {generateVerificationToken} from '../utils/generateVerificationToken.js';
import bcrypt from 'bcryptjs';

const signup = async (req,res) => {
    // Logic for user signup

    const {username,password , email} = req.body;

    try {
        if(!username || ! password || ! email) throw new Error("Please provide all the required fields");
        
        const isAreadyExist = await User.findOne({email})
        if(isAreadyExist) throw new Error("User already exists")

        hashedPassword = bcrypt.hashSync(password, 10);
        verificationToken = generateVerificationToken(); //  this function generates a token

        const user = new User({
            username,
            email,
            password : hashedPassword,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24*60*60*1000 // Token valid for 24 hours
        })

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

    const {username,password,email} = req.body
    try {
        
        
    } catch (error) {
        throw new Error("Error in login : ", error.message)
    }

}
const logout = (req,res) => {
    // Logic for user signup
    res.send("!    You are in the logout page   !");
}

export {signup , login, logout};