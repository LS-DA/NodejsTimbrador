const express = require("express");
const ClienteController = require("../controllers/clientes");

const md_auth = require("../middlewares/autenticacion");

const api = express.Router();

api.post("/clientes", [md_auth.asureAuth], ClienteController.creaCliente);
api.get("/clientes", [md_auth.asureAuth], ClienteController.getClientes);
api.get("/clientesId", [md_auth.asureAuth], ClienteController.getClientesId);

module.exports = api;
