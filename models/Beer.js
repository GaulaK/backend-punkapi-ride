const mongoose = require("mongoose");
const Beer = mongoose.model("Beer", {
  name: { type: String, required: true },
  tagline: String,
  first_brewed: String,
  description: String,
  image_url: String,

  abv: Number,
  ibu: Number,
  ebc: Number,
  srm: Number,
  ph: Number,

  ingredients: Map,
});

module.exports = Beer;
