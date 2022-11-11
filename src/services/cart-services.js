import CartRepository from "../data-access/repositories/cart-repository.js";
import ProductRepository from "../data-access/repositories/product-repository.js";
import { AppError } from "../lib/error-handler.js";
import logger from "../lib/logger.js";

const getCartById = async (id) => {
  return await CartRepository.getById(id);
};

const getCart = async (paramObject) => {
  return await CartRepository.getOne(paramObject);
};

const getCarts = async () => {
  return await CartRepository.getAll();
};

const actualizeCartProducts = async (products) => {
  //? Instead of doing this, when each product gets updated/deleted also update the products in all carts somehow?
  //? Maybe populate can do this easier?
  const productIds = products.map((product) => {
    return product.productId;
  });
  return await ProductRepository.getByIds(productIds); // Returns the actualized products
  //? will not return any product that doesnt exists in the database
};

const removeProductFromCart = async (email, productId) => {
  const existingProduct = await ProductRepository.getById(productId);
  if (!existingProduct) {
    throw new AppError(
      "Invalid-Cart-Product",
      "Product to add doesn't exist in the database",
      true,
      400
    );
  }
  const cart = await CartRepository.getOne({ email: email });
  if (!cart) {
    throw new AppError(
      "Invalid-Cart",
      "User doesn't have a shopping cart yet",
      true,
      400
    );
  }
  const productIndex = cart.products.findIndex((product) => {
    return product.productId == productId;
  });
  if (productIndex < 0) {
    throw new AppError(
      "Invalid-Cart-Product",
      "Product to remove is not in the cart",
      true,
      400
    );
  }
  logger.info(
    { cart: cart, productId: productId },
    "Removing Product from Cart"
  );
  return await CartRepository.removeProduct(cart._id, productId);
};

const addProductToCart = async (email, productData) => {
  //TODO add new method for update quantity
  const { productId, quantity } = productData;
  if (quantity < 1) {
    throw new AppError(
      "Invalid-Quantity",
      "The quantity of the product to add to cart is a non positive value",
      true,
      400
    );
  }
  const existingProduct = await ProductRepository.getById(productId);
  if (!existingProduct) {
    throw new AppError(
      "Invalid-Cart-Product",
      "Product to add doesn't exist in the database",
      true,
      400
    );
  }
  const cart = await CartRepository.getOne({ email: email });
  //If cart already exists for user,
  if (cart) {
    const productIndex = cart.products.findIndex((product) => {
      return product.productId == productId;
    });
    if (productIndex > -1) {
      //product is already in cart
      const cartProduct = cart.products[productIndex];
      logger.info(
        { cart: cart, productId: productId, quantityToAdd: quantity },
        "Adding Product to Cart: increasing existing product quantity."
      );
      return await CartRepository.updateProductQuantity(
        cart._id,
        productId,
        cartProduct.quantity + quantity
      );
    }
    //product is not in the cart
    logger.info(
      { cart: cart, productId: productId, quantityToAdd: quantity },
      "Adding Product to Cart: adding new porduct."
    );
    return await CartRepository.addProduct(cart._id, {
      productId: productId,
      quantity: quantity,
      description: existingProduct.description,
      price: existingProduct.price,
      title: existingProduct.title,
    });
  }
  //Create new Cart
  logger.info(
    { userEmail: email, productId: productId, quantityToAdd: quantity },
    "Adding Product to Cart: Creating a cart with new product."
  );
  return await CartRepository.create({
    email: email,
    products: [
      {
        productId: productId,
        quantity: quantity,
        description: existingProduct.description,
        price: existingProduct.price,
        title: existingProduct.title,
      },
    ],
  });
};

const deleteCart = async (id) => {
  await CartRepository.deleteById(id);
};

export default {
  getCartById,
  getCart,
  getCarts,
  addProductToCart,
  removeProductFromCart,
  deleteCart,
  actualizeCartProducts,
};
