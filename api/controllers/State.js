module.exports = (app) => {
    return {
        all: (req, res) => {
            const state = app.models.StateModel;

            state.find((err, data) => {
                if(err) {
                    res.json({success: false, message: 'Houve algum erro na requisição dos estados'});
                } else {
                    res.json({sucess: true, data: data});
                }
            });
        }
    }
};