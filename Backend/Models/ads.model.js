const {model, Schema} = require('mongoose');




const adsSchema = new Schema({
    title:
    {
        type: [String, "Share Your Recipe"],
        required: true
    },
    description:
    {
        type: String
    },
    image:
    {
        type: String
    }

})


const adsModel = model('Ads', adsSchema);

module.exports = adsModel;