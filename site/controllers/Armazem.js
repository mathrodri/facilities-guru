module.exports = (app) => {
    return {
        index: (req, res) => {
            const data = {
                title: 'Armazens - ' + app.global.variables.siteName,
                page: 'armazem'
            };
            res.render('base', {data: data});
        }
    }
};