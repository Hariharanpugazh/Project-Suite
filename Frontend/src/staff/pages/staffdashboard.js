import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Menu, PlusCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ProjectGrid from "../components/ProjectGrid";

const StaffDashboard = () => {
    const { staff_id } = useParams(); // Fetch staff_id from URL
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCollege, setSelectedCollege] = useState("");
    const [selectedDomain, setSelectedDomain] = useState("");
    const [error, setError] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Ensure staff_id is passed to the API call
        const fetchProjectsByStaff = async (staffId) => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/projects/api/projects/get-projects-by-staff-id/?staff_id=${staffId}`);
                if (response.ok) {
                    const data = await response.json();
                    setProjects(data); // Save fetched projects in state
                    setFilteredProjects(data); // Initially set filtered projects
                } else {
                    console.error(`Failed to fetch projects for staff_id ${staffId}`);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        if (staff_id) {
            fetchProjectsByStaff(staff_id); // Pass the staff_id here
        }
    }, [staff_id]); // Trigger useEffect when staff_id changes

    const handleNewProductClick = () => {
        navigate(`/${staff_id}/formpage`); // Navigate with staff_id in URL
    };

    return (
        <div
            className={`flex flex-col min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 transition-all duration-300 ${
                isSidebarOpen ? "pl-80" : "pl-0"
            }`}
        >
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 120 }}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 fixed top-0 left-0 right-0 z-50 shadow-lg"
            >
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsSidebarOpen((prev) => !prev)}
                            className="mr-4 p-2 rounded-full bg-white text-indigo-600 hover:bg-indigo-100 transition-colors duration-200"
                            aria-label="Toggle sidebar"
                        >
                            <Menu size={24} />
                        </motion.button>
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                            Staff Dashboard
                        </h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleNewProductClick}
                            className="p-2 rounded-full bg-white text-indigo-600 hover:bg-indigo-100 transition-colors duration-200 flex items-center space-x-1"
                        >
                            <PlusCircle size={20} />
                            <span className="text-sm font-medium">New Product</span>
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsLoginOpen(!isLoginOpen)}
                            className="p-2 rounded-full bg-white text-indigo-600 hover:bg-indigo-100 transition-colors duration-200"
                        >
                            <User size={24} />
                        </motion.button>
                        {isLoginOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
                            >
                                <button
                                    onClick={() => navigate("/loginpage")}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-500 hover:text-white"
                                >
                                    Login
                                </button>
                            </motion.div>
                        )}
                    </div>
                </div>
            </motion.header>
            <div className="flex">
                <Sidebar
                    isOpen={isSidebarOpen}
                    setIsOpen={setIsSidebarOpen}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    selectedCollege={selectedCollege}
                    setSelectedCollege={setSelectedCollege}
                    selectedDomain={selectedDomain}
                    setSelectedDomain={setSelectedDomain}
                />
                <main className="flex-1 p-6 md:p-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mt-16"
                    >
                        <h2 className="text-4xl font-bold mb-6 text-indigo-900">
                            Welcome, Staff!
                        </h2>
                        <ProjectGrid projects={filteredProjects} />
                    </motion.div>
                </main>
            </div>
        </div>
    );
};

export default StaffDashboard;
