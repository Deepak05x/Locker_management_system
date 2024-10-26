import React, { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [loginDetails, setLoginDetails] = useState(null);
    const [getOtp, setGetOtp] = useState(null);
    const [validateOtp, setValidateOtp] = useState(null);
    const [resetPassword, setResetPassword] = useState(null);
    const [checkEmail, setCheckEmail] = useState(null);

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
            if (res.status === 200) {
                const data = res.data;
                setLoginDetails(data);
                navigate("/dashboard");
            }
        } catch (error) {
            console.log(error);
        }
    };

    console.log(loginDetails);

    const generateOtp = async (email) => {
        try {
            const res = await axios.post(
                "http://localhost:3000/api/resetPassword/getOtp",
                { email },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (res.status === 200) {
                const data = res.data;
                setGetOtp(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const checkOtp = async (email, otp) => {
        try {
            const res = await axios.post(
                "http://localhost:3000/api/resetPassword/validateOTP",
                { email, otp },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const data = res.data;
            setValidateOtp(data);
            if (validateOtp === otp) {
                navigate("/reset");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const resetPass = async (email, newPassword) => {
        try {
            const res = await axios.post(
                "http://localhost:3000/api/resetPassword/resetPassword",
                { email, newPassword },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const data = res.data;
            setResetPassword(data);
        } catch (error) {
            console.log(error);
        }
    };

    return <AuthContext.Provider value={{ login, setCheckEmail, loginDetails, generateOtp, getOtp, checkOtp, validateOtp, resetPass, resetPassword }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
