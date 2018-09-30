// exporta os métodos do client
module.exports = (app) => {
    return {
        // define a função all
        all: (req, res) => {
            // requere o model do client
            const client = app.models.ClientModel;
            // procura todos os clients
            client.find((err, data) => {
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
            const client = new app.models.ClientModel({
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