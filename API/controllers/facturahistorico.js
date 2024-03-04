const Facturahistorico = require("../models/facturahistorico");

async function crearFactura(req, res) {
  const factura = new Facturahistorico(req.body);

  factura.save((error, facturaStored) => {
    if (error) {
      res.status(400).send({ msg: "Error al registra la factura" });
    } else {
      res.status(200).send(facturaStored);
    }
  });
}

async function getFactura(req, res) {
  const { resolucion, prefijo, folio, nitemisor } = req.query;

  // Crea un objeto vacío para la consulta
  let query = {};

  // Si se provee una resolución, añádela al objeto de consulta
  if (resolucion !== undefined) {
    query.resolucion = resolucion;
  }

  // Si se provee un prefijo, añádelo al objeto de consulta
  if (prefijo !== undefined) {
    query.prefijo = prefijo;
  }

  // Si se provee un folio, añádelo al objeto de consulta
  if (folio !== undefined) {
    query.folio = folio;
  }

  // Si se provee un nitemisor, añádelo al objeto de consulta
  if (nitemisor !== undefined) {
    query.nitemisor = nitemisor;
  }

  // Si el objeto de consulta está vacío, no hacer la búsqueda
  if (Object.keys(query).length === 0) {
    return res
      .status(400)
      .send({ message: "Se requiere al menos un parámetro para la consulta" });
  }

  // Realiza la consulta con el objeto construido
  const response = await Facturahistorico.find(query);

  return res.status(200).send(response);
}

module.exports = {
  crearFactura,
  getFactura,
};
