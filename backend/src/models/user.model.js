import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
        type:String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    profilePicture: {
      type: String,
    },
    verificationToken: String,
    verificationTokenExpiresAt: Date

  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);