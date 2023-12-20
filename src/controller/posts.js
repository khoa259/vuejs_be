import User from "../models/user.js";
import Posts from "../models/posts.js";
import Category from "../models/category.js";
import { getUrlImg } from "../middleware/uploadFile.js";

export const createPost = async (req, res) => {
  const file = req.file;
  const {
    title,
    categoryId,
    description,
    pricemin,
    pricemax,
    timeopen,
    timeclose,
    address,
    province,
    district,
    ward,
  } = req.body;
  try {
    const createposts = await new Posts({
      title,
      categoryId,
      description,
      pricemin,
      pricemax,
      timeopen,
      timeclose,
      location: {
        address,
        province,
        district,
        ward,
      },
      imagePosts: getUrlImg(file),
    }).save();
    await Category.findOneAndUpdate(createposts.categoryId, {
      $addToSet: {
        postId: createposts._id,
      },
    });
    res
      .status(200)
      .json({ message: "Thêm bài viết thành công", response: createposts });
  } catch (error) {
    res.status(500).json({ message: " không thành công" });
    console.log(error);
  }
};

export const getPosts = async (req, res, next) => {
  const limitItem = 12;
  const page = parseInt(req.query.page) || 1;
  const skipPage = (page - 1) * limitItem;

  try {
    const getAll = await Posts.find({})
      .populate("categoryId", "nameCate")
      .sort({ createdAt: -1 })
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
    await Posts.findOneAndUpdate(
      { _id },
      {
        $inc: {
          review: 1,
        },
      },
      { new: true }
    );
    res.status(200).json({ response: [get] });
  } catch (error) {
    res.status(500).json({ message: "Không tìm thấy" });
  }
};

export const getPostsRelated = async (req, res) => {
  try {
    const _id = req.params.id;
    const get = await Posts.findById({ _id });
    const getPostsRelated = await Posts.find({
      _id: { $ne: get._id },
      categoryId: get.categoryId,
    })
      .populate("categoryId", "nameCate")
      .limit(6)
      .exec();
    res.status(200).json({ related: getPostsRelated });
  } catch (error) {
    res.status(500).json({ message: "Không tìm thấy" });
  }
};

export const handleSearchPosts = async (req, res) => {
  try {
    const search = req.query.search.trim();
    if (search === "") {
      return res.status(200).json({ response: [] });
    }
    console.log(search);
    const getPosts = await Posts.find({
      $or: [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
      ],
    })
      .populate("categoryId", "nameCate")
      .exec();
    res.status(200).json({ response: getPosts });
  } catch (error) {
    res.status(500).json({ message: "Không tìm thấy" });
    console.log(error);
  }
};

export const getPostsByCategories = async (req, res) => {
  try {
    const categoryId = req.query.category;
    const getPosts = await Posts.find({ categoryId })
      .populate("categoryId")
      .exec();
    res.status(200).json({ response: getPosts });
  } catch (error) {
    console.log(error);
  }
};

export const updatePosts = async (req, res) => {
  try {
    const _id = req.params.id;
    const file = req.file;
    const update = await Posts.findByIdAndUpdate(
      { _id },
      (req.body, { imagePosts: getUrlImg(file) })
    ).exec();
    res.status(200).json({ message: "Cập nhật thành công", response: update });
  } catch (error) {
    res.status(500).json({ message: "Cập nhật thất bại" });
  }
};

export const deletPosts = async (req, res) => {
  try {
    const _id = req.params.id;
    const removePosts = await Posts.findByIdAndDelete({ _id }).exec();
    res.status(200).json({
      message: "Xóa bài viết thành công",
      response: removePosts,
    });
  } catch (error) {
    res.status(500).json({ message: "Xóa bài viết thất bại" });
  }
};
