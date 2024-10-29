const express = require('express');
const router = express.Router();
const { raiseTechnicalIssue, raiseLockerIssue, updateIssueStatus, getAllIssue } = require('../controllers/issueController.js');


router.post('/raiseTechnicalIssue', raiseTechnicalIssue);
router.post('/raiseLockerIssue', raiseLockerIssue);
router.put('/updateIssueStatus', updateIssueStatus);
router.get('/getAllIssue', getAllIssue);

module.exports = router;