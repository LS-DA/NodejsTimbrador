const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../constants");

function createAccesToken(user) {
  const expToken = new Date();

  console.log(expToken);

  expToken.setHours(expToken.getHours() + 3);

  console.log(expToken);

  const payload = {
    token_type: "access",
    user_id: user._id,
    iat: Date.now(),
    exp: expToken.getTime(),
  };

  console.log(payload);

  return jwt.sign(payload, JWT_SECRET_KEY);
}

function createRefreshToken(user) {
  const expToken = new Date();
  expToken.getMonth(expToken.getMonth() + 1);

  const payload = {
    token_type: "refresh",
    user_id: user._id,
    iat: Date.now(),
    exp: expToken.getTime(),
  };

  return jwt.sign(payload, JWT_SECRET_KEY);
}

function decode(token) {
  return jwt.decode(token, JWT_SECRET_KEY, true);
}

module.exports = {
  createAccesToken,
  createRefreshToken,
  decode,
};
