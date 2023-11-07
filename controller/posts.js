import User from "../models/user.js";
import Posts from "../models/posts.js";

export const createPost = async (req, res) => {
  try {
    const createposts = await new Posts(req.body).save();
    res.status(200).json({ createposts });
  } catch (error) {
    res.status(500).json({ message: "thêm bài viết không thành công" });
  }
};

export const getPostByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const get = await Posts.find({ userId }).exec();
    res.status(200).json({ get });
  } catch (error) {
    res.status(500).json({ message: "Không tìm thấy" });
  }
};
