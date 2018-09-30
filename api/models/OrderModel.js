// importa o módulo do mongoose (driver do mongodb)
const mongoose = require('mongoose');

// cria um novo schema das ordens
const orderSchema = new mongoose.Schema({
    // define os campos que existiram na coleção das ordens
    client: {type: mongoose.Schema.Types.ObjectId, ref: 'client', required: true},
    facility: {type: mongoose.Schema.Types.ObjectId, ref: 'facility', required: true},
    product: {type: String, required: true}
});

// exporta o módulo do model das ordens
module.exports = () => {
    return mongoose.model('order', orderSchema);
};