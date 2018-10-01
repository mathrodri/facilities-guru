// exporta o controller das ordens
module.exports = (app) => {
    return {
        // define o metodo index das ordens
        index: (req, res) => {
            // define as informações da página ordem
            const data = {
                title: 'Ordens - ' + app.global.variables.siteName,
                page: 'ordem'
            };
            // renderiza a página ordem
            res.render('base', {data: data});
        }
    };
};