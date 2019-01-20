const express = require('express');
const Usuario = require('../models/usuario.model');
const Grupo = require('../models/grupo.model');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const usuarios = await Usuario.find();
    return res.json(usuarios);
  } catch (e) {
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const usuario = await Usuario.create({
      nome: req.body.nome
    });
    return res.status(201).json(usuario);
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).send('não encontrado');
    }
    return res.json(usuario);
  } catch (e) {
    next(e);
  }
});

router.get('/:id/grupos', async (req, res, next) => {
  try {
    const usuario = await Usuario.findById(req.params.id).populate('grupos');
    if (!usuario) {
      return res.status(404).send('não encontrado');
    }
    return res.json(usuario.grupos);
  } catch (e) {
    next(e);
  }
});

router.put('/:id', async (req, res, next) => { 
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).send('não encontrado');
    }
    usuario.nome = req.body.nome;
    await usuario.save();
    return res.json(usuario);
  } catch (e) {
    next(e);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await Grupo.updateMany({ 'usuarios': req.params.id }, 
      { $pull: { usuarios: req.params.id } });
    const usuario = await Usuario.findOneAndDelete({ _id: req.params.id });
    if (!usuario) {
      return res.status(404).send('não encontrado');
    }
    return res.send('ok');
  } catch (e) {
    next(e);
  }
});

module.exports = router;
