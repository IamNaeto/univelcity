const productSchema = require("../models/productModel");

// Helps to create a product
const createProducts = async (req, res) => {
  try {
    const { product_name, product_qty, product_price } = req.body;

    // Check if all required fields are present
    if (
      !req.body.product_name ||
      !req.body.product_qty ||
      !req.body.product_price ||
      !req.body.product_description
    ) {
      return res.status(400).send({
        msg: "All fields must be filled",
      });
    }

    // Check if a product with the same name already exists
    const existingProduct = await productSchema.findOne({
      product_name,
    });

    if (existingProduct) {
      return res.status(409).send({ msg: "Product already exists" });
    }

    // Create the new product
    const productDetails = await productSchema.create(req.body);

    // Send the created product details as a response
    res.status(201).send(productDetails);
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(500).send({
      msg: "Internal Server Error",
      error: error.message,
    });
  }
};

// Helps to get all products
const getProducts = async (req, res) => {
  try {
    const products = await productSchema.find();
    if (products) {
      res.status(200).send(products);
    } else {
      res.status(404).send("Not Product Found");
      return;
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

// Helps to get a singular product
const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productSchema.findById(id);
    if (!product) {
      return res.status(404).send({ msg: "Product not found!" });
    }
    res.status(200).send(product);
  } catch (error) {
    res
      .status(500)
      .send({ msg: "Internal Server Error", error: error.message });
  }
};

// Helps to edit or update a product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productID = await productSchema.findByIdAndUpdate(id, req.body);
    if (!productID) {
      res.status(404).send({ msg: "Invalid ID; product not found" });
      return;
    }
    const updatedProduct = await productSchema.findById(id);
    res.status(200).send(updatedProduct);
  } catch (error) {
    res.status(500).send({ msg: "Internal Server Error" });
  }
};

// Helps to delete a product by id
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await productSchema.findByIdAndDelete(id);
    if (!deletedProduct) {
      res.status(404).send({ msg: "Invalid ID; product not found" });
      return;
    }
    res.status(200).send({ msg: "Product deleted successfully" });
  } catch (error) {
    res.status(500).send({ msg: "Internal Server Error" });
  }
};

module.exports = {
  createProducts,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
