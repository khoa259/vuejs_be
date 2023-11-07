import mongoose from "mongoose";

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
    image: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
