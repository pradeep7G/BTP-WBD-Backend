const mongoose = require("mongoose")

const CartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: String
        },
        title: { type: String, required: true },
        desc: { type: String, required: true },
        img: { type: String, required: true },
        categories: { type: Array },
        size: { type: Array },
        color: { type: Array },
        price: { type: Number, required: true },
        quantity: {
          type: Number,
          default: 1
        }
      }
    ],
    quantity: { type: Number, default: 0, required: true },
    total: { type: Number, default: 0, required: true }
  },
  { timestamps: true }
)

module.exports = mongoose.model("Cart", CartSchema)
