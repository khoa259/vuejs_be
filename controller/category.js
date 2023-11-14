import { getUrlImg } from "../middleware/uploadFile.js";
import Category from "../models/category.js";

export const createCate = async (req, res) => {
  const file = req.file;
  const { nameCate } = req.body;
  if (!file) {
    res.status(500).json({ message: "Ảnh không tồn tại" });
  }
  try {
    const checkDuplicate = await Category.findOne({ nameCate }).exec();
    if (checkDuplicate) {
      return res
        .status(400)
        .json({ message: `Danh mục ${nameCate} đã tồn tại` });
    }
    const create = await new Category({
      imageCate: getUrlImg(file),
      nameCate: req.body.nameCate,
    }).save();

    res.status(200).json({ message: "Thêm thành công", create });
  } catch (error) {
    res.status(500).json({ message: "Lỗi rồi =======>", error });
  }
};

export const getCate = async (req, res) => {
  const mySort = { createdAt: -1 };
  try {
    const getAll = await Category.find().sort(mySort).exec();
    res.status(200).json({ message: "Thành công ", response: getAll });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Không tìm thấy danh mục nào" });
  }
};

export const getById = async (req, res) => {
  const _id = req.params.id;
  try {
    const getCateById = await Category.find({ _id }).populate("postId").exec();
    res.status(200).json({ message: "Thành công ", response: getCateById });
  } catch (error) {
    res.status(500).json({ message: "Không tìm thấy danh mục nào" });
  }
};
