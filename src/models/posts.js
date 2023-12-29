import mongoose, { ObjectId } from "mongoose";

const postSchema = new mongoose.Schema(
  [
    {
      userId: {
        type: ObjectId,
        ref: "User",
      },
      title: {
        type: String,
        require: true,
      },
      description: {
        type: String,
        require: true,
      },
      imagePosts: {
        type: String,
        require: true,
      },

      categoryId: {
        type: ObjectId,
        ref: "Category",
      },
      review: {
        type: Number,
        default: 0,
      },
      rating: {
        type: Number,
        default: 0,
      },
      statusSave: {
        type: Boolean,
        default: false,
      },
      pricemin: {
        type: String,
        require: true,
      },
      pricemax: {
        type: String,
        require: true,
      },
      timeopen: {
        type: String,
        require: true,
      },
      timeclose: {
        type: String,
        require: true,
      },
      address: {
        type: String,
        require: true,
      },
      province: {
        type: String,
        require: true,
      },
      district: {
        type: String,
        require: true,
      },
      ward: {
        type: String,
        require: true,
      },
      fullAdress: {
        type: String,
      },
    },
  ],
  { timestamps: true }
);

export default mongoose.model("Posts", postSchema);
