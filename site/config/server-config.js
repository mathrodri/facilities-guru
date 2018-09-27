const express = require('express')
    , consign = require('consign');

const app = express();

app.set('views', './app/views');
app.set('view engine', 'ejs');
app.use(express.static('./app/public'));

consign()
    .include('./controllers')
    .then('./models')
    .then('./routes')
    .into(app);

module.exports = app;