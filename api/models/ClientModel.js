// exporta o modulo do client
module.exports = (app) => {
    // requere o modulo do mongoose
    const mongoose = app.helpers.mongoose;

    // define o schema do client
    const clientSchema = new mongoose.Schema({
        name: {type: String, required: true},
        facilities: [{type: mongoose.Schema.Types.ObjectId, ref: 'facility'}]
    });
    // retorna o model do client
    return mongoose.model('client', clientSchema);
};