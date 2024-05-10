const express = require("express");
const authRouter = express.Router();
const { login, register, logout } = require("../controllers/user");

authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.post("/logout", logout);

module.exports = authRouter;
