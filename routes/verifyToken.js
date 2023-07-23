const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, "JHDGVUHIVJGNFVBEVCTRUYKTC7IV", (err, user) => {
      if (err) res.status(401).json("Token is not valid");
      res.user = user;
      //   console.log(res.user);
      next();
    });
  } else {
    return res.status(401).json("you are not authenticated!");
  }
};

const verifyTokenAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    if (res.user.id === req.params.id || res.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that!");
    }
  });
};
const verifyTokenAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (res.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that!");
    }
  });
};

module.exports = { verifyToken, verifyTokenAuth, verifyTokenAdmin };
