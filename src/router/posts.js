import { Router } from "express";
import {
  createPost,
  getById,
  getPostByUserId,
  getPosts,
  getPostsByCategories,
  getPostsRelated,
  handleSearchPosts,
} from "../controller/posts.js";
import { upload } from "../middleware/uploadFile.js";

export const routerPosts = Router();

routerPosts.post("/creatPosts", upload.single("imagePosts"), createPost);
routerPosts.get("/getPosts", getPosts);
routerPosts.get("/getById/:id", getById);
routerPosts.get("/posts_related/:id", getPostsRelated);
routerPosts.get("/getPostById/:userId", getPostByUserId);
routerPosts.post("/search", handleSearchPosts);
routerPosts.post("/getPostByCategories", getPostsByCategories);