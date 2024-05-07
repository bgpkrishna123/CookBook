require("dotenv").config();
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to Home Page!');
});

app.listen(3000, () => {
  console.log('Server is running at 3000');
});