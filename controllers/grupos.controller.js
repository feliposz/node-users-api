const express = require('express');
const Usuario = require('../models/usuario.model');
const Grupo = require('../models/grupo.model');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const grupos = await Grupo.find();
    return res.json(grupos);
  }
  catch (e) {
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    if (!req.body.nome) {
      return res.status(400).send('Nome é obrigatório.');
    }
    if (!req.body.usuarios || req.body.usuarios.length < 1) {
      return res.status(400).send('É obrigatório informar ao menos dois usuários para criar um grupo.');
    }
    const usuarios = await Usuario.find({ _id: req.body.usuarios });
    if (usuarios.length !== req.body.usuarios.length) {
      return res.status(404).send('usuário(s) não encontrado(s)');
    }
    const grupo = await Grupo.create({
      nome: req.body.nome,
      usuarios: req.body.usuarios
    });
    await Usuario.updateMany({ _id: { $in: req.body.usuarios } }, { $push: { 'grupos': grupo } });
    return res.status(201).json(grupo);
  }
  catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const grupo = await Grupo.findById(req.params.id);
    return res.json(grupo);
  }
  catch (e) {
    next(e);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const grupo = await Grupo.findById(req.params.id);
    if (!grupo) {
      return res.status(404).send('grupo não encontrado');
    }
    if (!req.body.usuarios || req.body.usuarios.length < 1) {
      return res.status(400).send('grupo não pode ficar com menos de um usuário');
    }
    const usuarios = await Usuario.find({ _id: req.body.usuarios });
    if (usuarios.length !== req.body.usuarios.length) {
      return res.status(404).send('usuário(s) não encontrado(s)');
    }
    grupo.nome = req.body.nome;
    grupo.usuarios = usuarios;
    await grupo.save();
    return res.json(grupo);
  }
  catch (e) {
    next(e);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    //await Grupo.findOneAndDelete({ _id: req.params.id });
    await Usuario.updateMany({ grupos: req.params.id }, { $pull: { grupos: req.params.id } });
    return res.send('ok');
  }
  catch (e) {
    next(e);
  }
});

router.get('/:id/usuarios', async (req, res, next) => {
  try {
    const grupo = await Grupo.findById(req.params.id).populate('usuarios');
    if (!grupo) {
      return res.status(404).send('Grupo não encontrado');
    }
    return res.json(grupo.usuarios);
  }
  catch (e) {
    next(e);
  }
});

router.post('/:id/usuarios', async (req, res, next) => {
  try {
    const grupo = await Grupo.findById(req.params.id);
    if (!grupo) {
      return res.status(404).send('Grupo não encontrado');
    }
    const usuario = await Usuario.findById(req.body.idUsuario);
    if (!usuario) {
      return res.status(404).send('Usuário não encontrado');
    }
    usuario.grupos.push(req.params.id);
    grupo.usuarios.push(req.body.idUsuario);
    await grupo.save();
    await usuario.save();
    return res.status(201).json(grupo.usuarios);
  }
  catch (e) {
    next(e);
  }
});

router.delete('/:id/usuarios/:idUsuario', async (req, res, next) => {
  try {
    const grupo = await Grupo.findById(req.params.id);
    if (!grupo) {
      return res.status(404).send('Grupo não encontrado');
    } else if (grupo.usuarios.indexOf(req.params.idUsuario) < 0) {
      return res.status(404).send('Usuário não encontrado');
    }
    const usuario = await Usuario.findById(req.params.idUsuario);
    if (usuario) {
      usuario.grupos.remove(req.params.id);
      await usuario.save();
    }
    grupo.usuarios.remove(req.params.idUsuario);
    await grupo.save();
    if (grupo.usuarios.length === 0) {
      await grupo.delete();
    }
    return res.send('ok');
  }
  catch (e) {
    next(e);
  }
});

module.exports = router;
