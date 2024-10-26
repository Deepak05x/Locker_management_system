const User = require('../models/userModel.js')
const OTP = require('../models/OTP.js')
const Locker = require('../models/lockerModel.js')
const mailSender = require('../utils/mailSender.js')

exports.getAvailableLocker = async (req, res, next) => {
    try {
        const { lockerType, employeeGender } = req.body;

      
        if (!lockerType || !employeeGender) {
            return res.status(400).json({ message: "lockerType and employeeGender are required" });
        }

        const locker = await Locker.findOne({
            LockerStatus: "available",
            LockerType: lockerType,
            availableForGender: employeeGender
        });

         if (!locker) {
            // console.log("not found")
            return res.status(404).json({ message: "No available locker found matching the criteria." });
        }

       return res.status(200).json({
            message: "Available locker found",
            data: locker
        });
        
    } catch (err) {
        console.log(`Error in getting Available Locker: ${err.message}`);
        next(err);
    }
};



exports.allocateLocker = async (req, res, next) => {
    try {
        const { lockerNumber,lockerType, lockerCode, employeeName, employeeId, employeeEmail, employeePhone, employeeGender, costToEmployee, duration, startDate, endDate } = req.body;
        // console.log( lockerNumber,lockerType, lockerCode, employeeName, employeeId, employeeEmail, employeePhone, employeeGender, costToEmployee, duration, startDate, endDate )
        
        if (!lockerNumber) {

            return res.status(400).json({ message: "lockerNumber is required" });
        }

        
        const locker = await Locker.findOne({
            LockerNumber:lockerNumber,
            LockerStatus: "available"
        });

        
        if (!locker) {
            return res.status(404).json({ message: "Locker is not available or does not exist" });
        }
       


        let expiresOn;
        if (duration === "6") {
            // Set expiresOn to 6 months from the current date
            const sixMonthsFromNow = new Date();
            sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
            expiresOn = sixMonthsFromNow;
        }else if (duration === "12") {
            // Set expiresOn to 12 months from the current date
            const twelveMonthsFromNow = new Date();
            twelveMonthsFromNow.setMonth(twelveMonthsFromNow.getMonth() + 12);
            expiresOn = twelveMonthsFromNow;
        }  else if (endDate) {
            // Set expiresOn to provided endDate
            expiresOn = new Date(endDate);
        }

        // LockerType,LockerStatus,LockerNumber,LockerCode,
        locker.LockerCode = lockerCode;
        locker.LockerType = lockerType;
        locker.employeeName = employeeName;
        locker.employeeId = employeeId;
        locker.employeeEmail = employeeEmail;
        locker.employeePhone = employeePhone;
        locker.employeeGender = employeeGender;
        locker.CostToEmployee = costToEmployee;
        locker.Duration = duration;
        locker.StartDate = startDate;
        locker.EndDate = endDate;
        locker.LockerStatus = "occupied";

        locker.expiresOn = expiresOn;
//         // employeeName,employeeId,employeeEmail,employeePhone,employeeGender,CostToEmployee,Duration,StartDate,EndDate
     
        await locker.save();
        const email=employeeEmail;
        await mailSender(
            email,
            "Locker Assignment",
            `Congratulations you have been successfully assigned the locker number  ${lockerNumber}`
        );

        return res.status(200).json({
            message: "Locker allocated successfully",
            data: locker
        });
        
    } catch (err) {
        console.log(`Error in allocating locker: ${err.message}`);
        next(err);
    }
};



exports.renewLocker = async (req, res, next) => {
    try {
        const { lockerNumber,  costToEmployee, duration, startDate, endDate,EmployeeEmail } = req.body;
        // console.log( lockerNumber,lockerType, lockerCode, employeeName, employeeId, employeeEmail, employeePhone, employeeGender, costToEmployee, duration, startDate, endDate )
        
        if (!lockerNumber || !EmployeeEmail) {

            return res.status(400).json({ message: "lockerNumber is required" });
        }

        const email=EmployeeEmail;
        const locker = await Locker.findOne({
            LockerNumber:lockerNumber
        });

        if (!locker) {
            return res.status(404).json({ message: "Locker is not available or does not exist" });
        }

        let expiresOn;
        if (duration === "6") {
            // Set expiresOn to 6 months from the current date
            const sixMonthsFromNow = new Date();
            sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
            expiresOn = sixMonthsFromNow;
        }else if (duration === "12") {
            // Set expiresOn to 12 months from the current date
            const twelveMonthsFromNow = new Date();
            twelveMonthsFromNow.setMonth(twelveMonthsFromNow.getMonth() + 12);
            expiresOn = twelveMonthsFromNow;
        }  else if (endDate) {
            // Set expiresOn to provided endDate
            expiresOn = new Date(endDate);
        }

        locker.CostToEmployee = costToEmployee;
        locker.Duration = duration;
        locker.StartDate = startDate;
        locker.EndDate = endDate;
        locker.LockerStatus = "occupied";

        locker.expiresOn = expiresOn;
        //         // employeeName,employeeId,employeeEmail,employeePhone,employeeGender,CostToEmployee,Duration,StartDate,EndDate
     
        await locker.save();

        await mailSender(
            email,
            "Locker Renewal",
            `Congratulations your  locker with locker number  ${lockerNumber} has been successfully renewed`
        );
        return res.status(200).json({
            message: "Locker Renewed successfully",
            data: locker
        });
        
    } catch (err) {
        console.log(`Error in allocating locker: ${err.message}`);
        next(err);
    }
};


exports.cancelLockerAllocation = async (req, res, next) => {
    try {
        const { lockerNumber,EmployeeEmail} = req.body;
        // console.log( lockerNumber,lockerType, lockerCode, employeeName, employeeId, employeeEmail, employeePhone, employeeGender, costToEmployee, duration, startDate, endDate )
        console.log(lockerNumber,EmployeeEmail)
        if (!lockerNumber || !EmployeeEmail) {
            return res.status(400).json({ message: "lockerNumber is required" });
        }

        const email= EmployeeEmail;
        const locker = await Locker.findOne({
            LockerNumber:lockerNumber,
        });

        
        if (!locker) {
            return res.status(404).json({ message: "Locker is not available or does not exist" });
        }
       


       
        // LockerType,LockerStatus,LockerNumber,LockerCode,
        locker.employeeName = "";
        locker.employeeId = "";
        locker.employeeEmail = "";
        locker.employeePhone = "";
        locker.employeeGender = "None";
        locker.CostToEmployee = "";
        locker.Duration = "";
        locker.StartDate = "";
        locker.EndDate = "";
        locker.LockerStatus = "available";

        locker.expiresOn = "";

        await locker.save();

        await mailSender(
            email,
            "Locker Taken Back",
            `Alert your locker with locker number  ${lockerNumber} is taken back `
        );

        return res.status(200).json({
            message: "Locker taken back successfully",
            data: locker
        });
        
    } catch (err) {
        console.log(`Error in allocating locker: ${err.message}`);
        next(err);
    }
};