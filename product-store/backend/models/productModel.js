const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
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
    product_description: {
      type: String,
      require: true,
    },
  },

  {
    timestamps: true,
  }
);

const productList = mongoose.model("productLists", productSchema);
module.exports = productList;
