// exporta os métodos para as facilities
module.exports = (app) => {
    // requere o mongoose
    const mongoose = app.helpers.mongoose;
    return {
        // define a função all
        all: (req, res) => {
            // requere o model das facilities
            const facility = app.models.FacilityModel;

            // procura todas as facilities
            facility.find()
                .populate('owner location') // popula as referências
                .exec((err, data) => {
                    if(err) {
                        // envia um json de falha
                        res.json({success: false, message: 'Ouve alguma falha na requisição das facilities', err: err});
                    } else {
                        // envia um json de sucesso com as facilities
                        res.json({sucess: true, data: data});
                    }
                });
        },

        // define a função
        new: (req, res) => {
            // instância uma nova facility
            const facility = new app.models.FacilityModel({
                owner: mongoose.Types.ObjectId(req.body.owner),
                location: req.body.location,
                number: req.body.owner
            });

            // salva a nova facility
            facility.save((err) => {
                if(err) {
                    // envia um json de falha
                    res.json({success: false, message: 'Ouve alguma falha ao cadastrar o novo armazém'});res.j
                } else {
                    // envia um json de sucesso
                    res.json({success: true, message: 'Armazém salvo com successo'});
                }
            });
        }
    }
};