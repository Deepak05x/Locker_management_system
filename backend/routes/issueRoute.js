const express = require('express');
const router = express.Router();

const { raiseTechnicalIssue, raiseLockerIssue, updateIssueStatus,deleteIssue, getAllIssue,getLockerIssue,getTechnicalIssue } = require('../controllers/issueController.js');
const verifyToken=require('../utils/verifyUser.js')


router.post('/raiseTechnicalIssue', raiseTechnicalIssue);
router.post('/raiseLockerIssue',verifyToken, raiseLockerIssue);
router.put('/updateIssueStatus',verifyToken, updateIssueStatus);
router.get('/getAllIssue',verifyToken, getAllIssue);
router.get('/getLockerIssue',verifyToken, getLockerIssue);
router.get('/getTechnicalIssue',verifyToken, getTechnicalIssue);
router.post('/deleteIssue', deleteIssue);

module.exports = router;