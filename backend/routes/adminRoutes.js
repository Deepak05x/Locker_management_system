const express = require('express');
const router = express.Router();
const {addStaff,addLocker,addMultipleLocker} = require('../controllers/adminControllers.js');




router.post('/addStaff', addStaff);
router.post('/addSingleLocker', addLocker);
router.post('/addMultipleLocker', addMultipleLocker);


module.exports = router;