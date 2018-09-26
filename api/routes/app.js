module.exports = (app) => {
    app.get('/api/order', app.controllers.Order.all);
    app.post('/api/order', app.controllers.Order.new);
};