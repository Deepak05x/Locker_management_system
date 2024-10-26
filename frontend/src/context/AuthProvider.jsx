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
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
    };

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

    const checkOtp = async (otp) => {
        try {
            const res = await axios.post(
                "http://localhost:3000/api/resetPassword/validateOTP",
                { otp },
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

    const resetPass = async (email, confirmEmail) => {
        try {
            const res = await axios.post(
                "http://localhost:3000/api/resetPassword/resetPassword",
                { email, confirmEmail },
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

    return <AuthContext.Provider value={{ login, loginDetails, generateOtp, getOtp, checkOtp, validateOtp, resetPass, resetPassword }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
