const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRouter = require("./routes/User");
const router = require("./routes/recipeRoutes");
const cors = require("cors");
require("dotenv").config();
const auth = require("./middleware/auth");
const connectToDB = require("./config/db");
const { geminiRouter } = require("./routes/gemini.route");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.json());
const port = process.env.PORT || 3000;

app.use("/users", authRouter);
app.use("/recipes", router);
app.use("/gemini", geminiRouter);

app.listen(port, () => {
  try {
    connectToDB(process.env.DB_URL);
    console.log("we are connecte to database successfully");
    console.log(`server is runnin at http://localhost:${port} `);
  } catch (err) {
    console.log(err.message);
  }
});
