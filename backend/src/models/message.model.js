import mongoose from 'mongoose';
import {User} from 'user.model.js'; // Adjust the import path as necessary

messageSchema = new mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reciverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: String,
    photo : String,

},{timestamps: true})

export const Message = mongoose.model('Message', messageSchema);
