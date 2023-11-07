import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      require: "User",
    },
    tittle: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    review: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
    },
    statusSave: {
      type: Boolean,
      default: false,
    },
    timeopen: {
      type: String,
    },
    timeclose: {
      type: String,
    },
    location: [
      {
        address: {
          type: String,
        },
        province: {
          type: String,
        },
        district: {
          type: String,
        },
        ward: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Posts", postSchema);
