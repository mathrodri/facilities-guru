// exporta o módulo das rotas
module.exports = (app) => {
    // define o método get para a rota /api/order
    app.get('/api/order', app.controllers.Order.all);
    // define o método post para a rota /api/order
    app.post('/api/order', app.controllers.Order.new);
    // define o método delete para a rota /api/order
    app.delete('/api/order', app.controllers.Order.remove);
    // defini o método get para a rota /api/facility
    app.get('/api/facility', app.controllers.Facility.all);
    // define o método post para a rota /api/facility
    app.post('/api/facility', app.controllers.Facility.new);
    // define o método get para a rota /api/client
    app.get('/api/client', app.controllers.Client.all);
    // define o método post para a rota /api/client
    app.post('/api/client', app.controllers.Client.new);
    // define o método get para a rota /api/state
    app.get('/api/state', app.controllers.State.all);
};