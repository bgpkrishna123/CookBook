const access = (...role) => {
  return (req, res, next) => {
    if (role.includes(req.role)) {
      next();
    } else {
      res.status(403).send("NO ACCESS");
    }
  };
};

module.exports = { access };
