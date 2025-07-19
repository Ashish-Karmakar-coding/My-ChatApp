import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";
import { cloudinary } from "../utils/cloudinary.util.js";
import {getReceiverSocketId,io} from "../utils/Soket.js";

const getUserForSideBar = async (req, res) => {
  const myId = req.user._id;
  try {
    const users = await User.find({ _id: { $ne: myId } }).select("-password");

    if (!users) {
      return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json(users);
  } catch (error) {
    throw new Error("Error in getting user for sidebar");
  }
};
const getMessages = async (req, res) => {
  try {
    const { id: senderId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, reciverId: senderId },
        { senderId: senderId, reciverId: myId },
      ],
    });

    if (!messages) {
      return res.status(404).json({ message: "No messages found" });
    }

    res.status(200).json(messages);
  } catch (error) {
    throw new error("Error in getting messages");
  }
};
const sendMessage = async (req, res) => {
  const { id: reciverId } = req.params;
  const { text, photo } = req.body;
  const senderId = req.user._id;

  try {
    if (!reciverId || !senderId) {
      return res
        .status(400)
        .json({ message: "Reciver ID or Sender ID is missing" });
    }

    let imgURL;

    if (photo) {
      const uploadResponse = await cloudinary.uploader.upload(photo);

      if (!uploadResponse) {
        return res.status(500).json({ message: "Error uploading photo" });
      }

      imgURL = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      reciverId,
      text,
      photo: imgURL,
    });

    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(reciverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(200).json(newMessage);
  } catch (error) {
    throw new Error("Error in sending message");
  }
};

export { getUserForSideBar, getMessages, sendMessage };
