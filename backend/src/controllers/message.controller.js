import { Message } from "../models/message.model";
import {User} from "..models/user.model.js";

const getUserForSideBar = async(req, res) =>{
    const myId = req.user._id
    try {
        const users = await User.find({_id: {$ne: myId}}).select("-password");

        if(!users){
            return res.status(404).json({message: "No users found"});
        }

        return res.status(200).json({
            message: "Users fetched successfully",
            users: users })

    } catch (error) {
        throw new Error("Error in getting user for sidebar")
    }
}
const getMessages = async (req, res) => {
    
    try {
        const {id : senderId} = req.params;
        const myId = req.user._id;

        if(!senderId || !myId){
            return res.status(400).json({message: "Sender ID or User ID is missing"});
        }

        const Allmessages = await Message.find({
            $or:[
                {senderId: myId, reciverId: senderId},
                {senderId: senderId, reciverId: myId}
            ]
        })

        if(!Allmessages){
            return res.status(404).json({message: "No messages found"});
        }

        return res.status(200).json({
            messages:Allmessages
        });

    } catch (error) {
        throw new error("Error in getting messages");
    }
}

export {getUserForSideBar , getMessages}