const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        LockerType: {
            type: String,
            required: true,
            enum: ['half', 'full'],
        },
        LockerStatus: {
            type: String,
            enum: ['occupied', 'available'],
            default: 'available',
        },
        LockerNumber: {
            type: Number,  
            required: true, 
            unique: true,
        },
        LockerCode: {
            type: String,
            required: true,
        },
        LockerPrice: {
            type: Number,  
            required: true,
        },
        employeeName: {
            type: String,
        },
        employeeId: {
            type: String,
        },
        employeeEmail: {
            type: String,
        },
        employeePhone: {
            type: String,
        },
        employeeGender: {
            type: String,
            enum: ['Male', 'Female'],
        },
        CostToEmployee: {
            type: Number,  
        },
        Duration: {
            type: String,
        },
        StartDate: {
            type: Date,
        },
        EndDate: {
            type: Date,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
