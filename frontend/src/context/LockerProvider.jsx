import React from "react";
import { createContext, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AuthContext } from "./AuthProvider";

export const LockerContext = createContext();

const LockerProvider = ({ children }) => {
    const navigate = useNavigate();

    const { loginDetails } = useContext(AuthContext);

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
    const [expireIn1Day, setExpireIn1Day] = useState(null);
    const [assignSuccess, setAssignSuccess] = useState(false);
    const [cancelSuccess, setCancelSuccess] = useState(false);
    const [lockerSuccess, setLockerSuccess] = useState(false);
    const [technicalSuccess, setTechnicalSuccess] = useState(false);
    const [addSuccess, setAddSuccess] = useState(false);
    const [addMulSuccess, setAddMulSuccess] = useState(false);
    const [halfFemalePrice, setHalfFemalePrice] = useState(null);
    const [halfMalePrice, setHalfMalePrice] = useState(null);
    const [fullMalePrice, setFullMalePrice] = useState(null);
    const [fullFemalePrice, setFullFemalePrice] = useState(null);

    const [isEditable, setIsEditable] = useState({
        halfMale: false,
        fullMale: false,
        halfFemale: false,
        fullFemale: false,
    });

    const [lockerPrices, setLockerPrices] = useState({
        halfMale: { threeMonths: 0, sixMonths: 0, twelveMonths: 0 },
        fullMale: { threeMonths: 0, sixMonths: 0, twelveMonths: 0 },
        halfFemale: { threeMonths: 0, sixMonths: 0, twelveMonths: 0 },
        fullFemale: { threeMonths: 0, sixMonths: 0, twelveMonths: 0 },
    });

    useEffect(() => {
        if (halfFemalePrice?.data?.length > 0) {
            setLockerPrices((prevPrices) => ({
                ...prevPrices,
                halfFemale: {
                    ...prevPrices.halfFemale,
                    threeMonths: halfFemalePrice.data[0].LockerPrice3Month,
                    sixMonths: halfFemalePrice.data[0].LockerPrice6Month,
                    twelveMonths: halfFemalePrice.data[0].LockerPrice12Month,
                },
            }));
        }
    }, [halfFemalePrice]);

    useEffect(() => {
        if (halfMalePrice?.data?.length > 0) {
            setLockerPrices((prevPrices) => ({
                ...prevPrices,
                halfMale: {
                    ...prevPrices.halfMale,
                    threeMonths: halfMalePrice.data[0].LockerPrice3Month,
                    sixMonths: halfMalePrice.data[0].LockerPrice6Month,
                    twelveMonths: halfMalePrice.data[0].LockerPrice12Month,
                },
            }));
        }
    }, [halfMalePrice]);

    useEffect(() => {
        if (fullMalePrice?.data?.length > 0) {
            setLockerPrices((prevPrices) => ({
                ...prevPrices,
                fullMale: {
                    ...prevPrices.fullMale,
                    threeMonths: fullMalePrice.data[0].LockerPrice3Month,
                    sixMonths: fullMalePrice.data[0].LockerPrice6Month,
                    twelveMonths: fullMalePrice.data[0].LockerPrice12Month,
                },
            }));
        }
    }, [fullMalePrice]);

    useEffect(() => {
        if (fullFemalePrice?.data?.length > 0) {
            setLockerPrices((prevPrices) => ({
                ...prevPrices,
                fullFemale: {
                    ...prevPrices.fullFemale,
                    threeMonths: fullFemalePrice.data[0].LockerPrice3Month,
                    sixMonths: fullFemalePrice.data[0].LockerPrice6Month,
                    twelveMonths: fullFemalePrice.data[0].LockerPrice12Month,
                },
            }));
        }
    }, [fullFemalePrice]);

    const getLockerPriceHalfFemale = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/locker/getLockersByTypeandGender?type=half&gender=Female", {
                withCredentials: true,
            });
            if (res.status === 200) {
                const data = res.data;
                setHalfFemalePrice(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getLockerPriceHalfMale = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/locker/getLockersByTypeandGender?type=half&gender=Male", {
                withCredentials: true,
            });
            if (res.status === 200) {
                const data = res.data;
                setHalfMalePrice(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getLockerPriceFullMale = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/locker/getLockersByTypeandGender?type=full&gender=Male", {
                withCredentials: true,
            });
            if (res.status === 200) {
                const data = res.data;
                setFullMalePrice(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getLockerPriceFullFemale = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/locker/getLockersByTypeandGender?type=full&gender=Female", {
                withCredentials: true,
            });
            if (res.status === 200) {
                const data = res.data;
                setFullFemalePrice(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

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
                withCredentials: true,
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
                    withCredentials: true,
                }
            );
            if (res.status === 200) {
                const data = res.data;
                setAddedLocker(data);
                setAddSuccess(true);
                navigate("/dashboard");
                window.location.reload();
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
                    withCredentials: true,
                }
            );
            if (res.status === 200) {
                const data = res.data;
                setAvailableLockers(data);
                navigate("/assign_locker");
            }
        } catch (error) {
            throw "Selected Locker Criteria is not Available";
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
                    withCredentials: true,
                }
            );

            if (res.status === 200) {
                const data = res.data;
                setAssignedLockers(data);
                setAssignSuccess(true);
                navigate("/dashboard");
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchAllLockers = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/locker/getAllLockers", { withCredentials: true });
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
            const res = await axios.get("http://localhost:3000/api/locker/getExpiredLockers", { withCredentials: true });
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
            const res = await axios.get("http://localhost:3000/api/locker/getAvailableLockers", { withCredentials: true });
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
            const res = await axios.get("http://localhost:3000/api/locker/getAllocatedLockers", { withCredentials: true });
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
                    withCredentials: true,
                }
            );

            if (res.status === 200) {
                const data = res.data;
                setCancelLockers(data);
                setCancelSuccess(true);
                navigate("/dashboard");
                window.location.reload();
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
                    withCredentials: true,
                }
            );
            if (res.status === 200) {
                const data = res.data;
                setLockerIssue(data);
                setLockerSuccess(true);
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
                    withCredentials: true,
                }
            );
            if (res.status === 200) {
                const data = res.data;
                setTechnicalIssue(data);
                setTechnicalSuccess(true);
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
                    withCredentials: true,
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
            const res = await axios.get("http://localhost:3000/api/locker/getExpiringIn7daysLockers", { withCredentials: true });
            if (res.status === 200) {
                const data = res.data;
                setExpireIn7Days(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getExpiredLockers1Day = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/locker/getExpiringToday", { withCredentials: true });
            if (res.status === 200) {
                const data = res.data;
                setExpireIn1Day(data);
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
        getExpiredLockers1Day();
        getLockerPriceHalfFemale();
        getLockerPriceHalfMale();
        getLockerPriceFullMale();
        getLockerPriceFullFemale();
    }, [loginDetails]);

    return (
        <LockerContext.Provider
            value={{
                expireIn1Day,
                addMulSuccess,
                setAddMulSuccess,
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
                assignSuccess,
                setAssignSuccess,
                cancelSuccess,
                setCancelSuccess,
                lockerSuccess,
                setLockerSuccess,
                technicalSuccess,
                setTechnicalSuccess,
                addSuccess,
                setAddSuccess,
            }}
        >
            {children}
        </LockerContext.Provider>
    );
};

export default LockerProvider;
