const express = require("express");
const Item = require("../model/items");
const router = express.Router();

//Get all Items
router.get("/items", async (req, res) => {
  const item = await Item.find({});
  res.json(item);
  console.log(Object.keys(Item.schema.obj));
});

//Create a new Item
router.post("/items", async (req, res) => {
  const newItem = new Item(req.body);
  try {
    await newItem.save();
    res.json(newItem);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Update Item
router.patch("/item/:id", async (req, res) => {
  const validUpdates = Object.keys(Item.schema.obj);
  const userUpdates = Object.keys(req.body);
  const validOperation = userUpdates.every((update) =>
    validUpdates.includes(update)
  );
  try {
    if (!validOperation) {
      res.status(400).json({ error: "Invalid update!" });
    }

    const itemToBeUpdated = await Item.findOne({ _id: req.params.id });

    if (!itemToBeUpdated) {
      return res.status(400).json({ error: "Item doesn't exist!" });
    }

    userUpdates.forEach((update) => {
      itemToBeUpdated[update] = req.body[update];
    });

    await itemToBeUpdated.save();
    res.json(itemToBeUpdated);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
});

module.exports = router;
