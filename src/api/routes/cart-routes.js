import { Router } from "express";
import {
  getCart,
  getCartById,
  getCarts,
  addProductToCart,
  deleteCart,
  removeProductFromCart,
} from "../controllers/cart-controller.js";
import { ensureAuth, ensureAdminAuth } from "../middleware/auth.js";

const router = Router();

router.post("/", ensureAuth, addProductToCart);
router.get("/", ensureAuth, getCart);
router.get("/admin/all", ensureAdminAuth, getCarts);
router.get("/admin/:id/", ensureAdminAuth, getCartById);
router.delete("/product/:id", ensureAuth, removeProductFromCart);
router.delete("admin/:id", ensureAdminAuth, deleteCart);

export default router;
