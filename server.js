require("dotenv").config();

const axios = require("axios");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Middlewares
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
  try {
    const response = await axios.get(
      `${process.env.ENDPOINT_PUNKAPI}beers?page=1&per_page=80`
    );
    const beers = response.data;

    response.data.forEach(async (beer) => {
      const beerAlreadyExists = await Beer.exists({ name: beer.name });
      if (beerAlreadyExists) {
      } else {
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
        await newBeer.save();
      }
    });
    res.json({ message: "Data Generated" });
  } catch (error) {
    res.status(400).json(error.message);
  }
});

app.get("/", (req, res) => {
  res.json({
    message:
      "CRUM API about beers - developped by @GaulaK on GitHub - based on PUNK API",
  });
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(process.env.PORT || 4000, () => {
  console.log("Punk API is available !");
});
