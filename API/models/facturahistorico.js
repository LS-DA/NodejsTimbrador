const mongoose = require("mongoose");

const FacturahistoricoSchema = mongoose.Schema({
  nitemisor: String,
  nitreceptor: String,
  resolucion: String,
  prefijo: String,
  folio: Number,
  fecha: String,
  cufe: String,
  subtotal: { type: mongoose.Schema.Types.Decimal128 },
  total: { type: mongoose.Schema.Types.Decimal128 },
  idinterno: String,
  respuesta: String,
  tipodocuemnto: String,
  fechacrea: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Facturahistorico", FacturahistoricoSchema);
