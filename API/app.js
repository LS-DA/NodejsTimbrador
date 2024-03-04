/*const express = require("express");
const { API_VERSION } = require("./constants");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();

//import routing
const authRoutes = require("./router/auth");
const usuariosRouter = require("./router/usuarios");
const menuRouter = require("./router/menu");
const clientesRouter = require("./router/clientes");
const facturahistoricoRouter = require("./router/facturahistorico");

//configura Body Parse
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//configuracion de carpetas estaticas
//app.use(express.static("./uploads"));
app.use(express.static(path.join(__dirname, "./uploads")));

//Configura Header HTTP - CORS
app.use(cors());

//Configura routing




app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, usuariosRouter);
app.use(`/api/${API_VERSION}`, menuRouter);
app.use(`/api/${API_VERSION}`, clientesRouter);
app.use(`/api/${API_VERSION}`, facturahistoricoRouter);

module.exports = app;*/

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet"); // Para seguridad
const morgan = require("morgan"); // Para logging

const { API_VERSION } = require("./constants");

// Import routing
const authRoutes = require("./router/auth");
const usuariosRouter = require("./router/usuarios");
const menuRouter = require("./router/menu");
const clientesRouter = require("./router/clientes");
const facturahistoricoRouter = require("./router/facturahistorico");

const app = express();

// Usar Helmet para mejorar la seguridad
app.use(helmet());

// Middleware de logging
app.use(morgan("combined"));

// Configura Body Parse con limitación de tamaño
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

// Configuración de carpetas estáticas
app.use(express.static(path.join(__dirname, "./uploads")));

// Configura Header HTTP - CORS de manera más restrictiva (ajusta según tus necesidades)
app.use(cors());

// Configura routing
app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, usuariosRouter);
app.use(`/api/${API_VERSION}`, menuRouter);
app.use(`/api/${API_VERSION}`, clientesRouter);
app.use(`/api/${API_VERSION}`, facturahistoricoRouter);

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("¡Algo salió mal!");
});

module.exports = app;
