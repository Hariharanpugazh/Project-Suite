import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FormPage from "./pages/FormPage";
import PreviewPage from "./pages/PreviewPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import StaffDashboard from "../src/staff/pages/staffdashboard";
import StaffViewProject from "../src/staff/pages/StaffViewProject";

function App() {
    return (
        <Router>
            <Routes>
                {/* userflow */}
                <Route path="/" element={<PreviewPage />} />
                <Route path="/project/:product_id" element={<ProjectDetailPage />} />

                <Route path="/login" element={<LoginPage />} /> {/* New login route */}
                <Route path="/newuser" element={<RegisterPage />} /> {/* New register route */}

                {/* Staffflow */}
                <Route path="/:staff_id/staffdashboard" element={<StaffDashboard />} />
                <Route path="/:staff_id/staffviewproject/:product_id" element={<StaffViewProject />} />
                <Route path="/:staff_id/formpage" element={<FormPage />} />
            </Routes>
        </Router>
    );
}

export default App;
