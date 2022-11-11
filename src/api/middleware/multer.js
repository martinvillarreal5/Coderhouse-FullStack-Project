import multer from "multer";
import { AppError } from "../../lib/error-handler.js";
import { getProductById } from "../../services/product-services.js";
import fs from "fs";

const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdirSync("public/images/avatar", { recursive: true });
    cb(null, "public/images/avatar");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(
      null,
      `avatar_${req.body.firstName.toLowerCase()}_${req.body.lastName.toLowerCase()}_${Date.now()}.${ext}`
    );
  },
});

const pictureStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdirSync("public/images/product-pictures", { recursive: true });
    cb(null, "public/images/product-pictures");
  },
  filename: async (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    const product = await getProductById(req.params.id);
    if (!product) {
      const error = new AppError(
        "Not Found",
        "Product to update was not found in the database",
        404,
        true
      );
      cb(error, null);
    }
    const title = req.body?.title || product.title;
    const category = req.body?.category || product.category;
    cb(
      null,
      `avatar_${title.toLowerCase()}_${category.toLowerCase()}_${Date.now()}.${ext}`
    );
  },
});

const imageFilter = (req, file, cb) => {
  const ext = file.mimetype.split("/")[1];
  if (ext === "png" || ext === "jpeg" || ext === "jpg" || ext === "webp") {
    cb(null, true);
  } else {
    cb(
      new AppError(
        "Invalid Format",
        "Error: Only .png, .jpg, .webp and .jpeg format are allowed for image upload.",
        400,
        true
      ),
      false
    );
  }
};

const avatarUpload = multer({
  storage: avatarStorage,
  //limits: { fileSize: 5000000 },
  fileFilter: imageFilter,
});

const pictureUpload = multer({
  storage: pictureStorage,
  //limits: { fileSize: 5000000 },
  fileFilter: imageFilter,
});

export { avatarUpload, pictureUpload };
