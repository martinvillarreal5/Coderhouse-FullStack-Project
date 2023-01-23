import { Router } from "express";
import { ensureAdminAuth } from "../middleware/auth.js";
import { pictureUpload, updatePictureUpload } from "../middleware/multer.js";
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
  //pictureUpload.single("picture"),
  pictureUpload.fields([
    { name: "picture", maxCount: 1 },
    { name: "backPicture", maxCount: 1 },
  ]),
  createProduct
);
router.put(
  "/admin/:id",
  ensureAdminAuth,
  updatePictureUpload.single("picture"),
  updateProduct
);
router.delete("/admin/:id", ensureAdminAuth, deleteProduct);

export default router;
