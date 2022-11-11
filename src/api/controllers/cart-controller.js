import cartServices from "../../services/cart-services.js";

const getCartById = async (req, res, next) => {
  try {
    const cart = await cartServices.getCartById(req.params.id);
    cart ? res.status(200).json(cart) : res.status(404).end(); //test
  } catch (error) {
    next(error);
  }
};
const getCart = async (req, res, next) => {
  try {
    const cart = await cartServices.getCart({ email: req.user.email });
    if (cart === null || cart.products.length < 1) {
      // null means the findOne query couldn't find a coincidence. i.e., the user doesnt have a cart yet
      // or has one but without products.
      //? Move this to service?
      return res.status(204).end();
    }
    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};
const getCarts = async (req, res, next) => {
  try {
    const carts = await cartServices.getCarts();
    res.status(200).json(carts);
  } catch (error) {
    next(error);
  }
};
const addProductToCart = async (req, res, next) => {
  try {
    const cart = await cartServices.addProductToCart(req.user.email, req.body);
    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

const removeProductFromCart = async (req, res, next) => {
  try {
    const cart = await cartServices.removeProductFromCart(
      req.user.email,
      req.params.id
    );
    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

const deleteCart = async (req, res, next) => {
  try {
    await cartServices.deleteCart(req.params.id);
    res.status(200).json("Cart was deleted");
  } catch (error) {
    next(error);
  }
};

export {
  getCart,
  getCarts,
  getCartById,
  addProductToCart,
  removeProductFromCart,
  deleteCart,
};
