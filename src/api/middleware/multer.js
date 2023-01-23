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
    //TODO Add firstName and lastNAme verification
    const firstName = req.body?.firstName;
    const lastName = req.body?.lastName;
    cb(
      null,
      `avatar_${firstName}_${lastName}_${Date.now()}.${ext}`
        .toLowerCase()
        .replaceAll(" ", "_")
    );
  },
});

const pictureDestination = (req, file, cb) => {
  fs.mkdirSync("public/images/product-pictures", { recursive: true });
  cb(null, "public/images/product-pictures");
};

const pictureStorage = multer.diskStorage({
  destination: pictureDestination,
  filename: async (req, file, cb) => {
    //TODO add req.body verification
    const ext = file.mimetype.split("/")[1];
    const field = file.fieldname;
    const title = req.body?.title;
    const category = req.body?.category;
    if (!title || !title.length) {
      const error = new AppError(
        "Missing title",
        "Product title is misssing or empty.",
        400,
        true
      );
      cb(error, null);
    }
    if (!category || !category.length) {
      const error = new AppError(
        "Missing category",
        "Product category is misssing or empty.",
        400,
        true
      );
      cb(error, null);
    }
    cb(
      null,
      `product_${title}_${category}_${field}_${Date.now()}.${ext}`
        .toLowerCase()
        .replaceAll(" ", "_")
    );
  },
});

const updatePictureStorage = multer.diskStorage({
  destination: pictureDestination,
  filename: async (req, file, cb) => {
    //TODO add req.body verification
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
    const field = file.fieldname;
    const title = req.body?.title || product.title;
    const category = req.body?.category || product.category;
    cb(
      null,
      `product_${title}_${category}_${field}_${Date.now()}.${ext}`
        .toLowerCase()
        .replaceAll(" ", "_")
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
  limits: { fileSize: 5000000 },
  fileFilter: imageFilter,
});

const pictureUpload = multer({
  storage: pictureStorage,
  limits: { fileSize: 5000000 },
  fileFilter: imageFilter,
});

const updatePictureUpload = multer({
  storage: updatePictureStorage,
  limits: { fileSize: 5000000 },
  fileFilter: imageFilter,
});

export { avatarUpload, pictureUpload, updatePictureUpload };
