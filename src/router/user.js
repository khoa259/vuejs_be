import { Router } from "express";
import {
  addWishlist,
  deleteWishlist,
  getWishList,
} from "../controller/user.js";
export const userRoute = Router();
userRoute.post("/wishlist", addWishlist);
userRoute.put("/rm_wishlist", deleteWishlist);
userRoute.get("/wishlists", getWishList);
