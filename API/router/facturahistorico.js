const express = require("express");
const FacturahistoricoController = require("../controllers/facturahistorico");

const api = express.Router();

api.post("/facturahistorico", FacturahistoricoController.crearFactura);
api.get("/facturahistorico", FacturahistoricoController.getFactura);

module.exports = api;
