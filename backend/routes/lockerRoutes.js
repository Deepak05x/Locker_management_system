// authRoute.js
const express = require('express');
const router = express.Router();
const {getAvailableLocker,allocateLocker,renewLocker,cancelLockerAllocation} = require('../controllers/lockerController.js');


router.post('/getAvailableLocker', getAvailableLocker);
router.post('/allocateLocker', allocateLocker);
router.post('/renewLocker', renewLocker);
router.post('/cancelLockerAllocation', cancelLockerAllocation);

module.exports = router;


