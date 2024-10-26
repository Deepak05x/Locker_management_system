import React from "react";
import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const LockerContext = createContext();

const LockerProvider = ({ children }) => {
    const navigate = useNavigate();

    const [addedLocker, setAddedLocker] = useState(null);
    const [availableLockers, setAvailableLockers] = useState(null);

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

    return <LockerContext.Provider value={{ addLocker, availableLocker }}>{children}</LockerContext.Provider>;
};

export default LockerProvider;
