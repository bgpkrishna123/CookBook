const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRouter = require("./routes/User");
const router = require("./routes/recipeRoutes");

require("dotenv").config();

const connectToDB = require("./config/db");
const { geminiRouter } = require("./routes/gemini.route");
require("dotenv").config();
const cors = require("cors");
const { keepAlive } = require("./keepalive");

const app = express();

app.use(bodyParser.json());

app.use(express.json());
const port = process.env.PORT || 3000;
app.use(cors());

app.use("/users", authRouter);
app.use("/recipes", router);
app.use("/gemini", geminiRouter);

app.listen(port, () => {
  try {
    connectToDB(process.env.DB_URL);
    console.log("we are connecte to database successfully");
    console.log(`server is runnin at port ${port} `);
    keepAlive();
  } catch (err) {
    console.log(err.message);
  }
});
