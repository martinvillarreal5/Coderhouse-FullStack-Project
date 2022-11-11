import BaseRepository from "./base-repository.js";
import ProductModel from "../models/product-model.js";

class ProductRepository extends BaseRepository {
  constructor() {
    super(ProductModel);
  }

  getByIds = async (ids) => {
    return await this.model.find({ _id: { $in: ids } });
  };
}

export default new ProductRepository();
