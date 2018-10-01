// exporta as rotas do site
module.exports = (app) => {
    // define o método get para a raiz
    app.get('/', app.controllers.Home.index);
    // define o método get para a página ordem
    app.get('/ordem', app.controllers.Ordem.index);
    // define o método get para a página armazem
    app.get('/armazem', app.controllers.Armazem.index);
};