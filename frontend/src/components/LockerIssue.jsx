import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { LockerContext } from "../context/LockerProvider";
import { MoveRight, Lock, BadgeAlert, BookOpen } from "lucide-react";

const TechnicalIssue = () => {
    const [lockerNumber, setLockerNumber] = useState("");
    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");

    const { handleLockerIssue } = useContext(LockerContext);

    const handleLockerNumber = (e) => {
        setLockerNumber(e.target.value);
    };

    const handleSubject = (e) => {
        setSubject(e.target.value);
    };

    const handleDescription = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await handleLockerIssue(subject, description, lockerNumber);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
                <div className="text-center space-y-2 flex flex-col items-center gap-4">
                    <div className="flex justify-center ">
                        <BadgeAlert className="w-16 h-16 text-blue-600" />
                    </div>
                    <h1 className="text-3xl flex flex-col font-bold text-blue-900">
                        Report An Locker <span>Issue</span>
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="relative">
                        <label htmlFor="number" className="sr-only">
                            Number
                        </label>
                        <div className="flex items-center">
                            <Lock className="absolute left-3 h-5 w-5 text-blue-500" />
                            <input
                                id="number"
                                name="number"
                                type="number"
                                required
                                className="pl-10 outline-none w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="Enter the locker number"
                                value={lockerNumber}
                                onChange={handleLockerNumber}
                            />
                        </div>
                    </div>

                    <div className="relative">
                        <label htmlFor="subject" className="sr-only">
                            Subject
                        </label>
                        <div className="flex items-center">
                            <BookOpen className="absolute left-3 h-5 w-5 text-blue-500" />
                            <input
                                id="subject"
                                name="subject"
                                type="text"
                                required
                                className="pl-10 outline-none w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="Enter the subject"
                                value={subject}
                                onChange={handleSubject}
                            />
                        </div>
                    </div>

                    <div className="relative">
                        <label htmlFor="description" className="sr-only">
                            Description
                        </label>
                        <div className="flex items-center">
                            <textarea
                                id="description"
                                name="description"
                                type="text"
                                required
                                className=" outline-none w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="Enter your description"
                                value={description}
                                onChange={handleDescription}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                            <MoveRight className="h-5 w-5 text-white group-hover:text-blue-300" />
                        </span>
                        Submit The Issue
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <div className="space-y-2">
                        <p className="text-sm text-gray-600">
                            Need to Raise Technical Issue? <span className="text-blue hover:underline cursor-pointer">Technical Issue</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TechnicalIssue;