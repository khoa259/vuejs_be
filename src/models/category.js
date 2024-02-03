import mongoose, { ObjectId } from "mongoose";

const categorieSchema = new mongoose.Schema(
  {
    nameCate: {
      type: String,
      require: true,
    },
    postId: [
      {
        type: ObjectId,
        ref: "Posts",
      },
    ],
    imageCate: {
      url: {
        type: String,
      },
      publicid: {
        type: String,
      },
    },
  },
  { timestamps: true }
);
export default mongoose.model("Category", categorieSchema);
