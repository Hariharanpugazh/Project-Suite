import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Menu } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams
import Sidebar from "../components/Sidebar";
import ProjectGrid from "../components/ProjectGrid";

const StaffDashboard = () => {
    const { staff_id } = useParams(); // Retrieve staff_id from the URL
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
        const fetchProjects = async () => {
            try {
                const response = await fetch(
                    `http://127.0.0.1:8000/api/projects/get-projects/?staff_id=${staff_id}`
                );
                const data = await response.json();
                if (Array.isArray(data)) {
                    setProjects(data);
                    setFilteredProjects(data);
                } else {
                    console.error("Unexpected API Response:", data);
                    setError("Failed to fetch projects.");
                }
            } catch (error) {
                console.error("Error fetching projects:", error);
                setError("An error occurred while fetching projects.");
            }
        };

        fetchProjects();
    }, [staff_id]);

    // Other code remains unchanged
    useEffect(() => {
        const filtered = projects.filter((project) => {
            const title = project.title?.toLowerCase() || "";
            const description = project.description?.toLowerCase() || "";
            const domains = project.domains?.join(" ").toLowerCase() || "";
            const tags = project.tags?.join(" ").toLowerCase() || "";
            const matchesSearch =
                title.includes(searchTerm.toLowerCase()) ||
                description.includes(searchTerm.toLowerCase()) ||
                domains.includes(searchTerm.toLowerCase()) ||
                tags.includes(searchTerm.toLowerCase());
            const matchesCollege = selectedCollege
                ? project.college === selectedCollege
                : true;
            const matchesDomain = selectedDomain
                ? project.domains?.includes(selectedDomain)
                : true;
            return matchesSearch && matchesCollege && matchesDomain;
        });
        setFilteredProjects(filtered);
    }, [searchTerm, selectedCollege, selectedDomain, projects]);

    if (error) {
        return <div className="text-red-500 text-center mt-4">{error}</div>;
    }

    return (
        <div
            className={`flex flex-col min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 transition-all duration-300 ${
                isSidebarOpen ? "pl-80" : "pl-0"
            }`}
        >
            {/* Header and other components */}
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
                    <div className="relative">
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
