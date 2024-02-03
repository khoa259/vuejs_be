import { Router } from "express";
import {
  createCate,
  getCate,
  getById,
  updateCate,
} from "../controller/category.js";
import { removeImage, upload } from "../middleware/uploadFile.js";
import { uploadImages } from "../controller/uploadImage.js";

export const routerCate = Router();

routerCate.post("/creatCategory", createCate);
routerCate.post("/deleteImage", removeImage);
routerCate.get("/getAllCategory", getCate);
routerCate.get("/getCategory/:id", getById);
routerCate.post("/upload", upload.single("images"), uploadImages);
routerCate.put("/updateCategory/:id", updateCate);
