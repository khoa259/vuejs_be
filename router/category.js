import { Router } from "express";
import { createCate, getCate, getById } from "../controller/category.js";
export const routerCate = Router();

routerCate.post("/creatCategory", createCate);
routerCate.get("/getAllCategory", getCate);
routerCate.get("/getCategory/:id", getById);
