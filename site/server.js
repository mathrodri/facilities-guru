// importa o modulo http e as configurações do servidor
const app = require('./config/server-config')
    , http = require('http');

// define a porta do servidor
const port = process.env.PORT || 4000;

// cria um novo servidor
const server = http.createServer(app);

// abre a porta do servidor
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});