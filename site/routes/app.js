module.exports = (app) => {
    app.get('/', app.controllers.Home.index);
};