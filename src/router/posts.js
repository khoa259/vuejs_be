import { Router } from "express";
import {
  createPost,
  deletePosts,
  getById,
  getPostByUserId,
  getPosts,
  getPostsByCategories,
  getPostsRelated,
  handleSearchPosts,
  readById,
  updatePosts,
} from "../controller/posts.js";
import { removeImage, upload } from "../middleware/uploadFile.js";

export const routerPosts = Router();

routerPosts.post("/creatPosts", upload.single("imagePosts"), createPost);
routerPosts.get("/getPosts", getPosts);
routerPosts.get("/getById/:id", getById);
routerPosts.get("/readById/:id", readById);
routerPosts.get("/posts_related/:id", getPostsRelated);
routerPosts.get("/getPostById/:userId", getPostByUserId);
routerPosts.post("/search", handleSearchPosts);
routerPosts.post("/getPostByCategories", getPostsByCategories);
routerPosts.put("/updatePosts/:id", upload.single("imagePosts"), updatePosts);
routerPosts.delete("/removePosts/:id", deletePosts);
routerPosts.post("/deleteImage", upload.single("image_rm"), removeImage);
