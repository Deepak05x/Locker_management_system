// authRoute.js
const express = require('express');
const router = express.Router();
const { viewProfile,updateProfile } = require('../controllers/profileController.js');


router.post('/viewProfile', viewProfile);
router.post('/updateProfile', updateProfile);

module.exports = router;       