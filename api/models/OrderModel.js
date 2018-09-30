// exporta o módulo do model das ordens
module.exports = (app) => {
    // requere o mongoose
    const mongoose = app.helpers.mongoose;
    // cria um novo schema das ordens
    const orderSchema = new mongoose.Schema({
        // define os campos que existirão na coleção das ordens
        client: {type: mongoose.Schema.Types.ObjectId, ref: 'client', required: true},
        facility: {type: mongoose.Schema.Types.ObjectId, ref: 'facility', required: true},
        product: {type: String, required: true}
    });
    // retorna o model das ordens
    return mongoose.model('order', orderSchema);
};