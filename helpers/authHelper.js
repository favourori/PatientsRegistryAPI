const JWT = require("jsonwebtoken");

const accessToken = (payload) => new Promise((resolve, reject) => {
  const secret = process.env.JWT_KEY;
  JWT.sign(payload, secret, { expiresIn: "6h" }, (err, token) => {
    if (err) {
      reject(err.message);
      return;
    }
    resolve(token);
  });
});

const mustBeLoggedIn = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers.authorization || req.body.token;
  // Express headers are auto converted to lowercase
  if (token && token.startsWith("Bearer ")) {
    // Remove Bearer from string
    token = token.slice(7, token.length).trimLeft();
  }
  try {
    req.apiUser = JWT.verify(token, process.env.JWT_KEY);
    res.locals.user = req.apiUser;

    // res.locals is guaranteed to hold state over the life of a request.
    next();
  } catch (error) {
    res.status(401).json({
      status: false,
      message: "Sorry, you must provide a valid token."
    });
  }
};

module.exports = { accessToken, mustBeLoggedIn };
