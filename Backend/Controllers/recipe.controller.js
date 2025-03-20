const Recipe = require('../Models/recipe.model');
const uploadOnCloudinary = require('../config/cloudinary');
const Nutrition = require("../Models/nutrition.model")



const createRecipe = async(req, res)=>{
    try
    {
        const {title, description, ingredients, cookingNotes} = req.body;
        const imagePath = req.file?.path;

        if(!title || !description || !ingredients || !cookingNotes)
        {
            return res.status(400).json({
                message: "please fill all the fields",
                error: true,
                success: false
            })  
        }



        if(!req.user)
        {
            return res.status(401).json({
                message: "Unauthorized access",
                error: true,
                success: false

            })
        }

        const uploadImage = await uploadOnCloudinary(imagePath);

        const recipe = new Recipe({
            title,
            description,
            ingredients,
            cookingNotes,
            image: uploadImage.secure_url,
            user: req.user.id,
        });

        await recipe.save();

        return res.status(202).json({
            message: "recipe is created successfully..",
            error: false,
            success: true,
            data: recipe
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


const getRecipies = async(req, res)=>{
    try
    {
        const recipies = await Recipe.find().populate("user", "username email image");
        if(!recipies)
        {
            return res.status(404).json({
                message: "no recipe is available",
                error: true,
                success: false
            })
        }



        return res.status(200).json({
            message: "all recipies are here",
            error: false,
            success: true,
            data: recipies
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


const userRecipe = async(req, res)=>{
    try
    {
        if(!req.user)
        {
            return res.status(400).json({
                message: "unauthorized access",
                error: true,
                success: false
            })
        }
        const Urecipe = await Recipe.find({user: req.user.id})

        return res.status(200).json({
            message: "User Recipies are here",
            error: false,
            success: true,
            data: Urecipe
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

const updateRecipe = async(req, res)=>{
    try
    {
        if(!req.user)
        {
            return res.status(400).json({
                message: "unauthorized access",
                error: true,
                success: false
            })
        }

        const recipe = await Recipe.findById(req.params.id);
        const {title, description, ingredients, cookingNotes} = req.body;
        const imagePath = req.file?.path;
        
        if(!recipe)
        {
            return res.status(404).json({
                message: "no recipe found",
                error: true,
                success: false
            })
        }

        if(recipe.user.toString() !== req.user.id)
        {
            return res.status(401).json({
                message: "unauthorized access",
                error: true,
                success: false
            })
        }

        const uploadImage = await uploadOnCloudinary(imagePath);

        //update fields
        recipe.title = title || recipe.title
        recipe.description = description || recipe.description
        recipe.ingredients = ingredients || recipe.ingredients
        recipe.cookingNotes = cookingNotes || recipe.cookingNotes
        if (uploadImage) {
            recipe.image = uploadImage.secure_url ; // Only update if new image was uploaded
        }

        await recipe.save();
        
        return res.status(200).json({
            message: "recipe is updated successfully...",
            error: false,
            success: true,
            data: recipe
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


const deleteRecipe = async(req, res)=>{
    try
    {
        if(!req.user)
        {
            return res.status(400).json({
                message: "unauthorized access",
                error: true,
                success: false
            })
        }

        const recipe = await Recipe.findById(req.params.id);
        if(!recipe)
        {
            return res.status(404).json({
                message: "recipe not found",
                error: true,
                success: false
            })
        }

        if(recipe.user.toString() !== req.user.id)
        {
            return res.status(401).json({
                message: "you have no access to delete it",
                error: true,
                success: false
            })
        }


        await recipe.deleteOne();

        return res.status(200).json({
            message: "recipe is deleted successfully...",
            error: false,
            success: true
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

const getreciepeById = async (req, res) => {
    try {
        const id = req.params.id;

        // Find recipe by ID
        const ReciepeData = await Recipe.findById(id).populate("user", "username image");

        if (!ReciepeData) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Recipe not found"
            });
        }

        const NutritionData = await Nutrition.find({ recipe: id });

        return res.status(200).json({
            success: true,
            error: false,
            message: "Recipe and nutrition data fetched successfully",
            data: {
                recipe: ReciepeData,
                nutrition: NutritionData
            }
        });

    } catch (error) {
        console.error("Error fetching recipe:", error);
        return res.status(500).json({
            success: false,
            error: true,
            message: "Server error, please try again later"
        });
    }
};

const searchRecipe = async(req, res)=>{
    try
    {
        const {query} = req.query;

        const recipe = await Recipe.find({
            $or: [
                {title: {$regex: query, $options: 'i'}},
                {description: {$regex: query, $options: 'i'}}
            ]
        })

        if(recipe.length === 0)
        {
            return res.status(400).json({
                message: "no recipe found",
                error: true,
                success: false
            })
        }

        return res.status(200).json({
            message: "these are the matching recipies",
            error: false,
            success: true
        })
    }
    catch(error)
    {
        res.status(500).json({
            message: error.message || "server side error",
            error: true,
            success: false
        })
    }
}


module.exports = 
    {
     createRecipe, getRecipies, userRecipe,
     updateRecipe, deleteRecipe, searchRecipe, getreciepeById
    }