import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";

export const AdminContext = createContext();

const AdminProvider = ({ children }) => {
    const [staffs, setStaffs] = useState([]);
    const [addedStaffs, setAddedStaffs] = useState([]);
    const [staffDetails, setStaffDetails] = useState([]);
    const [deleteSuccess, setDeleteSuccess] = useState(false);

    const navigate = useNavigate();

    const getStaffs = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/admin/viewAllStaff", {
                withCredentials: true, // Include credentials (cookies) in the request
            });
            if (res.status === 200) {
                const data = res.data.users;
                setStaffs(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const addSingleStaff = async (name, role, email, password, phoneNumber, gender) => {
        try {
            const res = await axios.post(
                "http://localhost:3000/api/admin/addStaff",
                {
                    name,
                    role,
                    email,
                    password,
                    phoneNumber,
                    gender,
                },
                {
                    withCredentials: true,
                }
            );
            if (res.status === 200) {
                const data = res.data;
                setAddedStaffs(data);
                navigate("/staff_management");
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleStaffDetails = async (id) => {
        try {
            const res = await axios.post(
                "http://localhost:3000/api/admin/viewStaffDetails",
                {
                    id,
                },
                {
                    withCredentials: true,
                }
            );
            if (res.status === 200) {
                const data = res.data;
                console.log("STAFF DETAILS WORKED");
                setStaffDetails(data);
                navigate("/staff_management");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const deleteStaff = async (id) => {
        try {
            const res = await axios.post(
                "http://localhost:3000/api/admin/removeStaff",
                {
                    id,
                },
                {
                    withCredentials: true,
                }
            );
            if (res.status === 200) {
                navigate("/staff_management");
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const deleteLocker = async (lockerNumber) => {
        try {
            const res = await axios.post(
                "http://localhost:3000/api/locker/deleteLocker",
                {
                    lockerNumber,
                },
                {
                    withCredentials: true,
                }
            );
            if (res.status === 200) {
                setDeleteSuccess(true);
                navigate("/dashboard");
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getStaffs();
    }, []);

    return <AdminContext.Provider value={{ deleteSuccess, setDeleteSuccess, deleteLocker, staffs, addSingleStaff, handleStaffDetails, staffDetails, deleteStaff }}>{children}</AdminContext.Provider>;
};

export default AdminProvider;
