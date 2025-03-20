const {model, Schema} = require('mongoose');


const contactSchema = new Schema({
    firstName:
    {
        type: String,
        required: true,
    },
    lastName:
    {
        type: String,
        required: true,
    },
    email:
    {
        type: String,
        required: true,
    },
    description:
    {
        type: String,
        required: true,
    }
});


const contactModel = model('Contact', contactSchema);
module.exports = contactModel;
