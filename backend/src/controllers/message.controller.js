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
      deletedFor: { $ne: myId }
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

const deleteMessage = async (req, res) => {
  const { id: messageId } = req.params;
  const { type } = req.body;
  const myId = req.user._id;

  console.log(`[DELETE_MSG] Attempting to delete message: ${messageId} | Type: ${type} | User: ${myId}`);

  try {
    const message = await Message.findById(messageId);
    if (!message) {
      console.error(`[DELETE_MSG] Message not found for ID: ${messageId}`);
      return res.status(404).json({ message: "Message not found" });
    }

    if (type === "everyone") {
      if (message.senderId.toString() !== myId.toString()) {
        console.warn(`[DELETE_MSG] Forbidden: User ${myId} tried to delete message sent by ${message.senderId}`);
        return res
          .status(403)
          .json({ message: "You can only delete your own messages for everyone" });
      }

      message.isDeletedForEveryone = true;
      message.text = "This message was deleted";
      message.photo = null;
      await message.save();
      console.log(`[DELETE_MSG] Deleted for everyone: ${messageId}`);

      const receiverSocketId = getReceiverSocketId(message.receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("messageDeleted", {
          messageId: message._id,
          type: "everyone",
        });
      }
    } else {
      // type === "me"
      if (!message.deletedFor.includes(myId)) {
        message.deletedFor.push(myId);
        await message.save();
        console.log(`[DELETE_MSG] Deleted for user ${myId}: ${messageId}`);
      }
    }

    res.status(200).json({ message: "Message deleted successfully", messageId });
  } catch (error) {
    console.error("[DELETE_MSG] Internal error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { getUserForSideBar, getMessages, sendMessage, deleteMessage };
