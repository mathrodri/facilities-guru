const mongoose = require('mongoose');

const facilitySchema = new mongoose.Schema({
    facility: {type: String, required: true},
    client: {type: String, required: true}
}, {collection: 'facilities'});

module.exports = () => {
    return mongoose.model('facility', facilitySchema);
};