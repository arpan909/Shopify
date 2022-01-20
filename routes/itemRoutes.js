const express = require("express");
const res = require("express/lib/response");
const Item = require("../model/items");
const router = express.Router();

router.get("/", (req, res) => {
  res.redirect("/items");
});
//Get all Items
router.get("/items", async (req, res) => {
  const items = await Item.find({});
  res.render("Home.ejs", { data: items });
  res.json(items);
  console.log(Object.keys(Item.schema.obj));
});

router.get("/insert", (req, res) => {
  res.render("Insert.ejs");
});
//Create a new Item
router.post("/items", async (req, res) => {
  console.log(req.body);
  const newItem = new Item(req.body);
  try {
    await newItem.save();
    res.render("Done.ejs", { msg: `Added ${req.body.name} sucessfully!` });
  } catch (err) {
    res.render("404.ejs");
    res.status(400).json(err);
  }
});

router.get("/update", async (req, res) => {
  res.render("Update.ejs");
});

//Update Item
router.post("/item", async (req, res) => {
  console.log(req.body);
  try {
    const itemToBeUpdated = await Item.findOne({ _id: req.body._id });

    if (!itemToBeUpdated) {
      res.render("404.ejs", { error: "Id is invalid!" });
    }

    const userUpdates = Object.keys(req.body);
    console.log(userUpdates);
    console.log(itemToBeUpdated);
    userUpdates.forEach((update) => {
      itemToBeUpdated[update] = req.body[update];
    });

    await itemToBeUpdated.save();
    res.render("Done.ejs", { msg: `Updated ${req.body._id} sucessfully!` });
  } catch (error) {
    res.render("404.ejs", { error: "Something went wrong!" });
  }
});

router.get("/delete", (req, res) => {
  res.render("Delete.ejs");
});

router.post("/itemDelete", async (req, res) => {
  try {
    const deleted = await Item.findOneAndDelete({ _id: req.body._id });
    console.log("Deleted: " + deleted);
    if (!deleted) {
      res.render("404.ejs", { error: "No item with the given Id!" });
    }
    res.render("Done.ejs", {
      msg: `Item ${req.body._id} deleted sucessfully!`,
    });
  } catch (error) {
    res.render("404.ejs", { error: "Something went wrong!" });
  }
});

router.get("/csvExport", async (req, res) => {
  const fastcsv = require("fast-csv");
  const fs = require("fs");
  const ws = fs.createWriteStream("my_data.csv");

  const data = await Item.find({});

  fastcsv
    .write(data, { headers: true })
    .on("finish", function () {
      console.log("Write to my_data.csv successfully!");
    })
    .pipe(ws);

  res.json({ msg: "Done" });
});
module.exports = router;
