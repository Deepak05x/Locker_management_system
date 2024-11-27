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


function convertToIST(date) {
    // Adjust the date for IST (UTC + 5:30)
    const istOffset = 5.5 * 60 * 60 * 1000; // 5 hours 30 minutes in milliseconds
    return new Date(date.getTime() + istOffset);
}


exports.allocateLocker = async (req, res, next) => {
    try {
        const { lockerNumber, lockerType, lockerCode, employeeName, employeeId, employeeEmail, employeePhone, employeeGender, costToEmployee, duration, startDate, endDate } = req.body;
        // console.log( lockerNumber,lockerType, lockerCode, employeeName, employeeId, employeeEmail, employeePhone, employeeGender, costToEmployee, duration, startDate, endDate )

        if (!lockerNumber) {
            return res.status(400).json({ message: "lockerNumber is required" });
        }

        const locker = await Locker.findOne({
            LockerNumber: lockerNumber,
            LockerStatus: "available"
        });

        if (!locker) {
            return res.status(404).json({ message: "Locker is not available or does not exist" });
        }

        let expiresOn;
        if (duration === "3") {
            // Set expiresOn to 3 months from the current date
            const threeMonthsFromNow = new Date();
            threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);
            expiresOn = convertToIST(threeMonthsFromNow); // Convert to IST
        }
        else if (duration === "6") {
            // Set expiresOn to 6 months from the current date
            const sixMonthsFromNow = new Date();
            sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
            expiresOn = convertToIST(sixMonthsFromNow); // Convert to IST
        } else if (duration === "12") {
            // Set expiresOn to 12 months from the current date
            const twelveMonthsFromNow = new Date();
            twelveMonthsFromNow.setMonth(twelveMonthsFromNow.getMonth() + 12);
            expiresOn = convertToIST(twelveMonthsFromNow); // Convert to IST
        } else if (endDate) {
            // Set expiresOn to provided endDate
            expiresOn = new Date(endDate);
            expiresOn = convertToIST(expiresOn); // Convert to IST
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
        // employeeName,employeeId,employeeEmail,employeePhone,employeeGender,CostToEmployee,Duration,StartDate,EndDate

        await locker.save();
        const email = employeeEmail;
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
        const { lockerNumber, costToEmployee, duration, startDate, endDate, EmployeeEmail } = req.body;
        // console.log( lockerNumber,lockerType, lockerCode, employeeName, employeeId, employeeEmail, employeePhone, employeeGender, costToEmployee, duration, startDate, endDate )

        if (!lockerNumber || !EmployeeEmail) {

            return res.status(400).json({ message: "lockerNumber is required" });
        }

        const email = EmployeeEmail;
        const locker = await Locker.findOne({
            LockerNumber: lockerNumber
        });

        if (!locker) {
            return res.status(404).json({ message: "Locker is not available or does not exist" });
        }

        let expiresOn;
        if (duration === "3") {
            // Set expiresOn to 3 months from the current date
            const threeMonthsFromNow = new Date();
            threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);
            expiresOn = convertToIST(threeMonthsFromNow); // Convert to IST
        }
        else if (duration === "6") {
            // Set expiresOn to 6 months from the current date
            const sixMonthsFromNow = new Date();
            sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
            expiresOn = convertToIST(sixMonthsFromNow); // Convert to IST
        } else if (duration === "12") {
            // Set expiresOn to 12 months from the current date
            const twelveMonthsFromNow = new Date();
            twelveMonthsFromNow.setMonth(twelveMonthsFromNow.getMonth() + 12);
            expiresOn = convertToIST(twelveMonthsFromNow); // Convert to IST
        } else if (endDate) {
            // Set expiresOn to provided endDate
            expiresOn = new Date(endDate);
            expiresOn = convertToIST(expiresOn); // Convert to IST
        }
        locker.CostToEmployee = costToEmployee;
        locker.Duration = duration;
        locker.StartDate = startDate;
        locker.EndDate = endDate;
        locker.LockerStatus = "occupied";

        locker.expiresOn = expiresOn;
        // employeeName,employeeId,employeeEmail,employeePhone,employeeGender,CostToEmployee,Duration,StartDate,EndDate

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
        const { lockerNumber, EmployeeEmail } = req.body;
        // console.log( lockerNumber,lockerType, lockerCode, employeeName, employeeId, employeeEmail, employeePhone, employeeGender, costToEmployee, duration, startDate, endDate )
        console.log(lockerNumber, EmployeeEmail)
        if (!lockerNumber || !EmployeeEmail) {
            return res.status(400).json({ message: "lockerNumber is required" });
        }

        const email = EmployeeEmail;
        const locker = await Locker.findOne({
            LockerNumber: lockerNumber,
        });

        if (!locker) {
            return res.status(404).json({ message: "Locker is not available or does not exist" });
        }
// ********************************************************************************************************************************

        let oldCode = locker.LockerCode;
        oldCode = oldCode.substring(1) + oldCode[0];
        locker.LockerStatus = 'available';
        locker.LockerCode = oldCode;

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


exports.getAllLockers = async (req, res, next) => {
    try {
        const data = await Locker.find();
        return res.status(200).json({
            message: "All Lockers",
            data
        });
    } catch (err) {
        console.log(`Error in allocating locker: ${err.message}`);
        next(err);
    }
}
exports.getAllocatedLockers = async (req, res, next) => {
    try {
        const data = await Locker.find({ LockerStatus: 'occupied' });
        return res.status(200).json({
            message: "All allocated Lockers",
            data
        });
    } catch (err) {
        console.log(`Error in allocating locker: ${err.message}`);
        next(err);
    }
}
exports.getAvailableLockers = async (req, res, next) => {
    try {
        const data = await Locker.find({ LockerStatus: 'available' });
        return res.status(200).json({
            message: "All available Lockers",
            data
        });
    } catch (err) {
        console.log(`Error in allocating locker: ${err.message}`);
        next(err);
    }
}

exports.getExpiredLockers = async (req, res, next) => {
    try {
        const data = await Locker.find({ LockerStatus: 'expired' });
        return res.status(200).json({
            message: "All expired Lockers",
            data
        });
    } catch (err) {
        console.log(`Error in allocating locker: ${err.message}`);
        next(err);
    }
}

exports.getExpiringIn7daysLockers = async (req, res, next) => {
    try {
        const today = new Date();
        const sevenDaysFromNow = new Date(today);
        sevenDaysFromNow.setDate(today.getDate() + 7);

        const data = await Locker.find({
            expiresOn: { $lte: sevenDaysFromNow },
        });
        return res.status(200).json({
            message: "All expired Lockers",
            data
        });
    } catch (err) {
        console.log(`Error in allocating locker: ${err.message}`);
        next(err);
    }
}
exports.getExpiringToday = async (req, res, next) => {
    try {
        const today = new Date();
        const sevenDaysFromNow = new Date(today);
        sevenDaysFromNow.setDate(today.getDate());

        const data = await Locker.find({
            expiresOn: { $lte: sevenDaysFromNow },
        });
        return res.status(200).json({
            message: "All expired Lockers",
            data
        });
    } catch (err) {
        console.log(`Error in allocating locker: ${err.message}`);
        next(err);
    }
}

exports.changeLockerPricing = async (req, res, next) => {
    try {
        const { id, LockerPrice3Month, LockerPrice6Month, LockerPrice12Month } = req.body;
        const locker = await Locker.findById(id);
        if (!locker) {
            return res.status(404).json({ message: "Locker not found" });
        }
        locker.LockerPrice3Month = LockerPrice3Month;
        locker.LockerPrice6Month = LockerPrice6Month;
        locker.LockerPrice12Month = LockerPrice12Month;
        await locker.save();
        return res.status(200).json({ message: "Locker pricing updated successfully", locker });
    } catch (err) {
        console.log(`Error in allocating locker: ${err.message}`);
        return next(err);
    }
};


exports.findLockerByUserEmail = async (req, res, next) => {
    try {
        const { employeeEmail } = req.body;

        // Find all lockers associated with the given employee email
        const lockers = await Locker.find({ employeeEmail: employeeEmail });

        // Check if lockers were found
        if (lockers.length === 0) {
            return res.status(404).json({ message: "No lockers found for this email" });
        }

        // Respond with the list of lockers
        return res.status(200).json({ message: "Lockers found successfully", lockers });

    } catch (err) {
        console.log(`Error in finding lockers: ${err.message}`);
        return next(err);
    }
};

exports.updateLockerCode = async (req, res, next) => {
    try {
        const { id } = req.body;
        console.log(id);

        // Find the locker by ID
        const locker = await Locker.findById(id);
        if (!locker) {
            return res.status(404).json({ message: "Locker not found" });
        }

        const { LockerCodeCombinations, LockerCode } = locker;

        // Find the current index of LockerCode in LockerCodeCombinations
        const currentIndex = LockerCodeCombinations.indexOf(LockerCode);

        // Calculate the next index in a circular manner
        const nextIndex = (currentIndex + 1) % LockerCodeCombinations.length;

        // Update LockerCode to the next code in the array
        locker.LockerCode = LockerCodeCombinations[nextIndex];

        // Save the updated locker
        await locker.save();
        
        return res.status(200).json({ message: "Locker code updated successfully", locker });
    } catch (err) {
        console.log(`Error in updating locker code: ${err.message}`);
        return next(err);
    }
};
 

exports.chageLockerStatusToExpired = async (req, res, next) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: "Locker ID is required" });
        }

        const updatedLocker = await Locker.findByIdAndUpdate(
            id,
            { LockerStatus: "expired" },
            { new: true }
        );

        if (!updatedLocker) {
            return res.status(404).json({ message: "Locker not found" });
        }

        res.status(200).json({
            message: "Locker status updated to expired",
            data: updatedLocker
        });
    } catch (err) {
        console.log(`Error in expiring locker: ${err.message}`);
        res.status(500).json({ message: `Error expiring locker: ${err.message}` });
        next(err);
    }
};


exports.deleteLocker = async (req, res, next) => {
    try {
        const { lockerNumber } = req.body;
        
        console.log(lockerNumber);

        if (!lockerNumber) {
            return res.status(400).json({ message: "Locker number is required" });
        }

        // Find and delete by lockerNumber instead of _id
        const deletedLocker = await Locker.findOneAndDelete({ LockerNumber: lockerNumber });

        if (!deletedLocker) {
            return res.status(404).json({ message: "Locker not found" });
        }

        res.status(200).json({
            message: "Locker deleted successfully",
            data: deletedLocker
        });

    } catch (err) {
        console.error(`Error in deleting locker: ${err.message}`);
        res.status(500).json({ message: `Error deleting locker: ${err.message}` });
        next(err);
    }
};


exports.getLockersByTypeandGender = async (req, res, next) => {
    try {
        const type = req.query.type; 
  const gender = req.query.gender; 
        const lockers = await Locker.find({ LockerType:type,
            availableForGender:gender  });

        res.status(200).json({
            message: "Locker Fetched successfully",
            data: lockers
        });

    } catch (err) {
        console.error(`Error in Fetching locker: ${err.message}`);
        res.status(500).json({ message: `Error in Fetching  locker: ${err.message}` });
        next(err);
    }
};
