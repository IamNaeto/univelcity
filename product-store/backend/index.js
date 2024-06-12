require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const productRoute = require("./route/productRoute.js");
const cors = require("cors");

const app = express(); // express instance

app.use(cors()); // Use CORS middleware

app.use(express.json()); // registering express json middleware
app.use(express.urlencoded({ extended: false })); // registering urlencoded to express which helps us to post using a form or urlencoded format
app.use(process.env.APP_PRODUCT_ROUTE_URL, productRoute); // registering urlencoded to express

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
