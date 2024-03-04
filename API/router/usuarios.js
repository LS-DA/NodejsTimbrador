const express = require("express");
const UsuariosController = require("../controllers/usuarios");
const md_auth = require("../middlewares/autenticacion");
const multiparty = require("connect-multiparty");

const api = express.Router();

const path = require("path");
const uploadDir = path.join(__dirname, "..", "uploads", "avatar");
const md_upload = multiparty({ uploadDir: uploadDir });

api.get("/usuarios/me", [md_auth.asureAuth], UsuariosController.getMe);
api.get("/usuarios", [md_auth.asureAuth], UsuariosController.getUsuarios);
api.post(
  "/usuarios",
  [md_auth.asureAuth, md_upload],
  UsuariosController.creaUsuario
);

api.patch(
  "/usuarios/:id",
  [md_auth.asureAuth, md_upload],
  UsuariosController.updateUsuario
);

api.delete(
  "/usuarios/:id",
  [md_auth.asureAuth],
  UsuariosController.deleteUsuario
);

module.exports = api;
