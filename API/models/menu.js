const mongoose = require("mongoose");

const MenuSchema = mongoose.Schema({
  titulo: String,
  path: String,
  order: Number,
  activo: Boolean,
});

module.exports = mongoose.model("Menu", MenuSchema);
