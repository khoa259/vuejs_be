import mongoose, { ObjectId } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verifiedCationToken: {
      type: String,
    },
    role: {
      type: Number,
      default: 0,
    },
    image: [
      {
        type: ObjectId,
        ref: "Posts",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
