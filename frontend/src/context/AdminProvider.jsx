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
    const [staffSuccess, setStaffSuccess] = useState(false);
    const [staffDeleteSuccess, setStaffDeleteSuccess] = useState(false);
    const [editStaffSuccess, setEditStaffSuccess] = useState(false);
    const [lockerIssue, setLockerIssue] = useState(null);
    const [technicalIssue, setTechnicalIssue] = useState(null);

    console.log(technicalIssue);

    const navigate = useNavigate();

    const getStaffs = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/admin/viewAllStaff", {
                withCredentials: true,
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
                setStaffSuccess(true);
                navigate("/dashboard");
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
                setStaffDeleteSuccess(true);
                navigate("/dashboard");
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
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
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const editStaffDetails = async (id, name, role, email, password, phoneNumber, gender) => {
        try {
            const res = await axios.put(
                "http://localhost:3000/api/admin/editStaff",
                {
                    id,
                    name,
                    role,
                    email,
                    password,
                    phoneNumber,
                    gender,
                },
                {
                    withCredentials: true,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (res.status === 200) {
                setEditStaffSuccess(true);
                navigate("/dashboard");
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getLockerIssue = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/issue/getLockerIssue", {
                withCredentials: true,
            });
            if (res.status === 200) {
                const data = res.data;
                setLockerIssue(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getTechnicalIssue = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/issue/getTechnicalIssue", {
                withCredentials: true,
            });
            if (res.status === 200) {
                const data = res.data;
                setTechnicalIssue(data);
                console.log(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const deleteIssue = async (id) => {
        try {
            const res = await axios.post(
                "http://localhost:3000/api/issue/deleteIssue",
                {
                    id,
                },
                {
                    withCredentials: true,
                }
            );
            if (res.status === 200) {
                navigate("/dashboard");
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getStaffs();
        getLockerIssue();
        getTechnicalIssue();
    }, []);

    return (
        <AdminContext.Provider
            value={{
                deleteIssue,
                lockerIssue,
                technicalIssue,
                editStaffSuccess,
                setEditStaffSuccess,
                staffDeleteSuccess,
                setStaffDeleteSuccess,
                staffSuccess,
                setStaffSuccess,
                editStaffDetails,
                deleteSuccess,
                setDeleteSuccess,
                deleteLocker,
                staffs,
                addSingleStaff,
                handleStaffDetails,
                staffDetails,
                deleteStaff,
            }}
        >
            {children}
        </AdminContext.Provider>
    );
};

export default AdminProvider;
