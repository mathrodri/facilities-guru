// requere o mongoose
const mongoose = require('mongoose');

// define o schema do state
const stateSchema = new mongoose.Schema({
    name: {type: String},
    initials: {type: String}
});

// exporta o model do state
module.exports = () => {
    return mongoose.model('state', stateSchema);
};