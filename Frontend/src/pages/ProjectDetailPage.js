import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProjectDetailPage = () => {
    const { product_id } = useParams(); // Use product_id from URL
    const [project, setProject] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/projects/${product_id}/`); // Use product_id in API call
                const data = await response.json();
                setProject(data);
            } catch (error) {
                console.error("Error fetching project:", error);
                setError("An error occurred while fetching the project.");
            }
        };

        fetchProject();
    }, [product_id]);

    if (error) {
        return <div className="text-red-500 text-center mt-4">{error}</div>;
    }

    if (!project) {
        return <div className="text-gray-500 text-center mt-4">Loading project...</div>;
    }

    const renderImage = () => {
        if (project.image && project.image.data && project.image.content_type) {
            return (
                <img
                    src={`data:${project.image.content_type};base64,${project.image.data}`}
                    alt={`${project.project_name} Thumbnail`}
                    className="w-full h-64 object-cover rounded-lg shadow-md"
                />
            );
        }
        return (
            <div className="w-full h-64 bg-gradient-to-r from-blue-500 to-blue-700 text-white flex items-center justify-center rounded-lg shadow-md">
                <p className="text-lg font-semibold">No Image Available</p>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-6 px-10">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-3xl font-bold">SNS Project Suite</h1>
                    <p className="italic text-lg">Innovation for the Future</p>
                </div>
            </header>

            {/* Hero Section */}
            <div className="bg-white shadow-md p-10">
                <div className="container mx-auto flex flex-col md:flex-row items-center md:items-start">
                    <div className="md:w-1/2 mb-6 md:mb-0">
                        {renderImage()}
                    </div>
                    <div className="md:w-1/2 md:pl-10">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">{project.project_name}</h2>
                        <p className="text-xl italic text-blue-600 mb-6">{project.tagline}</p>
                        <p className="text-lg text-gray-700">{project.description}</p>
                    </div>
                </div>
            </div>

            {/* Details Section */}
            <main className="container mx-auto py-10 px-4 md:px-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h3 className="text-2xl font-bold text-blue-600 mb-4">Key Features</h3>
                        <p className="text-gray-700 text-lg">{project.key_features}</p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h3 className="text-2xl font-bold text-blue-600 mb-4">Domain</h3>
                        <p className="text-gray-700 text-lg">{project.domain}</p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h3 className="text-2xl font-bold text-blue-600 mb-4">Tech Stack</h3>
                        <p className="text-gray-700 text-lg">{project.tech_stack}</p>
                    </div>
                </div>

                {/* Links Section */}
                <div className="mt-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg p-6 shadow-md">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Links</h3>
                    <div className="flex space-x-6">
                        <a
                            href={project.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition"
                        >
                            <span className="mr-2">GitHub</span>
                        </a>
                        {project.demo_url && (
                            <a
                                href={project.demo_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center bg-green-600 text-white px-4 py-2 rounded-md shadow hover:bg-green-700 transition"
                            >
                                <span className="mr-2">Live Demo</span>
                            </a>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProjectDetailPage;
