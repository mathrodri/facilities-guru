// exporta o módulo das rotas
module.exports = (app) => {
    // define o método get para a rota /api/order
    app.get('/api/order', app.controllers.Order.all);
    // define o método post para a rota /api/order
    app.post('/api/order', app.controllers.Order.new);
};