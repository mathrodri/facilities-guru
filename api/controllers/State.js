// exporta os métodos para o state
module.exports = (app) => {
    // requere o model dos states
    const state = app.models.StateModel;
    return {
        // define a função all
        all: (req, res) => {
            // procura todos os states
            state.find((err, data) => {
                if(err) {
                    // envia um json de falha
                    res.json({success: false, message: 'Houve algum erro na requisição dos estados'});
                } else {
                    // envia um json de sucesso com os states
                    res.json({sucess: true, data: data});
                }
            });
        }
    }
};