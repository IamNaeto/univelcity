const express = require("express");
const mongoose = require("mongoose");

app = express(); //express instance

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
