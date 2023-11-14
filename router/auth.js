import { Router } from "express";
import {
  getUserById,
  login,
  signUp,
  verifyToken,
  get,
} from "../controller/auth.js";

export const authRoute = Router();

authRoute.post("/signup", signUp);
authRoute.post("/login", login);
authRoute.get("/getUser", get);
authRoute.get("/getAllUser/:id", getUserById);
authRoute.get("/verify/:token", verifyToken);
