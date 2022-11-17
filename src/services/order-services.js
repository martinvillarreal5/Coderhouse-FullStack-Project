import orderRepository from "../data-access/repositories/order-repository.js";
import cartRepository from "../data-access/repositories/cart-repository.js"; //? Should i use the service intead?
import { AppError } from "../lib/error-handler.js";
import { sendNewOrderMail } from "../lib/mailer.js";

export const getOrdersByEmail = async (email) => {
  return await orderRepository.getMany({ email: email });
};

export const getAllOrders = async () => {
  return await orderRepository.getAll();
};

export const createOrder = async (user) => {
  const cart = await cartRepository.getOne({ email: user.email });
  if (!cart || cart.products.length < 1) {
    throw new AppError(
      "Invalid Cart",
      "User cart does not exist or is empty",
      404,
      true
    );
  }

  const orderInfo = {
    orderNumber: await orderRepository.getOrderCount(),
    email: user.email,
    products: cart.products,
    state: "generated",
  };
  const newOrder = await orderRepository.create(orderInfo);
  await sendNewOrderMail(user, newOrder.products);
  return newOrder;
};

export const updateOrderStatus = async (id, newState) => {
  return await orderRepository.updateById(id, { state: newState });
};
