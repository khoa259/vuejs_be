import User from "../models/user.js";
import Posts from "../models/posts.js";
import Category from "../models/category.js";

export const createPost = async (req, res) => {
  try {
    const createposts = await new Posts(req.body).save();
    await Category.findOneAndUpdate(createposts.categoryId, {
      $addToSet: {
        postId: createposts._id,
      },
    });
    res.status(200).json({ message: "Thêm bài viết thành công", createposts });
  } catch (error) {
    res.status(500).json({ message: " không thành công" });
  }
};

export const getPosts = async (req, res, next) => {
  const limitItem = 12;
  const page = parseInt(req.query.page) || 1;
  const skipPage = (page - 1) * limitItem;

  try {
    const getAll = await Posts.find({})
      .populate("categoryId", "nameCate")
      .skip(skipPage)
      .limit(limitItem)
      .exec();
    res.status(200).json({
      message: "Lấy bài viết thành công",
      response: { limitItem, page, getAll },
    });
  } catch (error) {
    res.status(500).json({ message: "Lấy bài viết không thành công" });
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

export const getById = async (req, res) => {
  try {
    const _id = req.params.id;
    const get = await Posts.findById({ _id })
      .populate("categoryId", "nameCate")
      .exec();
    res.status(200).json({ get });
  } catch (error) {
    res.status(500).json({ message: "Không tìm thấy" });
  }
};
