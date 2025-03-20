const Nutrition = require('../Models/nutrition.model');
const Recipe = require('../Models/recipe.model');



const createNutritions = async(req, res)=>{
    try
    {
        const {id : recipeId} = req.params
        const {calaroies, carbs, fats, protien, sugar, dietry, sodium} = req.body;
        //console.log("Received Recipe ID:", recipeId);

        const recipe = await Recipe.findById(recipeId);
        if(!recipe)
        {
            return res.status(404).json({
                message: "recipe is not found",
                error: true,
                success: false
            })
        }

        if(recipe.user.toString() !== req.user.id)
        {
            return res.status(403).json({
                message: "unauthorized access",
                error: true,
                successs: false
            })
        }

        const nutrition = new Nutrition({
            calaroies,
            carbs,
            fats,
            protien,
            sugar,
            dietry,
            sodium,
            recipe: recipeId
        });

        await nutrition.save();

        return res.status(201).json({
            message: `Nutritions for the recipe: ${recipe} are uploaded`,
            error: false,
            success: true,
            data: nutrition
        })
        
    }
    catch(error)
    {
        res.status(500).json({
            message: error.message,
            error: true,
            success: false
        })
    }
}


const getRecipeNutritions = async(req, res)=>{
    try
    {
        const {id : recipeId} = req.params;
        const recipe = await Recipe.findById(recipeId);
        if(!recipe)
        {
            return res.status(404).json({
                message: "recipe is not found",
                error: true,
                success: false
            })
        }

        const nutrition = await Nutrition.findOne({recipe: recipeId})
        if(!nutrition)
        {
            return res.status(404).json({
                message: "no nutritions are found for the recipe",
                error: true,
                success: false,
            })
        }

        return res.status(200).json({
            message: `Nutritions for the recipe ${recipe}`,
            error: false,
            success: true,
            data: nutrition
        })
    }
    catch(error)
    {
        res.status(500).json({
            message: error.message,
            error: true,
            success: false
        })
    }
}


const updateRecipeNutrition = async(req, res)=>{
    try
    {
        const {id : recipeId} = req.params;
        const {calaroies, carbs, fats, protien, sugar, dietry, sodium} = req.body;

        const recipe = await Recipe.findById(recipeId);
        if(!recipe)
        {
            return res.status(404).json({
                message: "no recipe is found",
                error: true,
                success: false
            })
        }

        const nutrition = await Nutrition.findOne({recipe: recipeId});
        if(!nutrition)
        {
            return res.status(404).json({
                message: "no nutrition is found for the recipe",
                error: true,
                success: false
            })
        }

        //update nutrition
        nutrition.calaroies = calaroies || nutrition.calaroies;
        nutrition.carbs = carbs || nutrition.carbs;
        nutrition.fats = fats || nutrition.fats;
        nutrition.protien = protien || nutrition.protien;
        nutrition.sugar = sugar || nutrition.sugar;
        nutrition.dietry = dietry || nutrition.dietry;
        nutrition.sodium = sodium || nutrition.sodium;

        await nutrition.save();

        return res.status(200).json({
            message: `Nutritions for the recipe ${recipe} is updated successfully...`,
            error: false,
            success: true,
            data: nutrition
        })

    }
    catch(error)
    {
        res.status(500).json({
            message: error.message,
            error: true,
            success: false
        })
    }
}

const deleteRecipeNutrition = async(req, res)=>{
    try
    {
        const {id : recipeId} = req.params;
        const recipe = await Recipe.findById(recipeId)
        if(!recipe)
        {
            return res.status(404).json({
                message: "no recipe found",
                error: true,
                success: false
            })
        }

        const nutrition = await Nutrition.findOneAndDelete({recipe: recipeId});
        if(!nutrition)
        {
            return res.status(404).json({
                message: "Nutritions are not found for the recipe",
                error: true,
                success: false
            })
        }

        return res.status(200).json({
            message: "Nutrition was deleted successfully....",
            error: false,
            success: true,
        })


    }
    catch(error)
    {
        res.status(500).json({
            message: error.message,
            error: true,
            success: false
        })
    }
}


module.exports = 
{
    createNutritions, getRecipeNutritions,
    updateRecipeNutrition, deleteRecipeNutrition
}