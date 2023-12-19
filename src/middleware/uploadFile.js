import multer from "multer";
import dotenv from "dotenv";
dotenv.config();

const storage = multer.diskStorage({
  destination: (res, file, cb) => {
    cb(null, "../../public");
  },
  filename: (res, file, cb) => {
    const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}.${file.originalname}`);
  },
});
export const upload = multer({ storage: storage });

export const getUrlImg = (file) => {
  console.log("file=>", file);
  return `${process.env.URL_API_UPLOAD}/${file.filename}`;
};
