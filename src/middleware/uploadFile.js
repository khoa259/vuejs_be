import multer from "multer";
import dotenv from "dotenv";
dotenv.config();

const storage = multer.diskStorage({
  destination: (res, file, cb) => {
    cb(null, "./public");
  },
  filename: (res, file, cb) => {
    const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}.${file.originalname}`);
  },
});
export const upload = multer({ storage: storage });
export const getUrlImg = (file) => {
  console.log(process.env.URL_API_UPLOAD);
  console.log("file=>", file);
  return `${process.env.URL_API_UPLOAD}/${file.filename}`;
};

export const removeImage = async (req, res) => {
  const { image } = req.body;
  const replaceUrl = image.replace(process.env.URL_API_UPLOAD, "");
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
