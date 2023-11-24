import { Router } from "express";
import { createCate, getCate, getById } from "../controller/category.js";
import { upload } from "../middleware/uploadFile.js";

export const routerCate = Router();

routerCate.post("/creatCategory", upload.single("images"), createCate);
routerCate.get("/getAllCategory", getCate);
routerCate.get("/getCategory/:id", getById);
