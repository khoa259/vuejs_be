import Category from "../models/category.js";

export const createCate = async (req, res) => {
  try {
    const create = await new Category(req.body).save();
    res.status(200).json({ message: "Thêm thành công", create });
  } catch (error) {
    req.status(500).json({ message: "Lỗi rồi" });
  }
};

export const getCate = async (req, res) => {
  try {
    const getAll = await Category.find().exec();
    res.status(200).json({ message: "Thành công ", getAll });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Không tìm thấy danh mục nào" });
  }
};

export const getById = async (req, res) => {
  const _id = req.params.id;
  try {
    const getCateById = await Category.find({ _id }).populate("postId").exec();
    res.status(200).json({ message: "Thành công ", getCateById });
  } catch (error) {
    res.status(500).json({ message: "Không tìm thấy danh mục nào" });
  }
};
