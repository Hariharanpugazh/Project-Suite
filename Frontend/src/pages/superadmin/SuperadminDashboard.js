import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SuperadminDashboard = () => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve the username from local storage
        const storedUsername = localStorage.getItem('user_name');
        if (storedUsername) {
            setUsername(storedUsername);
        } else {
            console.error('Username not found in local storage');
        }
    }, []);

    const handleLogout = () => {
        // Clear local storage
        localStorage.clear();
        // Navigate to the PreviewPage
        navigate('/preview');
    };

    const projects = [
        {
            id: 1,
            title: 'Project #1',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin risus lacus, aliquet nec imperdiet sit amet, faucibus et nisi. In hac habitasse platea dictumst. Etiam velit nisi, bibendum in magna id, aliquet bibendum eros.',
            image: 'https://via.placeholder.com/150'
        },
        {
            id: 2,
            title: 'Project #2',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin risus lacus, aliquet nec imperdiet sit amet, faucibus et nisi. In hac habitasse platea dictumst. Etiam velit nisi, bibendum in magna id, aliquet bibendum eros.',
            image: 'https://via.placeholder.com/150'
        },
        {
            id: 3,
            title: 'Project #3',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin risus lacus, aliquet nec imperdiet sit amet, faucibus et nisi. In hac habitasse platea dictumst. Etiam velit nisi, bibendum in magna id, aliquet bibendum eros.',
            image: 'https://via.placeholder.com/150'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <span className="text-xl font-bold text-gray-800">Superadmin Dashboard</span>
                            </div>
                        </div>
                        <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                            <a href="#" className="px-3 py-2 text-sm font-medium text-gray-700 rounded-md">Projects</a>
                            <a href="#" className="px-3 py-2 text-sm font-medium text-gray-700 rounded-md">Notifications</a>
                            <a href="#" className="px-3 py-2 text-sm font-medium text-gray-700 rounded-md">About</a>
                            <button onClick={handleLogout} className="px-3 py-2 text-sm font-medium text-gray-700 rounded-md">Logout</button>
                        </div>
                    </div>
                </div>
            </header>
            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0">
                        <div className="flex justify-between items-center">
                            <h1 className="text-2xl font-bold text-gray-900">Welcome, {username}</h1>
                            <button
                                className="bg-amber-400 text-white font-bold py-2 px-4 rounded"
                                onClick={() => navigate('/FormingPage')}
                            >
                                Start Project
                            </button>
                        </div>
                    </div>
                    <div className="mt-8">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-2xl font-bold text-gray-900">Latest Projects</div>
                            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {projects.map(project => (
                                    <div key={project.id} className="bg-white overflow-hidden shadow rounded-lg">
                                        <div className="px-4 py-5 sm:p-6">
                                            <div className="flex items-center">
                                                <img className="h-24 w-24 rounded-md object-cover" src={project.image} alt={project.title} />
                                                <div className="ml-5">
                                                    <h3 className="text-lg leading-6 font-medium text-gray-900">{project.title}</h3>
                                                    <p className="mt-1 max-w-2xl text-sm text-gray-500">{project.description}</p>
                                                </div>
                                            </div>
                                            <div className="mt-4">
                                                <button className="bg-amber-400 text-white font-bold py-2 px-4 rounded">View</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 flex justify-center">
                                <button className="bg-gray-500 text-white font-bold py-2 px-4 rounded">View all projects</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SuperadminDashboard;
