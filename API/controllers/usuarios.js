const Usuarios = require("../models/usuarios");
const bcrypt = require("bcryptjs");
const manejoArchivos = require("../utils/archivos");

async function getMe(req, res) {
  const { user_id } = req.user;

  const response = await Usuarios.findById(user_id);

  if (!response) {
    res.status(400).send({ msg: "Usuario incorrecto" });
  } else {
    res.status(200).send(response);
  }
}

async function getUsuarios(req, res) {
  const { active } = req.query;

  console.log(active);

  let response = null;

  if (active == undefined) {
    response = await Usuarios.find();
  } else {
    response = await Usuarios.find({ active });
  }

  res.status(200).send(response);
}

async function creaUsuario(req, res) {
  const { password } = req.body;

  const usuario = new Usuarios({
    ...req.body,
    active: false,
  });

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);

  usuario.password = hashPassword;

  if (req.files.imagen) {
    const subeArchivo = manejoArchivos.getFilePath(req.files.imagen);
    usuario.imagen = subeArchivo;
  }

  usuario.save((error, usuariosStored) => {
    if (error) {
      res.status(400).send({ msg: "Error al crear el usuario" });
    } else {
      res.status(201).send({ usuariosStored });
    }
  });
}
async function updateUsuario(req, res) {
  const { id } = req.params;
  const usuerData = req.body;

  console.log(id);

  console.log(usuerData);
  //Password
  if (usuerData.password) {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(usuerData.password, salt);
    usuerData.password = hashPassword;
  } else {
    delete usuerData.password;
  }

  //Imagen
  if (req.files.imagen) {
    const subeArchivo = manejoArchivos.getFilePath(req.files.imagen);
    usuerData.imagen = subeArchivo;
  }

  Usuarios.findByIdAndUpdate({ _id: id }, usuerData, (error) => {
    if (error) {
      res.status(400).send({ msg: "Error al actualizar el usuario" });
    } else {
      res.status(200).send({ msg: "Actualizacion correcyta del usuario" });
    }
  });
}

async function deleteUsuario(req, res) {
  const { id } = req.params;
  Usuarios.findByIdAndDelete(id, (error) => {
    if (error) {
      res.status(400).send({ msg: "Error al eliminar el usuario" });
    } else {
      res.status(200).send({ msg: "Eliminar correcta del usuario" });
    }
  });
}

module.exports = {
  getMe,
  getUsuarios,
  creaUsuario,
  updateUsuario,
  deleteUsuario,
};
