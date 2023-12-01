import multer from "multer";
const baseUrl = "http://localhost:5000/api/public";
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
  return `${baseUrl}/${file.filename}`;
};
