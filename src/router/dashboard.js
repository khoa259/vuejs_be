import { Router } from "express";
import { Dashboard } from "../controller/dashboard.js";
export const routerDashboard = Router();

routerDashboard.get("/dashboard", Dashboard);
