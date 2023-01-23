import { Router } from "express";
import {
  getUserOrders,
  createOrder,
  getAllOrders,
  getOrderById,
} from "../controllers/order-controller.js";
import { ensureAuth, ensureAdminAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", ensureAuth, getUserOrders);
router.get("/:id", ensureAuth, getOrderById);
router.get("/admin/", ensureAdminAuth, getAllOrders);
router.post("/", ensureAuth, createOrder);

export default router;
