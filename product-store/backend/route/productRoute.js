const express = require("express");
const router = express.Router();
const {
  createProducts,
  updateProduct,
  getProducts,
  getProduct,
  deleteProduct,
} = require("../controller/productController.js");

// get method
router.get("/", getProducts);
router.get("/:id", getProduct);

// post method
router.post("/create", createProducts);

// put method
router.put("/update/:id", updateProduct);

// delete method
router.delete("/delete/:id", deleteProduct);

module.exports = router;
