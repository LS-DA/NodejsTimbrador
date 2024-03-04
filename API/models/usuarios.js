const mongoose = require("mongoose");

const UsuariosSchema = mongoose.Schema({
  nombre: String,
  apellido: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  role: String,
  active: Boolean,
  imagen: String,
});

module.exports = mongoose.model("Usuarios", UsuariosSchema);
