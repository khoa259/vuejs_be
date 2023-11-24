import { Router } from "express";
import { getCountItem } from "../controller/dashboard.js";
export const routerDashboard = Router();

routerDashboard.get("/dashboard-count", getCountItem);
