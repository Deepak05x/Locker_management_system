// authRoute.js
const express = require('express');
const router = express.Router();
const { login, signup, LogOut } = require('../controllers/authController.js');


router.post('/login', login);
router.post('/signup', signup);
router.get('/LogOut', LogOut);

module.exports = router;