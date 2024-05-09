require("dotenv").config();
const jwt = require("jsonwebtoken");
const { userModel } = require("../model/user");

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.secretKey, async (err, dec) => {
      if (dec) {
        const { id } = dec;

        const user = await userModel.findOne({ _id: id });

        req.role = user.role;
        // console.log(req.role);
        next();
      } else {
        return res.status(401).json({
          message: "Invalid Token",
          error: err.message,
        });
      }
    });
  } else {
    return res.status(404).json({ msg: "Login first" });
  }
};

// module.exports ={ auth};

module.exports = auth;
