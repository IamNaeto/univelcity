const mongoose = require("mongoose");

const productScheme = mongoose.Schema(
  {
    product_name: {
      type: String,
      require: true,
    },
    product_qty: {
      type: Number,
      require: true,
    },
    product_price: {
      type: Number,
      require: true,
    },
  },

  {
    timestamps: true,
  }
);

const productList = mongoose.model("productLists", productScheme);
module.exports = productList;
