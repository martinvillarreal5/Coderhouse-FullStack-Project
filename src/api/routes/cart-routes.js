import { Router } from "express";
import {
  getCart,
  getCartById,
  getCarts,
  addProductToCart,
  deleteCart,
  removeProductFromCart,
  removeAllProductsFromCart,
} from "../controllers/cart-controller.js";
import { ensureAuth, ensureAdminAuth } from "../middleware/auth.js";

const router = Router();

router.post("/", ensureAuth, addProductToCart);
router.get("/", ensureAuth, getCart);
router.delete("/product/:id", ensureAuth, removeProductFromCart);
router.delete("/products", ensureAuth, removeAllProductsFromCart);

//Admin Routes
router.get("/admin/all", ensureAdminAuth, getCarts);
router.get("/admin/:id/", ensureAdminAuth, getCartById);
router.delete("admin/:id", ensureAdminAuth, deleteCart);

export default router;
