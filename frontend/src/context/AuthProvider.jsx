import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [loginDetails, setLoginDetails] = useState(JSON.parse(localStorage.getItem("loginDetails")) || null);
    const [getOtp, setGetOtp] = useState(null);
    const [validatedOtp, setValidatedOtp] = useState(null);
    const [resetedPassword, setResetedPassword] = useState(null);
    const [checkEmail, setCheckEmail] = useState(null);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [updateSuccess, setUpdateSuccess] = useState(false);

    useEffect(() => {
        if (loginDetails) {
            localStorage.setItem("loginDetails", JSON.stringify(loginDetails));
        } else {
            localStorage.removeItem("loginDetails");
        }
    }, [loginDetails]);

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
                setLoginSuccess(true);
                document.cookie = `token=${data.token}; path=/;`;
                navigate("/dashboard");
            }
        } catch (error) {
            throw error.response.data.error || "Invalid Username or Password";
        }
    };

    const generateOtp = async (email) => {
        try {
            const res = await axios.post(
                "http://localhost:3000/api/resetPassword/getOtp",
                { email },
                {
                    withCredentials: true,
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
                    withCredentials: true,
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
            const res = await axios.get("http://localhost:3000/api/user/LogOut", {
                withCredentials: true,
            });
            if (res.status === 200) {
                setLoginDetails(null);
                localStorage.removeItem("loginDetails");
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleProfileUpdate = async (userId, name, email, password, phone) => {
        try {
            const res = await axios.post(
                "http://localhost:3000/api/profile/updateProfile",
                {
                    userId,
                    name,
                    email,
                    password,
                    phone,
                },
                {
                    withCredentials: true,
                }
            );
            if (res.status === 200) {
                setUpdateSuccess(true);
                navigate("/dashboard");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                updateSuccess,
                setUpdateSuccess,
                setLoginSuccess,
                loginSuccess,
                handleProfileUpdate,
                login,
                checkEmail,
                setCheckEmail,
                loginDetails,
                generateOtp,
                getOtp,
                validateOtp,
                resetPassword,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
