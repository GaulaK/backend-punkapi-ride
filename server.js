require("dotenv").config();

const axios = require("axios");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const isAuthenticated = require("./middlewares/isAuthenticated");

// Models
const Beer = require("./models/Beer");

// Routes
const beerRoutes = require("./routes/beer");

// Express setup
const app = express();
app.use(cors());
app.use(express.json());
app.use(beerRoutes);

// Database
mongoose.connect(process.env.DATABASE_URL);
mongoose.connection.on("connected", () => {
  console.log("DB Link Done");
});

app.post("/generate", isAuthenticated, async (req, res) => {
  // TODO: Refacto process (limite duplication)
  try {
    const response = await axios.get(
      `${process.env.ENDPOINT_PUNKAPI}beers?page=1&per_page=2`
    );
    console.log("Request done");
    response.data.forEach(async (beer) => {
      // console.log(beer);
      const newBeer = new Beer({
        name: beer.name,
        tagline: beer.tagline,
        first_brewed: beer.first_brewed,
        description: beer.description,
        image_url: beer.image_url,

        abv: beer.abv,
        ibu: beer.ibu,
        ebc: beer.ebc,
        srm: beer.srm,
        ph: beer.ph,

        ingredients: beer.ingredients,
      });

      console.log(newBeer);
      await newBeer.save();
    });
    res.json("ok");
  } catch (error) {
    res.status(400).json(error.message);
  }
});

app.get("/", (req, res) => {
  res.json({ message: "Default Route works" });
});

app.all("*", (req, res) => {
  console.log("route all *");
  res.status(404).json({ message: "Page not found" });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Punk API is available !");
});
