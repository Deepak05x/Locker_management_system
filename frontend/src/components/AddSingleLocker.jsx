import React, { useState } from "react";
import { lazy, useContext } from "react";
import { Link } from "react-router-dom";
import { LockerContext } from "../context/LockerProvider";

const DashNav = lazy(() => import("./DashNav"));

const AddSingleLocker = () => {
    const { addLocker } = useContext(LockerContext);

    const [lockerType, setLockerType] = useState(null);
    const [lockerNumber, setLockerNumber] = useState(null);
    const [lockerCode, setLockerCode] = useState(null);
    const [lockerPriceThree, setLockerPriceThree] = useState(null);
    const [lockerPriceSix, setLockerPriceSix] = useState(null);
    const [lockerPriceYear, setLockerPriceYear] = useState(null);
    const [gender, setGender] = useState(null);

    const handleLockerType = (e) => {
        setLockerType(e.target.value);
    };

    const handleLockerNumber = (e) => {
        setLockerNumber(e.target.value);
    };

    const handleLockerCode = (e) => {
        setLockerCode(e.target.value);
    };

    const handleLockerPriceThree = (e) => {
        setLockerPriceThree(e.target.value);
    };

    const handleLockerPriceSix = (e) => {
        setLockerPriceSix(e.target.value);
    };

    const handleLockerPriceYear = (e) => {
        setLockerPriceYear(e.target.value);
    };

    const handleGender = (e) => {
        setGender(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addLocker(lockerType, lockerNumber, lockerCode, lockerPriceThree, lockerPriceSix, lockerPriceYear, gender);
    };

    return (
        <>
            <DashNav />
            <section className="flex flex-col items-center py-24 gap-12">
                <div className="flex flex-col  rounded-3xl items-center md:px-16 sm:px-12 ssm:px-8 py-16 gap-12 bg-white drop-shadow-2xl shadow-black">
                    <h1 className="text-3xl font-medium">
                        Want to add a <span className="text-blue">locker?</span>
                    </h1>
                    <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-8">
                        <div className="flex flex-col gap-8 items-center w-full">
                            <select id="lockerType" value={lockerType} onChange={handleLockerType} className="border border-black px-4 rounded-sm py-2 w-full focus:outline-none enabled:outline-none">
                                <option value="" disabled selected hidden>
                                    Type of the locker
                                </option>
                                <option value="half">Half</option>
                                <option value="full">Full</option>
                            </select>
                            <input
                                type="number"
                                id="number"
                                value={lockerNumber}
                                placeholder="Enter the locker number"
                                className="border border-black px-4 rounded-sm py-2 w-full focus:outline-none enabled:outline-none"
                                onChange={handleLockerNumber}
                            />
                            <input
                                type="number"
                                id="number"
                                value={lockerCode}
                                placeholder="Enter the locker code"
                                className="border border-black px-4 rounded-sm py-2 w-full focus:outline-none enabled:outline-none"
                                onChange={handleLockerCode}
                            />
                            <input
                                type="number"
                                id="3"
                                value={lockerPriceThree}
                                placeholder="Enter the price for 3 months"
                                className="border border-black px-4 rounded-sm py-2 w-full focus:outline-none enabled:outline-none"
                                onChange={handleLockerPriceThree}
                            />
                            <input
                                type="number"
                                id="6"
                                value={lockerPriceSix}
                                placeholder="Enter the price for 6 months"
                                className="border border-black px-4 rounded-sm py-2 w-full focus:outline-none enabled:outline-none"
                                onChange={handleLockerPriceSix}
                            />
                            <input
                                type="number"
                                id="12"
                                value={lockerPriceYear}
                                placeholder="Enter the price for 12 months"
                                className="border border-black px-4 rounded-sm py-2 w-full focus:outline-none enabled:outline-none"
                                onChange={handleLockerPriceYear}
                            />
                            <select id="gender" value={gender} onChange={handleGender} className="border border-black px-4 rounded-sm py-2 w-full focus:outline-none enabled:outline-none">
                                <option value="" disabled selected hidden>
                                    Type of the gender
                                </option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            <button type="submit" className="bg-blue px-6 py-2 rounded-sm text-white font-medium">
                                Add Locker
                            </button>
                        </div>
                        <Link className="bg-blue px-6 py-2 rounded-sm text-white font-medium" to={"/add_multiple_locker"}>
                            Add Multiple Locker
                        </Link>
                    </form>
                </div>
            </section>
        </>
    );
};

export default AddSingleLocker;
