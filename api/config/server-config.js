// arquivo de configuração da aplicação

// importação de pacotes
const express = require('express') // framework mvc do node
    , bodyParser = require('body-parser') // parseador de dados na requisição
    , consign = require('consign') // carregador de arquivos
    , mongoose = require('mongoose'); // driver do mongodb


// instanciamento de um servidor do express
const app = express();

// conecta a aplicação ao banco de dados "facilities-guru"
mongoose.connect('mongodb://localhost/facilities-guru', {useNewUrlParser: true});

// parseia dados em formato de json vindo de formulários
app.use(bodyParser.json());

// middleware que permite requisições vindas de http://localhost:4000
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:4000");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// consign é um pacote responsável por carregar todos os arquivos definidos automaticamente
consign()
    .include('./helpers') // importa todos os arquivos da pasta helpers
    .then('./models') // depois importa todos os arquivos da pasta models
    .then('./controllers') // importa todos os arquivos da pasta controller
    .then('./routes') // depois importa todos os arquivos da pasta routes
    .into(app); // e por final adiciona os módulos importados de todos os arquivos em um objeto 'app' instanciado como servidor

// exporta o módulo do servidor express já configurado
module.exports = app;