module.exports = (app) => {
    return {
        all: (req, res) => {
            res.json({order: 12, client: 'ponto frio', storage: 'sp-facilitie-1'});
        },
        new: (req, res) => {
            res.json({success: true, text: 'Ordem registrada com sucesso'});
        }
    };
};