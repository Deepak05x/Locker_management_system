import React from "react";
import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const LockerContext = createContext();

const LockerProvider = ({ children }) => {
    const navigate = useNavigate();

    const [addedLocker, setAddedLocker] = useState(null);
    const [availableLockers, setAvailableLockers] = useState(null);
    const [assignedLockers, setAssignedLockers] = useState(null);
    const [allLockerDetails, setAllLockerDetails] = useState([]);
    const [expiredLockerDetails, setExpiredLockerDetails] = useState([]);
    const [availableLockerDetails, setAvailableLockerDetails] = useState([]);
    const [allocatedLockerDetails, setAllocatedLockerDetails] = useState([]);

    const addLocker = async (LockerType, LockerNumber, LockerCode, LockerPrice3Month, LockerPrice6Month, LockerPrice12Month, availableForGender) => {
        try {
            const res = await axios.post(
                "http://localhost:3000/api/admin/addSingleLocker",
                { LockerType, LockerNumber, LockerCode, LockerPrice3Month, LockerPrice6Month, LockerPrice12Month, availableForGender },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (res.status === 200) {
                const data = res.data;
                setAddedLocker(data);
                navigate("/dashboard");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const availableLocker = async (lockerType, employeeGender) => {
        try {
            const res = await axios.post(
                "http://localhost:3000/api/locker/getAvailableLocker",
                { lockerType, employeeGender },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (res.status === 200) {
                const data = res.data;
                setAvailableLockers(data);
                navigate("/assign_locker");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const allocateLocker = async (lockerNumber, lockerType, lockerCode, employeeName, employeeId, employeeEmail, employeePhone, employeeGender, costToEmployee, duration, startDate, endDate) => {
        try {
            const res = await axios.post(
                "http://localhost:3000/api/locker/allocateLocker",
                {
                    lockerNumber,
                    lockerType,
                    lockerCode,
                    employeeName,
                    employeeId,
                    employeeEmail,
                    employeePhone,
                    employeeGender,
                    costToEmployee,
                    duration,
                    startDate,
                    endDate,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (endDate) {
                console.log("This is the End Date");
                console.log(endDate);
            }
            if (res.status === 200) {
                const data = res.data;
                setAssignedLockers(data);
                navigate("/dashboard");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchAllLockers = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/locker/getAllLockers");
            const data = res.data;
            if (res.status === 200) {
                setAllLockerDetails(data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchExpiredLockers = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/locker/getExpiredLockers");
            const data = res.data;
            if (res.status === 200) {
                setExpiredLockerDetails(data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchAvailableLockers = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/locker/getAvailableLockers");
            const data = res.data;
            if (res.status === 200) {
                setAvailableLockerDetails(data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchAllocatedLockers = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/locker/getAllocatedLockers");
            const data = res.data;
            if (res.status === 200) {
                setAllocatedLockerDetails(data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAllLockers();
        fetchExpiredLockers();
        fetchAllocatedLockers();
        fetchAvailableLockers();
    }, []);

    return (
        <LockerContext.Provider value={{ allocatedLockerDetails, availableLockerDetails, expiredLockerDetails, allLockerDetails, addLocker, availableLocker, availableLockers, allocateLocker }}>
            {children}
        </LockerContext.Provider>
    );
};

export default LockerProvider;
