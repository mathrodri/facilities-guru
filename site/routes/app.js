module.exports = (app) => {
    app.get('/', app.controllers.Home.index);
    app.get('/ordem', app.controllers.Ordem.index);
};