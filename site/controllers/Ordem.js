module.exports = (app) => {
    return {
        index: (req, res) => {
            const data = {
                title: 'Ordens - ' + app.global.variables.siteName,
                page: 'ordem'
            };
            res.render('base', {data: data});
        }
    };
};