const express = require('express');
const router = express.Router();

const nutrition = require('../Controllers/nutrition.controller');

const authMiddleware = require('../middleware/auth.middleware');



router.post('/create-nutrition/:id', authMiddleware, nutrition.createNutritions);
router.get('/get-recipe-nutrition/:id', authMiddleware, nutrition.getRecipeNutritions);
router.put('/update-recipe-nutrition/:id', authMiddleware, nutrition.updateRecipeNutrition);
router.delete('/delete-recipe-nutrition/:id', authMiddleware, nutrition.deleteRecipeNutrition);


module.exports = router;