import multer from "multer";
import dotenv from "dotenv";
import fs from "fs-extra";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinaryCofig.js";

dotenv.config();
//upload file local
// const storage = multer.diskStorage({
//   destination: (res, file, cb) => {
//     cb(null, "./public");
//   },
//   filename: (res, file, cb) => {
//     const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9);
//     cb(null, `${uniqueSuffix}.${file.originalname}`);
//   },
// });

export const getUrlImg = (file) => {
  console.log("file=>", file);
  return `${process.env.URL_API_UPLOAD}/${file.filename}`;
};

export const removeImage = async (req, res) => {
  const { image_rm } = req.body;
  const replaceUrl = image_rm.replace(process.env.URL_API_UPLOAD, "");
  const filePath = `./public/${replaceUrl}`;
  console.log("filepath", filePath);
  if (fs.existsSync(filePath)) {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Xóa file không thành công");
      }
      console.log("thành công");
      return res.send("Xóa file thành công");
    });
  } else {
    return res.status(404).send("không có ảnh này");
  }
};

//upload file cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "vue",
    allowedFormats: ["jpg", "jpeg", "png"],
  },
});
export const upload = multer({ storage: storage });
