const jsonwebtoken = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization) {
    const token = authorization.split(" ")[1];

    jsonwebtoken.verify(token, "blogs", (err, decoded) => {
      if (decoded) next();
      else res.status(400).send({ msg: "invalid token" });
    });
  } else res.status(400).send({ msg: "token not found" });
};

module.exports = { auth };
