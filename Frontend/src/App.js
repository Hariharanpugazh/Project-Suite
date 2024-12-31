import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FormPage from "./pages/FormPage";
import PreviewPage from "./pages/PreviewPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PreviewPage />} />
                <Route path="/formpage" element={<FormPage />} />
                <Route path="/project/:product_id" element={<ProjectDetailPage />} />
                <Route path="/login" element={<LoginPage />} /> {/* New login route */}
                <Route path="/register" element={<RegisterPage />} /> {/* New register route */}
            </Routes>
        </Router>
    );
}

export default App;
