import { Routes, Route, Navigate } from "react-router-dom";

import { SignUp, Login } from "./pages";

import ManageJobs from "./components/employer/ManageJobs";
import Applicants from "./components/employer/Applications";
import JobDiscovery from "./components/employee/JobDiscovery";
import MyApplications from "./components/employee/MyApplication";
import EmployeeAccount from "./components/employee/EmployeeProfile";
import PostJob from "./components/employer/JobPost";

import MainLayout from "./components/common/MainLayout";
import JobApplicants from "./components/employer/JobApplicants";
import EditJob from "./components/employer/EditJob";

function App() {
  return (
    <Routes>

      {/* Authentication pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Main application */}
      <Route element={<MainLayout />}>

        {/* Employee routes */}
        <Route
          path="/employee/dashboard"
          element={<JobDiscovery />}
        />

        <Route
          path="/employee/applications"
          element={<MyApplications />}
        />

        <Route
          path="/employee/profile"
          element={<EmployeeAccount />}
        />

        {/* Employer routes */}
        <Route
          path="/employer/dashboard"
          element={<ManageJobs />}
        />

        <Route
          path="/employer/post-job"
          element={<PostJob />}
        />

        <Route
          path="/employer/jobs/:jobId/applicants"
          element={<JobApplicants />}
        />

        <Route
          path="/employer/applications"
          element={<Applicants />}
        />
        <Route
          path="/employer/jobs/:jobId/edit"
          element={<EditJob />}
        />
      </Route>

      {/* Default route */}
      <Route path="/" element={<Navigate to="/login" replace />} />

    </Routes>
  );
}

export default App;