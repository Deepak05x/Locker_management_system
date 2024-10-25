import React, { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [loginDetails, setLoginDetails] = useState(null);
    const [otp, setOtp] = useState(null);
    const [validateOtp, setValidateOtp] = useState(null);
    const [resetPassword, setResetPassword] = useState(null);

    const login = async (email, password) => {
        try {
            const res = await axios.post(
                "http://localhost:3000/api/user/login",
                { email, password },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            // const response = await fetch("http://localhost:3000/api/user/login", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify({ email, password }),
            // });
            const data = await res.data;
            console.log(data);
            setLoginDetails(data);
        } catch (error) {
            console.log(error);
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

    const checkOtp = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/resetPassword/validateOTP");
            const data = await response.json();
            setValidateOtp(data);
        } catch (error) {
            console.log("Validate OTP Function Failed To Fetch Data");
        }
    };

    const resetPass = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/resetPassword/resetPassword");
            const data = await response.json();
            setResetPassword(data);
        } catch (error) {
            console.log("Reset Password Function Failed To Fetch Data");
        }
    };

    return <AuthContext.Provider value={{ login, loginDetails, generateOtp, otp, checkOtp, validateOtp, resetPass, resetPassword }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
