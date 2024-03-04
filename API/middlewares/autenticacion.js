const jwt = require("../utils/jwt");

function asureAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send({ msg: "Sin autorizacion " });
  }

  console.log(req.headers.authorization);

  const token = req.headers.authorization.replace("Bearer ", "");

  console.log(token);

  try {
    const payload = jwt.decode(token);

    const { exp } = payload;
    const currentDate = new Date().getTime();

    console.log(exp);
    console.log(currentDate);

    if (exp <= currentDate) {
      return res.status(400).send({ msg: "El token ha expirado" });
    }

    req.user = payload;
    next();
  } catch (error) {
    return res.status(400).send({ msg: "Token invalido" });
  }
}

module.exports = {
  asureAuth,
};
