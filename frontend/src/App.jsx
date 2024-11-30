import React from "react";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import AuthProvider from "./context/AuthProvider";
import LockerProvider from "./context/LockerProvider";
import AdminProvider from "./context/AdminProvider";
import IssueManagement from "./components/IssueManagement";

const Login = lazy(() => import("./components/Login"));
const Home = lazy(() => import("./components/Home"));
const EnterEmail = lazy(() => import("./components/EnterEmail"));
const EnterOtp = lazy(() => import("./components/EnterOtp"));
const ResetPassword = lazy(() => import("./components/ResetPassword"));
const Dashboard = lazy(() => import("./components/Dashboard"));
const Testing = lazy(() => import("./components/Testing"));
const LockerManagement = lazy(() => import("./components/LockerManagement"));
const AddSingleLocker = lazy(() => import("./components/AddSingleLocker"));
const AvailableLockers = lazy(() => import("./components/AvailableLockers"));
const AssignLocker = lazy(() => import("./components/AssignLocker"));
const RenewLocker = lazy(() => import("./components/RenewLocker"));
const CancelLocker = lazy(() => import("./components/CancelLocker"));
const UpdateLocker = lazy(() => import("./components/UpdateLocker"));
const LockerIssue = lazy(() => import("./components/LockerIssue"));
const TechnicalIssue = lazy(() => import("./components/TechnicalIssue"));
const UpdateLockerFeature = lazy(() => import("./components/UpdateLockerFeature"));
const AddMultipleLocker = lazy(() => import("./components/AddMultipleLocker"));
const LockerAnalysis = lazy(() => import("./components/LockerAnalysis"));
const StaffManagement = lazy(() => import("./components/StaffManagement"));
const AddSingleStaff = lazy(() => import("./components/AddSingleStaff"));
const ViewStaffDetails = lazy(() => import("./components/ViewStaffDetails"));
const DeleteLocker = lazy(() => import("./components/DeleteLocker"));
const UpdateLockerPrice = lazy(() => import("./components/UpdateLockerPrice"));
const AccountPage = lazy(() => import("./components/AccountPage"));
const EditStaffDetails = lazy(() => import("./components/EditStaffDetails"));

const App = () => {
    return (
        <AuthProvider>
            <LockerProvider>
                <AdminProvider>
                    <Suspense fallback={<></>}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/enter" element={<EnterEmail />} />
                            <Route path="/otp" element={<EnterOtp />} />
                            <Route path="/reset" element={<ResetPassword />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/testing" element={<Testing />} />
                            <Route path="/locker_management" element={<LockerManagement />} />
                            <Route path="/add_single_locker" element={<AddSingleLocker />} />
                            <Route path="/available_lockers" element={<AvailableLockers />} />
                            <Route path="/assign_locker" element={<AssignLocker />} />
                            <Route path="/renew_locker" element={<RenewLocker />} />
                            <Route path="/cancel_locker" element={<CancelLocker />} />
                            <Route path="/update_locker" element={<UpdateLocker />} />
                            <Route path="/issue_reporting" element={<LockerIssue />} />
                            <Route path="/technical_issue" element={<TechnicalIssue />} />
                            <Route path="/update_locker_feature" element={<UpdateLockerFeature />} />
                            <Route path="/add_multiple_locker" element={<AddMultipleLocker />} />
                            <Route path="/locker_analysis" element={<LockerAnalysis />} />
                            <Route path="/staff_management" element={<StaffManagement />} />
                            <Route path="/add_single_staff" element={<AddSingleStaff />} />
                            <Route path="/view_staff_details" element={<ViewStaffDetails />} />
                            <Route path="/delete_locker" element={<DeleteLocker />} />
                            <Route path="/update_locker_price" element={<UpdateLockerPrice />} />
                            <Route path="/account_page" element={<AccountPage />} />
                            <Route path="/edit_staff_details" element={<EditStaffDetails />} />
                            <Route path="/issue_management" element={<IssueManagement />} />
                        </Routes>
                    </Suspense>
                </AdminProvider>
            </LockerProvider>
        </AuthProvider>
    );
};

export default App;
