const Locker = require('../models/lockerModel.js')
const User = require('../models/userModel.js')
const bcrypt = require('bcrypt');
require('dotenv').config();
const { errorHandler } = require('../utils/error.js');
const jwt = require('jsonwebtoken');

exports.addStaff = async (req, res, next) => {
  
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

        // console.log(token);
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

exports.editStaff = async (req, res, next) => {
    try {
        // Get the staff ID from request parameters
        const { id } = req.body;
        console.log(id)
        // Find the user by ID
        let user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Extract fields from the request body
        const { name, role, email, password, phoneNumber, gender } = req.body;

        // Update only the fields that are provided
        if (name) user.name = name;
        if (role) user.role = role;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (gender) user.gender = gender;

        // Hash the password if provided                       
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        // Save the updated user details                          
        await user.save();

        // Create a new token with updated information          
        const payload = { email: user.email, id: user._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2d" });

        const options = {
            expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };

        res.cookie("token", token, options).status(200).json({
            message: 'User updated successfully',
            user: { ...user.toObject(), token },
        });
    } catch (err) {
        console.log(`Error in updating staff: ${err.message}`);
        next(err);
    }
};

exports.viewStaffDetails = async (req, res, next) => {
    try {

        const { id } = req.body;

        let user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'User Details fetched successfully',
            user: user
        });
    } catch (err) {
        console.log(`Error in updating staff: ${err.message}`);
        next(err);
    }
};


exports.viewAllStaff = async (req, res, next) => {
    try {

        let users = await User.find({ role: "Staff" });
        if (!users) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'Users  fetched successfully',
            users: users
        });
    } catch (err) {
        console.log(`Error in updating staff: ${err.message}`);
        next(err);
    }
};



exports.removeStaff = async (req, res, next) => {
    console.log("in");
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: "Staff ID is required" });
        }

        const deletedStaff = await User.findByIdAndDelete(id);
        if (!deletedStaff) {
            return res.status(404).json({ message: "Staff not found" });
        }
        res.status(200).json({ message: "Staff member removed successfully" });
    } catch (err) {
        console.log(`error in removing staff: ${err.message}`);
        res.status(500).json({ message: `Error removing staff: ${err.message}` });
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
    // LockerType, LockerNumber, LockerCode, LockerPrice3Month, LockerPrice6Month, LockerPrice12Month, availableForGender 
}
exports.addMultipleLocker = async (req, res, next) => {
    try {
        const lockers = req.body.data;
        console.log("adding multiple lockers")
        console.log(lockers);
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