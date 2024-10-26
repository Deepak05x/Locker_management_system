// authRoute.js
const express = require('express');
const router = express.Router();
const {getAvailableLocker,
    allocateLocker,
    renewLocker,
    cancelLockerAllocation,
    getAllLockers,
getExpiredLockers,
getAllocatedLockers,
getAvailableLockers,
getExpiringIn7daysLockers,
changeLockerPricing} 
= require('../controllers/lockerController.js');

router.post('/getAvailableLocker', getAvailableLocker);
router.post('/allocateLocker', allocateLocker);
router.post('/renewLocker', renewLocker);
router.post('/cancelLockerAllocation', cancelLockerAllocation);
router.get('/getAllLockers', getAllLockers);
router.get('/getExpiredLockers', getExpiredLockers);
router.get('/getAllocatedLockers', getAllocatedLockers);
router.get('/getAvailableLockers', getAvailableLockers);
router.get('/getExpiringIn7daysLockers', getExpiringIn7daysLockers);
router.get('/changeLockerPricing', changeLockerPricing);

module.exports = router;


