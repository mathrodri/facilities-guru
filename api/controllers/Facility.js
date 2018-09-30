const mongoose = require('mongoose');

module.exports = (app) => {
    return {
        all: (req, res) => {
            const facility = app.models.FacilityModel;

            facility.find()
                .populate('owner location')
                .exec((err, data) => {
                    if(err) {
                        res.json({success: false, message: 'Ouve alguma falha na requisição das facilities', err: err});
                    } else {
                        res.json({sucess: true, data: data});
                    }
                });
        },

        new: (req, res) => {
            const facility = new app.models.FacilityModel({
                owner: mongoose.Types.ObjectId(req.body.owner),
                location: req.body.location,
                number: req.body.owner
            });

            facility.save((err) => {
                if(err) {
                    res.json({success: false, message: 'Ouve alguma falha ao cadastrar o novo armazém'});res.j
                } else {
                    res.json({success: true, message: 'Armazém salvo com successo'});
                }
            });
        }
    }
};