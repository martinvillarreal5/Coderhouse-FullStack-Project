import BaseRepository from "./base-repository.js";
import CartModel from "../models/cart-model.js";

class CartRepository extends BaseRepository {
  constructor() {
    super(CartModel);
  }

  async addProduct(cartId, newProduct) {
    //? This operation is atomic.
    //? Meaning that the document will not have the potential to change between separate find and update operations.
    //? This is better than geting a doc instance, mutating it and then saving
    return await this.model.findOneAndUpdate(
      { _id: cartId },
      { $push: { products: newProduct } },
      {
        runValidators: true,
        new: true,
      }
    );
  }

  async removeProduct(cartId, productId) {
    //? This operation is atomic.
    return await this.model.findOneAndUpdate(
      { _id: cartId },
      { $pull: { products: { productId: productId } } },
      {
        runValidators: true,
        new: true,
      }
    );
  }

  /* async removeAllProducts(cartId) {
    //? This operation is atomic.
    return await this.model.findOneAndUpdate(
      { _id: cartId },
      { $set: { products: [] } },
      {
        runValidators: true,
        new: true,
      }
    );
  }
 */
  async updateProductQuantity(cartId, productId, quantity) {
    // TODO test
    return await this.model.findOneAndUpdate(
      { _id: cartId, "products.productId": productId },
      { $set: { "products.$.quantity": quantity } },
      {
        runValidators: true,
        new: true,
      }
    );
  }
}

export default new CartRepository();
