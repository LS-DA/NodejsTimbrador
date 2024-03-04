const Clientes = require("../models/clientes");

async function creaCliente(req, res) {
  const cliente = new Clientes({
    ...req.body,
  });

  console.log(cliente);

  const fechacrea = new Date();

  cliente.origen.fechacrea = fechacrea.getTime();

  cliente.save((error, clienteStored) => {
    if (error) {
      res.status(400).send({ msg: "Error al crear el cliente" });
    } else {
      res.status(201).send({ clienteStored });
    }
  });
}

async function getClientes(req, res) {
  const { usuario } = req.query;

  console.log(usuario);
  let response = null;

  if (usuario == undefined) {
    res.status(400).send({ msg: "Error al recuperar usuarios" });
  } else {
    response = await Clientes.find({ "origen.usuario": usuario });
  }

  res.status(200).send(response);
}

async function getClientesId(req, res) {
  const { usuario, nuemeroidentificacion } = req.query;

  let response = null;

  if (!usuario || !nuemeroidentificacion) {
    res.status(400).send({ msg: "Faltan parámetros para la búsqueda" });
  } else {
    response = await Clientes.find({
      "origen.usuario": usuario,
      "generales.nuemeroidentificacion": nuemeroidentificacion,
    });
    res.status(200).send(response);
  }
}

module.exports = {
  creaCliente,
  getClientes,
  getClientesId,
};
