const express = require('express');
const usuariosController = require('./usuarios.controller');
const gruposController = require('./grupos.controller');
const router = express.Router();

router.use('/usuarios', usuariosController);
router.use('/grupos', gruposController);

module.exports = router;
