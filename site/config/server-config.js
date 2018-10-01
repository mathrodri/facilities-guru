// importa os modulos do express e consign
const express = require('express')
    , consign = require('consign');

// cria um servidor express
const app = express();

// seta algunas configurações do servidos
app.set('views', './app/views'); // seta a pasta de views
app.set('view engine', 'ejs'); // seta a view engine
app.use(express.static('./app/public')); // seta a pasta de arquivos estáticos

// carrea todos os arquivos
consign()
    .include('./global') // inclui os modulo globais
    .then('./controllers') // inclui os controllers
    .then('./models') // inclui o models
    .then('./routes') // inclui as rotas
    .into(app); // insere dentro do objeto app

// exporta o servidor configurado
module.exports = app;