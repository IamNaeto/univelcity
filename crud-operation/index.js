const express = require("express");
const mongoose = require("mongoose");
const productScheme = require("./models/productModel.js");

app = express(); //express instance
app.use(express.json()); //registering express json middleware
app.use(express.urlencoded({ extended: false })); // registering urlencoded to express which helps us to post using a form or urlencoded format

const PORT = process.env.PORT || 3000; //port number

app.listen(PORT, (req, res) => {
  console.log(`Server running on port ${PORT}`);
});

mongoose //connection to mongodb
  .connect("mongodb://localhost:27017/univelcity")
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
app.post("/api/product/list/create", async (req, res) => {
  if (
    !req.body.product_name ||
    !req.body.product_qty ||
    !req.body.product_price
  ) {
    res.status(401).send({
      msg: "All fields must be field",
    });
  }

  try {
    const productDetails = await productScheme.create(req.body);
    res.status(201).send(productDetails);
  } catch (error) {
    res.status(500).send({
      msg: "Internal Server Error",
      error: error.message,
    });
  }
});
