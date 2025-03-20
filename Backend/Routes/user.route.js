const express = require('express');
const router = express.Router();

const user = require('../Controllers/user.controller');
const upload = require('../middleware/multer.middleware');


router.post('/register-user', upload.single('image'), user.registerUser);
router.post('/login-user', user.loginUser);
router.get('/get-user/:id', user.getUser);


module.exports = router;