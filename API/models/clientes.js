const mongoose = require("mongoose");

const ClientesSchema = mongoose.Schema({
  origen: {
    usuario: String,
    fechacrea: Date,
  },
  generales: {
    tipocliente: String,
    tipoidentificacion: String,
    nuemeroidentificacion: String,
    nombre: String,
    tipopersona: String,
    responsabilidad: String,
    municipio: String,
    Direccion: String,
    codigopostal: String,
  },
  contacto: {
    correo: String,
    correo2: String,
    telefono: String,
    telefono2: String,
    movil: String,
  },
  comercial: {
    plazopago: String,
    listaprecios: String,
    vendedor: String,
  },
  obligacionestributarias: {
    simple: Boolean,
    grancontribuyente: Boolean,
    autorretenedor: Boolean,
    agenteretencionventas: Boolean,
  },
  contabilidad: {
    cxc: String,
    cxp: String,
  },
});

module.exports = mongoose.model("Clientes", ClientesSchema);
