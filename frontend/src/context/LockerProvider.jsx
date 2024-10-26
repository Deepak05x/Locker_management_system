import React from "react";
import { createContext, useState } from "react";
import axios from "axios";

export const LockerContext = createContext();

const LockerProvider = ({ children }) => {
    const [addedLocker, setAddedLocker] = useState(null);

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
            }
        } catch (error) {
            console.log(error);
        }
    };

    return <LockerContext.Provider value={{ addLocker }}>{children}</LockerContext.Provider>;
};

export default LockerProvider;
