const express = require('express');
const db = require('../models/db');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const usuarios = await db.Usuario.find();
    return res.json(usuarios);
  } catch (e) {
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    await db.Usuario.create({
      nome: req.body.nome,
      senha: req.body.senha
    });
    return res.status(201).send('ok');
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const usuario = await db.Usuario.findById(req.params.id);
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
    const usuario = await db.Usuario.findById(req.params.id).populate('grupos');
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
    const usuario = await db.Usuario.findOneAndUpdate({ _id: req.params.id }, {
      nome: req.body.nome
    });
    if (!usuario) {
      return res.status(404).send('não encontrado');
    }
    return res.send('ok');
  } catch (e) {
    next(e);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    // TODO: Remover usuário dos grupos?
    const usuario = await db.Usuario.findOneAndDelete({ _id: req.params.id });
    if (!usuario) {
      return res.status(404).send('não encontrado');
    }
    return res.send('ok');
  } catch (e) {
    next(e);
  }
});

module.exports = router;
