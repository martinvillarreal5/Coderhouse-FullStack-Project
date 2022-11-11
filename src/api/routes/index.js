import { Router } from "express";
import productRoutes from "./productsRouter.js";
import cartRoutes from "./cartRouter.js";
import userRoutes from "./userRouter.js";
import orderRouter from "./orderRouter.js";

const router = Router();

router.use("/user", userRoutes);
router.use("/products", productRoutes);
router.use("/cart", cartRoutes);
router.use("/order", orderRouter);

export default router;
