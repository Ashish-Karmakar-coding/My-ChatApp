import {User} from '../models/user.model.js';
import bcrypt from 'bcryptjs';

const signup = (req,res) => {
    // Logic for user signup

    const {username,password , email} = req.body;

    try {
        if(!username || ! password || ! email) throw new Error("Please provide all the required fields");
        
        const isAreadyExist = User.findone({email})
        if(isAreadyExist) throw new Error("User already exists")

        hashedPassword = bcrypt.hashSync(password, 10);

        const user = new User({
            username,
            email,
            password : hashedPassword
        })

        user.save()
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
const login = (req,res) => {
    // Logic for user signup
    res.send("!    You are in the login page   !");
}
const logout = (req,res) => {
    // Logic for user signup
    res.send("!    You are in the logout page   !");
}

export {signup , login, logout};