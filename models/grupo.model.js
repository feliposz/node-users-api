const mongoose = require('mongoose');

const grupoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  usuarios: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }]
});

const Grupo = mongoose.model('Grupo', grupoSchema);

module.exports = Grupo;
