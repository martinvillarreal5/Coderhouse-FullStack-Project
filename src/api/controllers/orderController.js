import * as orderServices from "../../services/orderServices.js";

export const createOrder = async (req, res, next) => {
  try {
    const newOrder = await orderServices.createOrder({
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
    });
    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
};

export const getUserOrders = async (req, res, next) => {
  try {
    const orders = await orderServices.getOrders({ email: req.user.email });
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await orderServices.getOrders();
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};
