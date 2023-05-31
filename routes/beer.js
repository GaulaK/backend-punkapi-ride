const express = require("express");
const router = express.Router();

// Models
const Beer = require("../models/Beer");

router.get("/getAll", async (req, res) => {
  try {
    const beers = await Beer.find();
    res.json({ length: beers.length || 0, data: beers });
  } catch (error) {
    console.log("Error during GET - getAll - ", error);
    res.status(500).json("Error during get all elements");
  }
});

router.get("/getOne", async (req, res) => {
  try {
    if (req.query?.id) {
      const beer = await Beer.findById(req.query.id);
      if (beer) {
        res.json(beer);
      } else {
        res
          .status(404)
          .json({ error: `No element found with the id ${req.query.id}` });
      }
    } else {
      res.status(400).json({ error: "Need a query with the key 'id' " });
    }
  } catch (error) {
    console.log("Error during GET - getOne - ", error);
    res.status(500).json("Error during get one element by id");
  }
});

router.post("/createOne", async (req, res) => {
  try {
    if (req.body?.name) {
      const newBeer = new Beer(req.body);
      const beerAlreadyExists = await Beer.findOne({ name: req.body.name });
      if (beerAlreadyExists) {
        return res
          .status(400)
          .json({ message: "Beer with this name already exists" });
      }
      newBeer.save();
      res.json(newBeer);
    } else {
      res.status(400).json({ error: `Beer need a name to be created` });
    }
  } catch (error) {
    console.log("Error during POST - createOne - ", error);
    res.status(500).json("Error during get one element by id");
  }
});

router.patch("/updateOne", async (req, res) => {
  try {
    if (req.body?.id && req.body?.update) {
      const beerToModify = await Beer.findById(req.body.id);
      if (!beerToModify) {
        return res.status(404).json({ error: `No beer found with this ID` });
      }
      const beermodified = await Beer.findByIdAndUpdate(
        req.body.id,
        req.body.update
      );

      res.json(beermodified);
    } else {
      res.status(400).json({ error: `Invalid format sent` });
    }
  } catch (error) {
    console.log("Error during DELETE - updateOne - ", error);
    res.status(500).json("Error during updating one element");
  }
});

router.delete("/deleteOne", async (req, res) => {
  try {
    if (req.body?.id) {
      const BeerDeleted = await Beer.findByIdAndDelete(req.body.id);

      //   Check if the element has been deleted or not been found
      if (BeerDeleted) {
        res.json("Beer deleted to the Database");
      } else {
        res.status(404).json("Beer not found");
      }
    } else {
      res.status(400).json({ error: "Need a query with the key 'id' " });
    }
  } catch (error) {
    console.log("Error during DELETE - deleteOne - ", error);
    res.status(500).json("Error during deleting one element");
  }
});

module.exports = router;
