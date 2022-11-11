import * as productServices from "../../services/product-services.js";

export const getProductById = async (req, res, next) => {
  try {
    const product = await productServices.getProductById(req.params.id);
    product ? res.status(200).json(product) : res.status(404).end();
  } catch (error) {
    next(error);
  }
};
export const getProducts = async (req, res, next) => {
  try {
    const products = await productServices.getProducts();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};
export const createProduct = async (req, res, next) => {
  try {
    if (!req.file) {
      //TODO improve error handling here or in the multer.js
      return res.status(500).json("Picture didn't upload");
    }
    req.body.pictureUrl = req.file.path;
    const newProduct = await productServices.createProduct(req.body);
    res.status(201).json("Saved product: " + newProduct);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.pictureUrl = req.file.path;
    }
    const updatedProductId = await productServices.updateProduct(
      req.params.id,
      req.body
    );
    res.status(200).json("Updated product id: " + updatedProductId);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    await productServices.deleteProduct(req.params.id);
    res.status(200).json("Product deleted");
    // ?  res.status(204).end() // también podría ser, 204 no content
  } catch (error) {
    next(error);
  }
};
