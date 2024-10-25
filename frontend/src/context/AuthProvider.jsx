import React from "react";
import { useEffect } from "react";
import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [loginDetails, setLoginDetails] = useState(null);
    const [otp, setOtp] = useState(null);
    const [validateOtp, setValidateOtp] = useState(null);
    const [resetPassword, setResetPassword] = useState(null);

    const login = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/user/login");
            const data = await response.json();
            setLoginDetails(data);
        } catch (error) {
            console.log("Login Function Failed To Fetch Data");
        }
    };

    const generateOtp = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/resetPassword/getOtp");
            const data = await response.json();
            setOtp(data);
        } catch (error) {
            console.log("Generate Otp Function Failed To Fetch Data");
        }
    };

    const checkOtp = async (otpInput) => {
        try {
            const response = await fetch("http://localhost:3000/api/resetPassword/validateOTP", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ otp: otpInput }),
            });
            const data = await response.json();
            setValidateOtp(data);
        } catch (error) {
            console.log("Validate OTP function failed to fetch data");
        }
    };

    const resetPass = async (newPassword) => {
        try {
            const response = await fetch("http://localhost:3000/api/resetPassword/resetPassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ password: newPassword }),
            });
            const data = await response.json();
            setResetPassword(data);
        } catch (error) {
            console.log("Reset Password function failed to fetch data");
        }
    };

    return <AuthContext.Provider value={{ login, loginDetails, generateOtp, otp, checkOtp, validateOtp, resetPass, resetPassword }}></AuthContext.Provider>;
};

export default AuthProvider;
