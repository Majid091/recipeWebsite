const {model, Schema} = require('mongoose');



const recipeSchema = new Schema({
    title:
    {
        type: String,
        required: true
    },
    image:
    {
        type: String,
        required: true
    },
    description:
    {
        type: String,
        required: true
    },
    ingredients:
    {
        type: String,
        required: true
    },
    cookingNotes:
    {
        type: String,
        required: true
    },
    user:
    {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},
{
    timestamps: true
});



const recipeModel = model('Recipe', recipeSchema);
module.exports = recipeModel;