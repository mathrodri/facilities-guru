module.exports = (app) => {
    return {
        index: (req, res) => {
            const data = {
                title: 'Home - ' + app.global.variables.siteName,
                page: 'home'
            };
            res.render('base', {data: data});
        }
    };
};