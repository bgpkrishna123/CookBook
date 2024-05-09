const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
  description: String,
  ingredients: [String],
  instructions: [String],

  dietaryRestrictions: [String],
  healthiness: { type: String, enum: ["Healthy", "Moderate", "Indulgent"] },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  cookTime: { type: String, required: true },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
