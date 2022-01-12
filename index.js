const express = require("express");
const app = express();

const mongoose = require("mongoose");
const Item = require("./model/Item");

mongoose.connect(
  "mongodb+srv://arpan:arpan@cluster0.ppfl7.mongodb.net/Shopify?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.listen(3000, () => {
  console.log("Server Listining on port 3000");
});
