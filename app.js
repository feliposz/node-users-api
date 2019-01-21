require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const controllers = require('./controllers');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

if (process.env.NODE_ENV === 'test') {
  mongoose.connect(process.env.MONGODB_TEST, { useNewUrlParser: true });
} else {
  mongoose.connect(process.env.MONGODB, { useNewUrlParser: true });
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

if (process.env.NODE_ENV === 'dev') {
  app.use(logger('dev'));
}

app.use('/', controllers);

app.use((err, req, res, next) => {
  console.log(err);
  if (err.name === 'ValidationError') {
    return res.status(400).send('Dados inválidos');
  }
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    return res.status(400).send('Identificador inválido');
  }
  return res.status(500).send('Erro interno');
});

if (require.main === module) {

  mongoose.connection.on('error', () => {
    console.error('Banco de dados indisponível');
  });

  app.listen(process.env.PORT, () => {
    console.log('Aguardando na porta ' + process.env.PORT);
  });
}

module.exports = app;
