// exporta o módulo das rotas
module.exports = (app) => {
    // define o método get para a rota /api/order
    app.get('/api/order', app.controllers.Order.all);
    // define o método post para a rota /api/order
    app.post('/api/order', app.controllers.Order.new);
    // definide o método get para a rota /api/facility
    app.get('/api/facility', app.controllers.Facility.all);
    app.post('/api/facility', app.controllers.Facility.new);
    
    app.get('/api/client', app.controllers.Client.all);
    app.post('/api/client', app.controllers.Client.new);

    app.get('/api/state', app.controllers.State.all);
};