const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRouter = require("./routes/User");

const auth = require("./middleware/auth");
require("dotenv").config();
const connectToDB = require("./config/db");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use("/users", authRouter);

app.listen(port, () => {
  try {
    connectToDB(process.env.DB_URL);
    console.log("we are connecte to database successfully");
    console.log(`server is runnin at http://localhost:${port} `);
  } catch (err) {
    console.log(err.message);
  }
});
