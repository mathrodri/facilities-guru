const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
    name: {type: String},
    initials: {type: String}
});

module.exports = () => {
    return mongoose.model('state', stateSchema);
};