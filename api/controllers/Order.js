// exporta um objeto que contem as funções de requisição da rota /api/order
module.exports = (app) => {
    // requere o model das ordens
    const orders = app.models.OrderModel;
    return {
        // define a função all da rota /api/order que retorna todas as ordens
        all: (req, res) => {
            // procura todas as ordens
            orders.find()
                .populate([{path: 'client', select: 'name'},{path: 'facility', select: 'number location', populate: {path: 'location', select: 'initials'}}]) // popula as referencias
                .exec((err, data) => {
                    if(err) {
                        // envia um json de falha
                        res.json({success: false, message: 'Houve algum erro ao procurar as ordens'});
                    } else {
                        // envia um json de sucesso com as ordens
                        res.json({success: true, data: data});
                    }
                });
        },
        // define a função new da rota /api/order que insere uma nova ordem
        new: (req, res) => {
            // instancia uma nova ordem a partir do model das ordens passando os dados
            const newOrder = new orders({
                client: req.body.client,
                facility: req.body.facility,
                product: req.body.product
            });
            // salva a nova ordem
            newOrder.save((err) => {
                // verifica se ocorrou algum erro durante o salvamento da nova ordem
                if(err) {
                    // imprime no console o erro
                    console.log(err);
                    // manda uma mensagem de erro
                    res.json({success: false, message: 'Ouve algum problema na inserção da ordem'});
                } else {
                    // manda uma mensagem de sucesso se conseguir salvar a nova ordem
                    res.json({success: true, message: 'Ordem salva com sucesso'});
                }
            });
        }
    };
};