const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  grupos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Grupo' }]
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
