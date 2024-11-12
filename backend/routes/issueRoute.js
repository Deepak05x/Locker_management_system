const express = require('express');
const router = express.Router();

const { raiseTechnicalIssue, raiseLockerIssue, updateIssueStatus, getAllIssue } = require('../controllers/issueController.js');
const verifyToken=require('../utils/verifyUser.js')


router.post('/raiseTechnicalIssue', raiseTechnicalIssue);
router.post('/raiseLockerIssue',verifyToken, raiseLockerIssue);
router.put('/updateIssueStatus',verifyToken, updateIssueStatus);
router.get('/getAllIssue',verifyToken, getAllIssue);

module.exports = router;