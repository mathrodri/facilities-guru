const mongoose = require('mongoose');
const client = require('./ClientModel')();

const facilitySchema = new mongoose.Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'client', required: true},
    location: {type: mongoose.Schema.Types.ObjectId, ref: 'state', required: true},
    number: {type: String, required: true}
});

facilitySchema.pre('save', async function (next) {
    let facilitiesCount = await findClient(this.number);
    this.number = facilitiesCount;
    next();
});

facilitySchema.post('save', function(data) {
    client.findOneAndUpdate({_id: data.owner}, {
        $push: {facilities: data._id}
    }, function(err, data) {
        if(err) {
            console.log(err);
        } else {
            console.log(data);
        }
    });
});

function findClient(id) {
    return new Promise((resolve, reject) => {
        client.findById(id, (err, data) => {
            if(err) {
                reject();
            } else {
                resolve(data.facilities.length);
            }
        });
    });
}

module.exports = () => {
    return mongoose.model('facility', facilitySchema);
};