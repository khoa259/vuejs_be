import { Router } from "express";
import { createPost, getPostByUserId } from "../controller/posts.js";

export const routerPosts = Router();

routerPosts.post("/creatPosts", createPost);
routerPosts.get("/getPostById/:userId", getPostByUserId);
