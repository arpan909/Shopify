const mongoose = require("mongoose");

const item = new mongoose.Schema(
  {
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const Item = mongoose.model("Item", item);

module.exports = Item;
