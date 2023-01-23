import mongoose from "mongoose";
const Schema = mongoose.Schema;

const orderItemSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  title: {
    type: Array,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, "Quantity can not be less then 1."],
  },
  price: {
    type: Number,
    required: true,
  },
});

const orderSchema = new Schema(
  {
    products: {
      type: [orderItemSchema],
      default: undefined,
      required: true,
    },
    state: {
      // ? is set in the server, probably dont need extra validation
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    timeStamps: true,
  }
);

orderSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    returnedObject.products.forEach((product) => {
      product.id = product._id;
      delete product._id;
    });
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default mongoose.model("Order", orderSchema);
