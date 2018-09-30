const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    name: {type: String, required: true},
    facilities: [{type: mongoose.Schema.Types.ObjectId, ref: 'facility'}]
});

module.exports = () => {
    return mongoose.model('client', clientSchema);
};