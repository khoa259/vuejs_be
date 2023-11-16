import { Router } from "express";
import {
  createPost,
  getById,
  getPostByUserId,
  getPosts,
} from "../controller/posts.js";
import { upload } from "../middleware/uploadFile.js";

export const routerPosts = Router();

routerPosts.post("/creatPosts", upload.single("images"), createPost);
routerPosts.get("/getPosts", getPosts);
routerPosts.get("/getById/:id", getById);
routerPosts.get("/getPostById/:userId", getPostByUserId);
