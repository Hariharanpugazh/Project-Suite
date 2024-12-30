import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FormPage from "./pages/FormPage";
import PreviewPage from "./pages/PreviewPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<FormPage />} />
                <Route path="/preview" element={<PreviewPage />} />
            </Routes>
        </Router>
    );
}

export default App;
