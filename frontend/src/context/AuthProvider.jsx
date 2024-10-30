import React, { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [loginDetails, setLoginDetails] = useState(null);
    const [getOtp, setGetOtp] = useState(null);
    const [validatedOtp, setValidatedOtp] = useState(null);
    const [resetedPassword, setResetedPassword] = useState(null);
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

    const validateOtp = async (email, otp) => {
        try {
            console.log(email, otp);
            const res = await axios.post(
                "http://localhost:3000/api/resetPassword/validateOTP",
                { email, otp },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (res.status === 200) {
                const data = res.data;
                setValidatedOtp(data);
                navigate("/reset");
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const resetPassword = async (email, newPassword) => {
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
            if (res.status === 200) {
                const data = res.data;
                setResetedPassword(data);
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const logout = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/user/LogOut");
            if (res.status === 200) {
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return <AuthContext.Provider value={{ login, checkEmail, setCheckEmail, loginDetails, generateOtp, getOtp, validateOtp, resetPassword, logout }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
