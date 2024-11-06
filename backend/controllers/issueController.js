const Issue = require('../models/Issue.js')
const mailSender = require('../utils/mailSender.js')

exports.raiseTechnicalIssue = async (req, res, next) => {
    try {
        const { subject, description, priority } = req.body;

        const issue = await Issue.create({ subject: subject, description: description, type: 'technical', priority })

        await issue.save();
        return res.status(200).json({ message: "technical issue raised  successfully", issue });
    } catch (err) {
        console.log(`Error in finding lockers: ${err.message}`);
        return next(err);
    }
};

exports.raiseLockerIssue = async (req, res, next) => {
    try {
        const { subject, description, LockerNumber, priority } = req.body;

        const issue = await Issue.create({ subject, description, LockerNumber, priority, type: 'locker' });

        await issue.save();
        return res.status(200).json({ message: "Locker issue raised  successfully", issue });
    } catch (err) {
        console.log(`Error in finding lockers: ${err.message}`);
        return next(err);
    }
};

exports.updateIssueStatus = async (req, res, next) => {
    try {
        const { id, status } = req.body;

        const issue = await Issue.findById(id);

        issue.status = status;
        await issue.save();
        return res.status(200).json({ message: "issue status  resolved  successfully", issue });
    } catch (err) {
        console.log(`Error in finding lockers: ${err.message}`);
        return next(err);
    }
};
exports.getAllIssue = async (req, res, next) => {
    try {
        const data = await Issue.find();
        return res.status(200).json({ message: " issues fetched successfully", data });
    } catch (err) { 
        console.log(`Error in finding lockers: ${err.message}`);
        return next(err);
    }
};