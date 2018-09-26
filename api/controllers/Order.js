// exporta um objeto que contem as funções de requisição da rota /api/order
module.exports = (app) => {
    return {
        // define a função all da rota /api/order que retorna todas as ordens
        all: (req, res) => {
            // requere o model das ordens
            const orders = app.models.OrderModel;
            // procura todas as ordens
            orders.find((err, data) => {
                // verifica se ocorrou um erro durante a procura das ordens
                if(err) {
                    // imprime o erro no console
                    console.log(err);
                    // manda uma mensagem de erro
                    res.json({success: false, message: 'Ouve algum problema na requisição das ordens'});
                } else {
                    // manda uma mensagem de sucesso com todas as ordens
                    res.json({success: true, data: data});
                }
            });
        },
        // define a função new da rota /api/order que insere uma nova ordem
        new: (req, res) => {
            // instancia uma nova ordem a partir do model das ordens passando os dados
            const newOrder = new app.models.OrderModel({
                client: 'Ponto Frio',
                storage: 'sp-facilitie-1',
                product: 'iPhone'
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