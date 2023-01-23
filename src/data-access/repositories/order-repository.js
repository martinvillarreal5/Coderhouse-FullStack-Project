import BaseRepository from "./base-repository.js";
import OrderModel from "../models/order-model.js";

class OrderRepository extends BaseRepository {
  constructor() {
    super(OrderModel);
  }
  getOrderCount = async () => {
    return await this.model.countDocuments();
  };
}

export default new OrderRepository();
