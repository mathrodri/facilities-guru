// exporta o model do state
module.exports = (app) => {
    // requere o mongoose
    const mongoose = app.helpers.mongoose;

    // define o schema do state
    const stateSchema = new mongoose.Schema({
        name: {type: String},
        initials: {type: String}
    });
    // retorna o model dos states
    return mongoose.model('state', stateSchema);
};