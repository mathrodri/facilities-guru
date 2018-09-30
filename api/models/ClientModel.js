// requere o modulo do mongoose
const mongoose = require('mongoose');

// define o schema do client
const clientSchema = new mongoose.Schema({
    name: {type: String, required: true},
    facilities: [{type: mongoose.Schema.Types.ObjectId, ref: 'facility'}]
});

// exporta o modulo do client
module.exports = () => {
    return mongoose.model('client', clientSchema);
};