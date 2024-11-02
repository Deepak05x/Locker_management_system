const express = require('express');
const router = express.Router();
const { addStaff,removeStaff,editStaff,viewStaffDetails,viewAllStaff, addLocker, addMultipleLocker } = require('../controllers/adminControllers.js');

router.post('/addStaff', addStaff);
router.post('/removeStaff', removeStaff);
router.put('/editStaff', editStaff);
router.get('/viewAllStaff', viewAllStaff);
router.get('/viewStaffDetails', viewStaffDetails);
router.post('/addSingleLocker', addLocker);
router.post('/addMultipleLocker', addMultipleLocker);

module.exports = router;