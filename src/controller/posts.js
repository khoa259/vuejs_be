import User from "../models/user.js";
import Posts from "../models/posts.js";
import Category from "../models/category.js";
import { getUrlImg, removeImage } from "../middleware/uploadFile.js";

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
    fullAdress,
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
      address,
      province,
      district,
      ward,
      fullAdress,
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

export const createRandomPosts = async (req, res) => {
  const limit = 30;
  try {
    const checkLimit = await Posts.find({}).exec();
    if (checkLimit.length >= limit) {
      return res.status(400).send({
        message: `Cần dưới ${limit} bài viết để có thể thực hiện chức năng này`,
      });
    }
    for (let i = 1; i <= 5; i++) {
      await Posts.insertMany([
        {
          title: `Tieu de ${i}`,
          categoryId: `658e3eb614275ac44da7eff6`,
          description: `mo ta bai viet ${i}`,
          pricemin: `100${i}`,
          pricemax: `200${i}`,
          timeopen: `09:0${i}`,
          timeclose: `21:0${i}`,
          address: `số ${i}`,
          province: "01",
          district: "009",
          ward: "00361",
          fullAdress: `số ${i}, phường Hạ Đình, quận Thanh Xuân, Hà Nội`,
          imagePosts: ` https://www.datanami.com/wp-content/uploads/2021/10/tonic_ai_real_fake_data.png`,
        },
      ]);
    }
    return res.status(200).send("Thành công");
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
    const getAll = await Posts.find({})
      .populate("categoryId", "nameCate")
      .sort({ createdAt: -1 })
      .skip(skipPage)
      .limit(limitItem)
      .exec();
    res.status(200).json({
      message: "Lấy bài viết thành công",
      response: { getLength, limitItem, page, getAll },
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
      fullAdress,
    } = req.body;
    const update = await Posts.findByIdAndUpdate(
      { _id },
      {
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
        fullAdress,
        imagePosts: getUrlImg(file),
      }
    ).exec();
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
