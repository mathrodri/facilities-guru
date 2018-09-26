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

// consign é um pacote responsável por carregar todos os arquivos definidos automaticamente
consign()
    .include('./controllers') // importa todos os arquivos da pasta controller
    .then('./models') // depois importa todos os arquivos da pasta models
    .then('./routes') // depois importa todos os arquivos da pasta routes
    .into(app); // e por final adiciona os módulos importados de todos os arquivos em um objeto 'app' instanciado como servidor

// exporta o módulo do servidor express já configurado
module.exports = app;