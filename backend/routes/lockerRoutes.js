const express = require('express');
const Locker = require("../models/lockerModel.js")
const router = express.Router();
const {
    getAvailableLocker,
    allocateLocker,
    renewLocker,
    cancelLockerAllocation,
    getAllLockers,
    getExpiredLockers,
    getAllocatedLockers,
    getAvailableLockers,
    getExpiringIn7daysLockers,
    changeLockerPricing,
    findLockerByUserEmail,
    updateLockerCode,
    chageLockerStatusToExpired,
    deleteLocker,
    getLockersByTypeandGender,
    getExpiringToday
}
    = require('../controllers/lockerController.js');

router.post('/getAvailableLocker', getAvailableLocker);
router.post('/allocateLocker', allocateLocker);
router.post('/renewLocker', renewLocker);
router.post('/deleteLocker', deleteLocker);
router.post('/cancelLockerAllocation', cancelLockerAllocation);
router.get('/getAllLockers', getAllLockers);


router.get('/getExpiredLockers', getExpiredLockers);
router.get('/getAllocatedLockers', getAllocatedLockers);
router.get('/getAvailableLockers', getAvailableLockers);
router.get('/getExpiringIn7daysLockers', getExpiringIn7daysLockers);
router.get('/getExpiringToday', getExpiringToday);
router.post('/changeLockerPricing', changeLockerPricing);
router.post('/findLockerByUserEmail', findLockerByUserEmail);
router.post('/updateLockerCode', updateLockerCode);
router.post('/chageLockerStatusToExpired', chageLockerStatusToExpired);
router.get('/getLockersByTypeandGender', getLockersByTypeandGender);

router.put('/updateMultipleLockerPrices', async (req, res) => {
    try {
        const { LockerPrice3Month,
            LockerPrice6Month,
            LockerPrice12Month,
            availableForGender,
            LockerType } = req.body;

        if (!availableForGender || !['male', 'female'].includes(availableForGender.toLowerCase())) {
            return res.status(400).json({ error: 'Invalid gender. Must be "male" or "female".' });
        }

        const updateData = {};
        if (LockerPrice3Month) updateData['LockerPrice3Month'] = LockerPrice3Month;
        if (LockerPrice6Month) updateData['LockerPrice6Month'] = LockerPrice6Month;
        if (LockerPrice12Month) updateData['LockerPrice12Month'] = LockerPrice12Month;

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ error: 'At least one price must be provided (3, 6, or 12 months).' });
        }

        const result = await Locker.updateMany(
            { availableForGender: availableForGender, LockerType: LockerType },
            { $set: updateData }
        );

        res.status(200).json({
            message: 'Locker prices updated successfully.',
            updatedCount: result.nModified   
        })
    } catch (error) {
        console.error('Error updating locker prices:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;