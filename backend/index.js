require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const productSchema = require("./models/productModel.js");

app = express(); //express instance
app.use(express.json()); //registering express json middleware
app.use(express.urlencoded({ extended: false })); // registering urlencoded to express which helps us to post using a form or urlencoded format

const PORT = process.env.PORT || 3000; //port number

app.listen(PORT, (req, res) => {
  console.log(`Server running on port ${PORT}`);
});

// mongoose //connection to MongoDBCompass
//   .connect("mongodb://localhost:27017/univelcity")
//   .then(() => {
//     console.log("Connected to database successfully");
//   })
//   .catch(() => {
//     console.log(`Connection to database failed`);
//   });

const MONGO_URL = process.env.MONGO_DB_CONNECTION_STRING;
mongoose //connection to MongoDB
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to database successfully");
  })
  .catch(() => {
    console.log(`Connection to database failed`);
  });

// get method
app.get("/", (req, res) => {
  res
    .send({
      msg: "Welcome to the home page",
      hint: "More is coming",
    })
    .status(200);
});

// post method
app.post(`${process.env.APP_PRODUCT_ROUTE_URL}/create`, async (req, res) => {
  try {
    if (
      !req.body.product_name ||
      !req.body.product_qty ||
      !req.body.product_price
    ) {
      res.status(400).send({
        msg: "All fields must be filled",
      });
      return;
    }
    const productDetails = await productSchema.create(req.body);
    res.status(201).send(productDetails);
  } catch (error) {
    res.status(500).send({
      msg: "Internal Server Error",
      error: error.message,
    });
  }
});

// get method
app.get(process.env.APP_PRODUCT_ROUTE_URL, async (req, res) => {
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
});

// put method
app.put(`${process.env.APP_PRODUCT_ROUTE_URL}/update/:id`, async (req, res) => {
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
});

// delete method
app.delete(
  `${process.env.APP_PRODUCT_ROUTE_URL}/delete/:id`,
  async (req, res) => {
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
  }
);
