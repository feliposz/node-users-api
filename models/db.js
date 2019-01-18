const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nome: String,
  grupos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Grupo' }]
});

const grupoSchema = new mongoose.Schema({
  nome: String,
  usuarios: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }]
});

const Usuario = mongoose.model('Usuario', usuarioSchema);
const Grupo = mongoose.model('Grupo', grupoSchema);

module.exports = { Usuario, Grupo };
