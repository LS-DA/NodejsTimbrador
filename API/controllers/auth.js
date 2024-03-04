const Usuarios = require("../models/usuarios");
const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwt");

function registro(req, res) {
  const { nombre, apellido, email, password } = req.body;

  if (!email) res.status(400).send({ msg: "El campo correo es obligatorio" });
  if (!password)
    res.status(400).send({ msg: "El campo password es obligatorio" });

  const usuarios = new Usuarios({
    nombre,
    apellido,
    email,
    email: email.toLowerCase(),
    role: "user",
    active: false,
  });

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);

  usuarios.password = hashPassword;

  usuarios.save((error, userStorage) => {
    if (error) {
      res.status(400).send({ msg: "erorro al crear el usuario" });
    } else {
      res.status(400).send(userStorage);
    }
  });
}

function login(req, res) {
  const { email, password } = req.body;

  if (!email) res.status(400).send({ msg: "El campo correo es obligatorio" });
  if (!password)
    res.status(400).send({ msg: "El campo password es obligatorio" });

  const emailLowerCase = email.toLowerCase();

  Usuarios.findOne({ email: emailLowerCase }, (error, userStore) => {
    if (error) {
      res.status(500).send({ msg: "Error del servidor" });
    } else {
      bcrypt.compare(password, userStore.password, (bcryptError, check) => {
        if (bcryptError) {
          res.status(500).send({ msg: "Error del servidor" });
        } else if (!check) {
          res.status(400).send({ msg: "Contraseña Incorrecta" });
        } else if (!userStore.active) {
          res.status(401).send({ msg: "Usuario no autorizado o no activo" });
        } else {
          res.status(200).send({
            access: jwt.createAccesToken(userStore),
            refresh: jwt.createRefreshToken(userStore),
          });
        }
      });
    }
  });
}

function refreshAccessToken(req, res) {
  const { token } = req.body;
  const { user_id } = jwt.decode(token);
  if (!token) res.status(400).send({ msg: "El campo token es obligatorio" });

  Usuarios.findOne({ _id: user_id }, (error, userStorage) => {
    if (error) {
      res.status(500).send({ msg: "Error del servidor" });
    } else {
      res.status(200).send({
        accessToken: jwt.createAccesToken(userStorage),
      });
    }
  });
}

module.exports = {
  registro,
  login,
  refreshAccessToken,
};
