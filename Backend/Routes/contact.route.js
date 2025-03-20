const express = require('express');
const router = express.Router();

const Contact = require('../Controllers/contactUs.controller');


router.post('/upload-contact-data', Contact.createContact);
router.get('/get-contact-data', Contact.getContactData);


module.exports = router;