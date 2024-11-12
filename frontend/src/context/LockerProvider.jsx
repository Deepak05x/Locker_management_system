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
    const [cancelLockers, setCancelLockers] = useState(null);
    const [lockerIssue, setLockerIssue] = useState(null);
    const [technicalIssue, setTechnicalIssue] = useState(null);
    const [renewLocker, setRenewLocker] = useState(null);
    const [expireIn7Days, setExpireIn7Days] = useState(null);

    const [isEditable, setIsEditable] = useState({
        halfMale: false,
        fullMale: false,
        halfFemale: false,
        fullFemale: false,
    });

    const [lockerPrices, setLockerPrices] = useState({
        halfMale: { threeMonths: 300, sixMonths: 600, twelveMonths: 900 },
        fullMale: { threeMonths: 500, sixMonths: 800, twelveMonths: 1200 },
        halfFemale: { threeMonths: 300, sixMonths: 400, twelveMonths: 500 },
        fullFemale: { threeMonths: 400, sixMonths: 500, twelveMonths: 600 },
    });

    const toggleEditable = (lockerType) => {
        setIsEditable((prevState) => ({
            ...prevState,
            [lockerType]: !prevState[lockerType],
        }));
    };

    const handleInputChange = (e, lockerType, duration) => {
        const { value } = e.target;
        setLockerPrices((prevPrices) => ({
            ...prevPrices,
            [lockerType]: {
                ...prevPrices[lockerType],
                [duration]: value,
            },
        }));
    };

    const saveLockerPrice = async (lockerType) => {
        const { threeMonths, sixMonths, twelveMonths } = lockerPrices[lockerType];
        const data = {
            LockerPrice3Month: parseInt(threeMonths, 10),
            LockerPrice6Month: parseInt(sixMonths, 10),
            LockerPrice12Month: parseInt(twelveMonths, 10),
            LockerType: lockerType.includes("half") ? "half" : "full",
            availableForGender: lockerType.includes("Male") ? "Male" : "Female",
        };

        try {
            const response = await axios.put("http://localhost:3000/api/locker/updateMultipleLockerPrices", data, {
                withCredentials: true
            });

            if (response.status === 200) {
                console.log("Locker price updated successfully!");
            } else {
                console.error("Failed to update locker price.");
            }
        } catch (error) {
            console.error("An error occurred while updating locker price:", error);
        }
    };

    const addLocker = async (LockerType, LockerNumber, LockerCodeCombinations, LockerPrice3Month, LockerPrice6Month, LockerPrice12Month, availableForGender, LockerSerialNumber) => {
        try {
            const res = await axios.post(
                "http://localhost:3000/api/admin/addSingleLocker",
                { LockerType, LockerNumber, LockerCodeCombinations, LockerPrice3Month, LockerPrice6Month, LockerPrice12Month, availableForGender, LockerSerialNumber },
                {
                    withCredentials: true
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
                    withCredentials: true
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
                    withCredentials: true
                }
            );

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
            const res = await axios.get("http://localhost:3000/api/locker/getAllLockers",{ withCredentials: true});
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
            const res = await axios.get("http://localhost:3000/api/locker/getExpiredLockers",{ withCredentials: true});
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
            const res = await axios.get("http://localhost:3000/api/locker/getAvailableLockers",{ withCredentials: true});
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
            const res = await axios.get("http://localhost:3000/api/locker/getAllocatedLockers",{ withCredentials: true});
            const data = res.data;
            if (res.status === 200) {
                setAllocatedLockerDetails(data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const cancelLocker = async (lockerNumber, EmployeeEmail) => {
        try {
            const res = await axios.post(
                "http://localhost:3000/api/locker/cancelLockerAllocation",
                { lockerNumber, EmployeeEmail },
                {
                    withCredentials: true
                }
            );

            if (res.status === 200) {
                const data = res.data;
                setCancelLockers(data);
                navigate("/dashboard");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleLockerIssue = async (subject, description, LockerNumber) => {
        try {
            const res = await axios.post(
                "http://localhost:3000/api/issue/raiseLockerIssue",
                {
                    subject,
                    description,
                    LockerNumber,
                },
                {
                    withCredentials: true
                }
            );
            if (res.status === 200) {
                const data = res.data;
                setLockerIssue(data);
                navigate("/dashboard");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleTechnicalIssue = async (subject, description) => {
        try {
            const res = await axios.post(
                "http://localhost:3000/api/issue/raiseTechnicalIssue",
                {
                    subject,
                    description,
                },
                {
                    withCredentials: true
                }
            );
            if (res.status === 200) {
                const data = res.data;
                setTechnicalIssue(data);
                navigate("/dashboard");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleRenewLocker = async (lockerNumber, costToEmployee, duration, startDate, endDate, EmployeeEmail) => {
        try {
            const res = await axios.post(
                "http://localhost:3000/api/locker/renewLocker",
                {
                    lockerNumber,
                    costToEmployee,
                    duration,
                    startDate,
                    endDate,
                    EmployeeEmail,
                },
                {
                    withCredentials: true
                }
            );
            if (res.status === 200) {
                const data = res.data;
                setRenewLocker(data);
                navigate("/update_locker");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getExpiredLockers7Days = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/locker/getExpiringIn7daysLockers",{ withCredentials: true});
            if (res.status === 200) {
                const data = res.data;
                setExpireIn7Days(data);
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
        getExpiredLockers7Days();
    }, []);

    return (
        <LockerContext.Provider
            value={{
                expireIn7Days,
                handleTechnicalIssue,
                handleLockerIssue,
                allocatedLockerDetails,
                availableLockerDetails,
                expiredLockerDetails,
                allLockerDetails,
                cancelLocker,
                addLocker,
                availableLocker,
                availableLockers,
                allocateLocker,
                handleRenewLocker,
                isEditable,
                lockerPrices,
                toggleEditable,
                handleInputChange,
                saveLockerPrice,
            }}
        >
            {children}
        </LockerContext.Provider>
    );
};

export default LockerProvider;
