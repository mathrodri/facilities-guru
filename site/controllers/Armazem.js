// exporta o controller do armazem
module.exports = (app) => {
    return {
        // define o método index pro armazem
        index: (req, res) => {
            // insere as informações da pagina de armazem
            const data = {
                title: 'Armazens - ' + app.global.variables.siteName,
                page: 'armazem'
            };
            // renderiza a página
            res.render('base', {data: data});
        }
    }
};