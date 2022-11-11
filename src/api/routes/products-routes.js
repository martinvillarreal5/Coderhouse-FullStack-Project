import { Router } from "express";
import { ensureAdminAuth } from "../middleware/auth.js";
import { pictureUpload } from "../middleware/multer.js";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product-controller.js";

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post(
  "/admin/",
  ensureAdminAuth,
  pictureUpload.single("picture"),
  createProduct
);
router.put(
  "/admin/:id",
  ensureAdminAuth,
  pictureUpload.single("picture"),
  updateProduct
);
router.delete("/admin/:id", ensureAdminAuth, deleteProduct);

export default router;
