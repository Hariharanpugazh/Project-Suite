import React, { useEffect, useState } from "react";

const PreviewPage = () => {
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/projects/get-projects/");
                const data = await response.json();
                if (Array.isArray(data)) {
                    setProjects(data);
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
    }, []);

    if (error) {
        return <div className="text-red-500 text-center mt-4">{error}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-5">
            <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">Project Gallery</h1>
            <p className="text-center text-gray-600 mb-10">Explore our latest projects and innovations</p>
            {projects.length === 0 ? (
                <p className="text-center text-gray-500">No projects available to display.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-md overflow-hidden"
                        >
                            {project.image && (
                                <img
                                    src={`data:${project.image.content_type};base64,${project.image.data}`}
                                    alt={project.image.filename}
                                    className="w-full h-48 object-cover"
                                />
                            )}
                            <div className="p-4">
                                <h2 className="text-lg font-bold text-gray-800">{project.project_name}</h2>
                                <p className="text-sm text-gray-500">{project.tagline}</p>
                                <p className="text-sm text-gray-700 mt-2">{project.description}</p>
                                <a
                                    href={project.github_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline mt-4 block"
                                >
                                    GitHub Link
                                </a>
                                {project.demo_url && (
                                    <a
                                        href={project.demo_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:underline mt-2 block"
                                    >
                                        Demo Link
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PreviewPage;
