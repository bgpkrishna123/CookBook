const express = require("express");
const router = express.Router();
const {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} = require("../controllers/recipeController");
const auth = require("../middleware/auth");
const { access } = require("../middleware/access");

router.post("/", auth, access("creator"), createRecipe);
router.get("/", auth, access("user", "creator"), getAllRecipes);

// router.get("/:id", getRecipeById);

router.patch("/:id", auth, access("creator"), updateRecipe);

router.delete("/:id", auth, access("creator"), deleteRecipe);

module.exports = router;
