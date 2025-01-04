// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';

// const SuperadminDashboard = () => {
//     const { staff_id } = useParams();
//     const [username, setUsername] = useState('');
//     const navigate = useNavigate();

//     useEffect(() => {
//         // Retrieve the username from local storage
//         const storedUsername = localStorage.getItem('user_name');
//         const storedStaffId = localStorage.getItem('staff_id');

//         if (storedUsername && storedStaffId && storedStaffId === staff_id) {
//             setUsername(storedUsername);
//         } else {
//             console.error('Username or Staff ID not found in local storage or mismatch');
//             navigate('/login'); // Redirect to login if staff_id does not match
//         }
//     }, [staff_id, navigate]);

//     const handleLogout = () => {
//         // Clear local storage
//         localStorage.clear();
//         // Navigate to the PreviewPage
//         navigate('/');
//     };

//     const handleStartProject = () => {
//         // Navigate to the FormPage
//         navigate(`/${staff_id}/createproject`);
//     };

//     const projects = [
//         {
//             id: 1,
//             title: 'Project #1',
//             description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin risus lacus, aliquet nec imperdiet sit amet, faucibus et nisi. In hac habitasse platea dictumst. Etiam velit nisi, bibendum in magna id, aliquet bibendum eros.',
//             image: 'https://via.placeholder.com/150'
//         },
//         {
//             id: 2,
//             title: 'Project #2',
//             description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin risus lacus, aliquet nec imperdiet sit amet, faucibus et nisi. In hac habitasse platea dictumst. Etiam velit nisi, bibendum in magna id, aliquet bibendum eros.',
//             image: 'https://via.placeholder.com/150'
//         },
//         {
//             id: 3,
//             title: 'Project #3',
//             description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin risus lacus, aliquet nec imperdiet sit amet, faucibus et nisi. In hac habitasse platea dictumst. Etiam velit nisi, bibendum in magna id, aliquet bibendum eros.',
//             image: 'https://via.placeholder.com/150'
//         }
//     ];

//     return (
//         <div className="min-h-screen bg-gray-100">
//             <header className="bg-white shadow">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <div className="flex justify-between h-16">
//                         <div className="flex">
//                             <div className="flex-shrink-0 flex items-center">
//                                 <span className="text-xl font-bold text-gray-800">Superadmin Dashboard</span>
//                             </div>
//                         </div>
//                         <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
//                             <a href="#" className="px-3 py-2 text-sm font-medium text-gray-700 rounded-md">Projects</a>
//                             <a href="#" className="px-3 py-2 text-sm font-medium text-gray-700 rounded-md">Notifications</a>
//                             <a href="#" className="px-3 py-2 text-sm font-medium text-gray-700 rounded-md">About</a>
//                             <button onClick={handleLogout} className="px-3 py-2 text-sm font-medium text-gray-700 rounded-md">Logout</button>
//                         </div>
//                     </div>
//                 </div>
//             </header>
//             <main>
//                 <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//                     <div className="px-4 py-6 sm:px-0">
//                         <div className="flex justify-between items-center">
//                             <h1 className="text-2xl font-bold text-gray-900">Welcome, {username}</h1>
//                             <button onClick={handleStartProject} className="bg-amber-400 text-white font-bold py-2 px-4 rounded">Start Project</button>
//                         </div>
//                     </div>
//                     <div className="mt-8">
//                         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                             <div className="text-2xl font-bold text-gray-900">Latest Projects</div>
//                             <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//                                 {projects.map(project => (
//                                     <div key={project.id} className="bg-white overflow-hidden shadow rounded-lg">
//                                         <div className="px-4 py-5 sm:p-6">
//                                             <div className="flex items-center">
//                                                 <img className="h-24 w-24 rounded-md object-cover" src={project.image} alt={project.title} />
//                                                 <div className="ml-5">
//                                                     <h3 className="text-lg leading-6 font-medium text-gray-900">{project.title}</h3>
//                                                     <p className="mt-1 max-w-2xl text-sm text-gray-500">{project.description}</p>
//                                                 </div>
//                                             </div>
//                                             <div className="mt-4">
//                                                 <button className="bg-amber-400 text-white font-bold py-2 px-4 rounded">View</button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                             <div className="mt-6 flex justify-center">
//                                 <button className="bg-gray-500 text-white font-bold py-2 px-4 rounded">View all projects</button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default SuperadminDashboard;

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Menu, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProjectCard from "../superadmin/components/ProjectCard";

const SuperadminDashboard = () => {
    const [projects, setProjects] = useState([]);
    const [userName, setUserName] = useState("");
    const [staffId, setStaffId] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/projects/get-all-projects/');
                if (response.ok) {
                    const data = await response.json();
                    setProjects(data);
                } else {
                    console.error('Failed to fetch projects');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchProjects();

        // Retrieve user name and staff ID from local storage
        const storedUserName = localStorage.getItem("user_name");
        const storedStaffId = localStorage.getItem("staff_id");
        if (storedUserName) {
            setUserName(storedUserName);
        }
        if (storedStaffId) {
            setStaffId(storedStaffId);
        }
    }, []);

    const handleNewProjectClick = () => {
        navigate(`/${staffId}/createproject`); // Navigate to create project page
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 120 }}
                className="bg-white text-gray-800 p-4 fixed top-0 left-0 right-0 z-50 shadow-lg"
            >
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Superadmin Dashboard</h1>
                    <div className="flex items-center space-x-4">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleNewProjectClick}
                            className="p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors duration-200 flex items-center space-x-1"
                        >
                            <PlusCircle size={20} />
                            <span className="text-sm font-medium">New Project</span>
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors duration-200"
                        >
                            <User size={24} />
                        </motion.button>
                    </div>
                </div>
            </motion.header>
            <main className="flex-1 p-6 md:p-8 mt-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-4xl font-bold mb-6 text-gray-800">
                        Welcome, {userName}!
                    </h2>
                    <h3 className="text-2xl font-semibold mb-4 text-gray-700">
                        Latest Projects
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project, index) => (
                            <ProjectCard key={index} project={project} />
                        ))}
                    </div>
                    <button className="text-yellow-500 mt-4">
                        View all projects
                    </button>
                </motion.div>
            </main>
        </div>
    );
};

export default SuperadminDashboard;

