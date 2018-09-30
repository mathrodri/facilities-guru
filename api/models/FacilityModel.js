// importa o mongoose o o model do client
const mongoose = require('mongoose');
const client = require('./ClientModel')();

// define o schema da facility
const facilitySchema = new mongoose.Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'client', required: true},
    location: {type: mongoose.Schema.Types.ObjectId, ref: 'state', required: true},
    number: {type: String, required: true}
});

// define uma condição de pré salvamento para a facility
facilitySchema.pre('save', async function (next) {
    // chama a função que define o número da facility de acordo com o cliente e o estado
    let facilitiesCount = await getFacilityNumber(this.number, this.location);
    // atribui o número da facility
    this.number = facilitiesCount;
    // da andamento no salvamento
    next();
});

// define uma ação após uma facility ser salva
facilitySchema.post('save', function(data) {
    // atualiza as facilities do cliente
    client.findOneAndUpdate({_id: data.owner}, {
        $push: {facilities: data._id}
    }, function(err, data) {
        if(err) {
            console.log(err);
        }
    });
});

// função que define o número da facility de acordo com o cliente e o estado
function getFacilityNumber(id, location) {
    return new Promise((resolve, reject) => {
        // procura o cliente
        client.findOne({_id: mongoose.Types.ObjectId(id)})
            .populate('facilities')
            .exec((err, data) => {
                if(err) {
                    reject();
                } else {
                    // faz uma contagem do total de facilities que o cliente possui no estado definido
                    const totalFacilitiesLocation = data.facilities.filter((elem) => {
                        return elem.location.toString() == location.toString();
                    });
                    // retorna o número da nova facility
                    resolve(totalFacilitiesLocation.length + 1);
                }

            });
    });
}

// exporta o model das facilities
module.exports = () => {
    return mongoose.model('facility', facilitySchema);
};