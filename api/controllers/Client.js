// exporta os métodos do client
module.exports = (app) => {
    // requere o model do client
    const client = app.models.ClientModel;
    return {
        // define a função all
        all: (req, res) => {
            
            // procura todos os clients
            client.find()
                .populate({path: 'facilities', select: 'number', populate: {path: 'location', select: 'initials'}}) // popula as referencias
                .exec((err, data) => {
                    if(err) {
                        // envia um json de falha
                        res.json({success: false, message: 'Houve algum erro na requisição dos clientes'});
                    } else {
                        // envia um json de sucesso com os clients
                        res.json({sucess: true, data: data});
                    }
                });
        },
        // define a funcao new
        new: (req, res) => {
            // instancia um novo client
            const client = new client({
                name: req.body.client
            });
            // salva o novo client
            client.save((err) => {
                if(err) {
                    // envia um json de falha
                    res.json({success: false, message: 'Houve algum erro no cadastro do cliente'});
                } else {
                    // envia um json de sucesso
                    res.json({sucess: true, message: 'Cliente salvo com sucesso'});
                }
            });
        }
    }
};