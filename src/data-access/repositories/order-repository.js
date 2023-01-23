import BaseRepository from "./base-repository.js";
import OrderModel from "../models/order-model.js";

class OrderRepository extends BaseRepository {
  constructor() {
    super(OrderModel);
  }
}

export default new OrderRepository();
