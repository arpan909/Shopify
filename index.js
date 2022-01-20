const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const mongoose = require("mongoose");

const itemRoutes = require("./routes/itemRoutes");
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use(express.json());

mongoose.connect(
  "mongodb+srv://arpan:arpan@cluster0.ppfl7.mongodb.net/Shopify?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(itemRoutes);

app.listen(3000, () => {
  console.log("Server Listining on port 3000");
});
