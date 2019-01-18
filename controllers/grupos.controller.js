const express = require('express');
const db = require('../models/db');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const grupos = await db.Grupo.find();
    return res.json(grupos);
  }
  catch (e) {
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    if (req.body.usuarios.length < 2) {
      return res.status(400).send('grupo deve ser criado com pelo menos 2 usuários');
    }
    const usuarios = await db.Usuario.find({ _id: req.body.usuarios });
    if (usuarios.length !== req.body.usuarios.length) {
      return res.status(404).send('usuário(s) não encontrado(s)');
    }
    const grupo = await db.Grupo.create({
      nome: req.body.nome,
      usuarios: req.body.usuarios
    });
    console.log(grupo);

    await db.Usuario.updateMany({ _id: req.body.usuarios }, { 'grupos': { $push: grupo._id } });
    return res.status(201).send('ok');
  }
  catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const grupo = await db.Grupo.findById(req.params.id);
    return res.json(grupo);
  }
  catch (e) {
    next(e);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    if (req.body.usuarios.length < 1) {
      return res.status(400).send('grupo não pode ficar com menos de um usuário');
    }
    const usuarios = await db.Usuario.find({ _id: req.body.usuarios });
    if (usuarios.length !== req.body.usuarios.length) {
      return res.status(404).send('usuário(s) não encontrado(s)');
    }
    await db.Grupo.findOneAndUpdate({ _id: req.params.id }, {
      nome: req.body.nome,
      usuarios: req.body.usuarios
    });
    return res.send('ok');
  }
  catch (e) {
    next(e);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await db.Grupo.findOneAndDelete({ _id: req.params.id });
    return res.send('ok');
  }
  catch (e) {
    next(e);
  }
});

router.get('/:id/usuarios', async (req, res, next) => {
  try {
    const grupo = await db.Grupo.findById(req.params.id).populate('usuarios');
    return res.json(grupo.usuarios);
  }
  catch (e) {
    next(e);
  }
});

router.post('/:id/usuarios', async (req, res, next) => {
  try {
    const grupo = await db.Grupo.findById(req.params.id);
    if (!grupo) {
      return res.status(404).send('Grupo não encontrado');
    }
    const usuario = await db.Usuario.findById(req.body.idUsuario);
    if (!usuario) {
      return res.status(404).send('Usuário não encontrado');
    }
    usuario.grupo.push(req.params.id);
    grupo.usuarios.push(req.body.idUsuario);
    await db.save();
    return res.send('ok');
  }
  catch (e) {
    next(e);
  }
});

router.delete('/:id/usuarios/:idUsuario', async (req, res, next) => {
  try {
    const grupo = await db.Grupo.findById(req.params.id);
    if (!grupo) {
      return res.status(404).send('Grupo não encontrado');
    } else if (grupo.usuarios.indexOf(req.params.idUsuario) < 0) {
      return res.status(404).send('Usuário não encontrado');
    }
    grupo.usuarios.remove(req.params.idUsuario);
    await db.save();
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
