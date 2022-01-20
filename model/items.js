const mongoose = require("mongoose");

const item = new mongoose.Schema(
  {
    price: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Item = mongoose.model("Item", item);

module.exports = Item;
