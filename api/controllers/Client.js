module.exports = (app) => {
    return {
        all: (req, res) => {
            const client = app.models.ClientModel;

            client.find((err, data) => {
                if(err) {
                    res.json({success: false, message: 'Houve algum erro na requisição dos clientes'});
                } else {
                    res.json({sucess: true, data: data});
                }
            });
        },

        new: (req, res) => {
            const client = new app.models.ClientModel({
                name: req.body.client
            });

            client.save((err) => {
                if(err) {
                    res.json({success: false, message: 'Houve algum erro no cadastro do cliente'});
                } else {
                    res.json({sucess: true, message: 'Cliente salvo com sucesso'});
                }
            });
        }
    }
};