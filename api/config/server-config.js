// arquivo de configuração da aplicação

// importação de pacotes
const express = require('express')
    , consign = require('consign')
    , mongoose = require('mongoose');


// instanciamento de um servidor do express
const app = express();

// conecta a aplicação ao banco de dados "facilities-guru"
mongoose.connect('mongodb://localhost/facilities-guru', {useNewUrlParser: true});

// consign é um pacote responsável por carregar todos os arquivos definidos automaticamente
consign()
    .include('./controllers') // importa todos os arquivos da pasta controller
    .then('./models') // depois importa todos os arquivos da pasta models
    .then('./routes') // depois importa todos os arquivos da pasta routes
    .into(app); // e por final adiciona os módulos importados de todos os arquivos em um objeto 'app' instanciado como servidor

// exporta o módulo do servidor express já configurado
module.exports = app;