// exporta o controller da home
module.exports = (app) => {
    return {
        // define o método index da home
        index: (req, res) => {
            // define as informções da página home
            const data = {
                title: 'Home - ' + app.global.variables.siteName,
                page: 'home'
            };
            // renderiza a página home
            res.render('base', {data: data});
        }
    };
};