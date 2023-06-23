const { default: mongoose} = require('mongoose');
const moongoose = require('mongoose');

const schema= moongoose.Schema;

const CarSchema =new schema({
    name: {type: String, required: true},
    model: {type: String, required: true},
    color: {type: String, required: true},
});


module.exports = mongoose.model('Car', CarSchema);

