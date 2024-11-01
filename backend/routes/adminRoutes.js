const express = require('express');
const router = express.Router();
const { addStaff,removeStaff, addLocker, addMultipleLocker } = require('../controllers/adminControllers.js');

router.post('/addStaff', addStaff);
router.post('/removeStaff', removeStaff);
router.post('/addSingleLocker', addLocker);
router.post('/addMultipleLocker', addMultipleLocker);

module.exports = router;