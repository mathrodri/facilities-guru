module.exports = (app) => {
    return {
        all: (req, res) => {
            const facility = app.models.FacilityModel;

            facility.find((err, data) => {
                if(err) {
                    res.json({success: false, message: 'Ouve alguma falha na requisição das facilities'});
                } else {
                    res.json({sucess: true, data: data});
                }
            });
        }
    }
};