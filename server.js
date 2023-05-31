require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const axios = require("axios");

// DB setup

/*
 *
 *
 */

// Express setup
const app = express();
app.use(cors());
app.use(express.json);

app.get("/", (req, res) => {
  res.json({ message: "Default Route works" });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Punk API is available ! ");
});
