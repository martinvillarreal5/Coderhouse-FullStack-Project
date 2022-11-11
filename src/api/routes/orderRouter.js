import { Router } from "express";
import {
  getUserOrders,
  createOrder,
  getAllOrders,
} from "../controllers/orderController.js";
import { ensureAuth, ensureAdminAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", ensureAuth, getUserOrders);
router.get("/admin/", ensureAdminAuth, getAllOrders);
router.post("/", ensureAuth, createOrder);

export default router;
