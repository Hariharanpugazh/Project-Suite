import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FormPage from "./pages/FormPage";
import PreviewPage from "./pages/PreviewPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/formpage" element={<FormPage />} />
                <Route path="/" element={<PreviewPage />} />
                <Route path="/project/:product_id" element={<ProjectDetailPage />} />
            </Routes>
        </Router>
    );
}

export default App;