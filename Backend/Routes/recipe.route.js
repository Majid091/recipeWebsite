const express = require('express');
const router = express.Router();

const recipe = require('../Controllers/recipe.controller');

const upload = require('../middleware/multer.middleware');
const authMiddleware = require('../middleware/auth.middleware');


router.post('/create-recipe', upload.single('image'), authMiddleware, recipe.createRecipe);
router.get('/get-recipies', recipe.getRecipies);
router.get('/user-recipe', authMiddleware,recipe.userRecipe);
router.put('/update-recipe/:id', upload.single('update_image'), authMiddleware,recipe.updateRecipe);
router.delete('/delete-recipe/:id', authMiddleware,recipe.deleteRecipe);
router.get('/search-recipe', authMiddleware,recipe.userRecipe);
router.get('/get-recipe/:id', authMiddleware, recipe.getreciepeById);


module.exports = router;