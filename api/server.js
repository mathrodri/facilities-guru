// arquivos main da aplicação

// importando os módulos da aplicação
const app = require('./config/server-config')
    , http = require('http');

// define a porta do servidor
const port = process.env.PORT || 3000;

// cria um novo servidor com as configurações do express
const server = http.createServer(app);

// abre o servidor para escutar as requisições na porta definida
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});