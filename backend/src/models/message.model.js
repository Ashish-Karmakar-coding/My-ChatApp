import mongoose from 'mongoose';// Adjust the import path as necessary

const messageSchema = new mongoose.Schema({
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
