import { Router } from "express";
import productRoutes from "./products-routes.js";
import cartRoutes from "./cart-routes.js";
import userRoutes from "./user-routes.js";
import orderRouter from "./order-routes.js";

const router = Router();

router.use("/user", userRoutes);
router.use("/products", productRoutes);
router.use("/cart", cartRoutes);
router.use("/order", orderRouter);

export default router;
