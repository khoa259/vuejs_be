import User from "../models/user.js";
import Posts from "../models/posts.js";
import Category from "../models/category.js";
import { getUrlImg } from "../middleware/uploadFile.js";

export const createPost = async (req, res) => {
  try {
    const createposts = await new Posts(req.body).save();
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

export const createRandomPosts = async (req, res) => {
  const limit = 30;
  try {
    const countCategories = await Category.countDocuments().exec();
    const randomId = Math.floor(Math.random() * countCategories);
    console.log(randomId);
    const getIdRandom = await Category.findOne({}, { _id: 1 })
      .skip(randomId)
      .limit(1);

    if (!getIdRandom || getIdRandom === 0) {
      console.log(getIdRandom);
      return res
        .status(500)
        .json({ message: "Bạn cần thêm danh mục để thực hiện tiếp" });
    }
    const checkLimit = await Posts.find({}).exec();
    if (checkLimit.length >= limit) {
      return res.status(400).json({
        message: `Giới hạn tạo ngẫu nhiên tối đa ${limit} bài viết`,
      });
    }
    for (let i = 1; i <= 5; i++) {
      await Posts.insertMany([
        {
          title: `Tiêu đề bài viết ${Math.floor(Math.random() * 50)}`,
          categoryId: getIdRandom?._id,
          description: `Mô tả bài viết , stt mô tả ${i}`,
          review: Math.floor(Math.random() * 2000),
          pricemin: Math.floor(Math.random() * 100000) + 30000,
          pricemax: Math.floor(Math.random() * 200000) + 100000,
          timeopen: `09:0${i}`,
          timeclose: `21:0${i}`,
          address: `số ${i}`,
          province: "01",
          district: "009",
          ward: "00361",
          fullAdress: `số ${i}, phường Hạ Đình, quận Thanh Xuân, Hà Nội`,
          imagePosts: { url: "https://random.imagecdn.app/500/550" },
        },
      ]);
    }
    return res.status(200).json({ message: "Thành công" });
  } catch (error) {
    res.status(500).json({ message: " không thành công" });
    console.log(error);
  }
};

export const getPosts = async (req, res, next) => {
  const limitItem = 12;
  const page = parseInt(req.query.page) || 1;
  const skipPage = (page - 1) * limitItem;

  // console.log(getLength);
  try {
    const getLength = await Posts.countDocuments({});
    const getPostsTopView = await Posts.find()
      .populate("categoryId", "nameCate")
      .sort({ review: -1 })
      .limit(8)
      .exec();
    const getAll = await Posts.find()
      .populate("categoryId", "nameCate")
      .sort({ createdAt: -1 })
      .skip(skipPage)
      .limit(limitItem)
      .exec();
    res.status(200).json({
      message: "Lấy bài viết thành công",
      response: {
        getLength,
        limitItem,
        page,
        getAll,
        topView: getPostsTopView,
      },
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
    res.status(200).json({ response: get });
  } catch (error) {
    res.status(500).json({ message: "Không tìm thấy" });
  }
};

export const readById = async (req, res) => {
  try {
    const _id = req.params.id;
    const get = await Posts.findById({ _id }).exec();
    res.status(200).json({ response: get });
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
      .limit(8)
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
      return res
        .status(200)
        .json({ message: "Không có bài viết nào liên quan" });
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
        {
          district: {
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
    const getNameCate = await Category.findById(
      { _id: categoryId },
      { nameCate: 1 }
    ).exec();
    const getPosts = await Posts.find({ categoryId })
      .populate("categoryId", "nameCate")
      .exec();
    res.status(200).json({ response: getPosts, getNameCate });
  } catch (error) {
    console.log(error);
  }
};

export const updatePosts = async (req, res) => {
  try {
    const _id = req.params.id;
    const update = await Posts.findByIdAndUpdate({ _id }, req.body).exec();
    res.status(200).json({ message: "Cập nhật thành công", response: update });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Cập nhật thất bại" });
  }
};

export const deletePosts = async (req, res) => {
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
