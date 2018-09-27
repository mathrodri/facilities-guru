// importa o módulo do mongoose (driver do mongodb)
const mongoose = require('mongoose');

// cria um novo schema das ordens
const orderSchema = new mongoose.Schema({
    // define os campos que existiram na coleção das ordens
    client: {type: String, required: true},
    facility: {type: String, required: true},
    product: {type: String, required: true}
}, {collection: 'orders'}); // define o nome da coleção que será utilizado

// exporta o módulo do model das ordens
module.exports = () => {
    return mongoose.model('order', orderSchema);
};