import express, { Router } from "express";
import { URL } from "url";
import path from "path";
import { createCate, getCate, getById } from "../controller/category.js";
import { upload } from "../middleware/uploadFile.js";

export const routerCate = Router();
// const __dirname = new URL("../middleware/uploadFile.js", import.meta.url());

routerCate.post("/creatCategory", upload.single("images"), createCate);
routerCate.get("/getAllCategory", getCate);
routerCate.get("/getCategory/:id", getById);
// express.static(path.join(__dirname, "../middleware/uploadFile.js")
