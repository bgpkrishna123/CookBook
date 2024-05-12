const express = require("express");
const authRouter = express.Router();
const { login, register, logout, userDetails } = require("../controllers/user");
const auth = require("../middleware/auth");

authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.post("/logout", logout);
authRouter.get("/",auth, userDetails);

module.exports = authRouter;
