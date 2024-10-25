const User = require('../models/userModel.js')
const OTP=require('../models/OTP.js')
const Locker=require('../models/lockerModel.js')

exports.getOtp = async (req, res, next) => {
try{
const {lockerType,employeeGender}=req.body;
if(!lockerType || !employeeGender){
    
}
}catch (err) {
        console.log(`error in signup ${err.message}`);
        next(err);
    }
}