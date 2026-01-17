import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";
import { cloudinary } from "../utils/cloudinary.util.js";
import { getReceiverSocketId, io } from "../utils/socket.js";

const getUserForSideBar = async (req, res) => {
  const myId = req.user._id;
  try {
    const users = await User.find({ _id: { $ne: myId } }).select("-password");

    if (!users) {
      return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error in getUserForSideBar:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const getMessages = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: receiverId },
        { senderId: receiverId, receiverId: myId },
      ],
    });

    if (!messages) {
      return res.status(404).json({ message: "No messages found" });
    }

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error in getMessages:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const sendMessage = async (req, res) => {
  const { id: receiverId } = req.params;
  const { text, photo } = req.body;
  const senderId = req.user._id;

  try {
    if (!receiverId || !senderId) {
      return res
        .status(400)
        .json({ message: "Receiver ID or Sender ID is missing" });
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
      receiverId,
      text,
      photo: imgURL,
    });

    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(200).json(newMessage);
  } catch (error) {
    console.error("Error in sendMessage:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { getUserForSideBar, getMessages, sendMessage };
