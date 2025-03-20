const {model, Schema} = require('mongoose');



const nutSchema = new Schema({
    calaroies:
    {
        type: String,
        required: true
    },
    carbs:
    {
        type: String,
        required: true
    },
    fats:
    {
        type: String,
        required: true
    },
    protien:
    {
        type: String,
        required: true
    },
    sugar:
    {
        type: String,
        required: true
    },
    dietry:
    {
        type: String,
        required: true
    },
    sodium:
    {
        type: String,
        required: true
    },
    recipe:
    {
        type: Schema.Types.ObjectId,
        ref: 'Recipe'
    }
},
{
    timestamps: true
});


const nutModel = model('Nutrition', nutSchema);

module.exports = nutModel;