const Locker = require('../models/lockerModel.js')
const User = require('../models/userModel.js')
const bcrypt = require('bcrypt');
require('dotenv').config();
const { errorHandler } = require('../utils/error.js');
const jwt = require('jsonwebtoken');

exports.addStaff = async (req, res, next) => {
    console.log("in");
    try {
        const { name, role, email, password, phoneNumber, gender } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, role, email, phoneNumber, password: hashedPassword, gender });

        const payload = {
            email: email,
            id: user._id
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "2d",
        });

        console.log(token);
        const userWithToken = { ...user.toObject(), token };

        const { password: pass, ...rest } = userWithToken;

        const options = {
            expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };

        res.cookie("token", token, options).status(200).json(rest);
    } catch (err) {
        console.log(`error in adding staff ${err.message}`);
        next(err);
    }
};

exports.addLocker = async (req, res, next) => {
    try {
        const { LockerType, LockerNumber, LockerCode, LockerPrice3Month, LockerPrice6Month, LockerPrice12Month, availableForGender } = req.body;
        const locker = await Locker.create({ LockerType, LockerNumber, LockerCode, LockerPrice3Month, LockerPrice6Month, LockerPrice12Month, availableForGender });
        return res.status(200).json({
            message: "Locker Created Successfully",
            data: locker
        });

    } catch (err) {
        console.log(`error in adding ${err.message}`);
        next(err);
    }

}
exports.addMultipleLocker = async (req, res, next) => {
    try {
        const lockers = req.body;
        const newLockers = await Locker.insertMany(lockers);

        return res.status(200).json({
            message: "Lockers Created Successfully",
            data: newLockers
        });
    } catch (err) {
        console.log(`Error in creating lockers: ${err.message}`);
        next(err);
    }
};