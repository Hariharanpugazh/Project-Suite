import React, { useEffect, useState } from "react";

const PreviewPage = () => {
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

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

    const filteredProjects = projects.filter(project =>
        project.project_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.domain.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (error) {
        return <div className="text-red-500 text-center mt-4">{error}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-blue-600">SNS Project Suite</h1>
                <nav>
                    <a href="#" className="text-blue-600 hover:underline mr-4">Home</a>
                    <a href="#" className="text-red-600 hover:underline">Logout</a>
                </nav>
            </header>

            <div className="flex">
                <aside className="w-1/4 p-6 bg-gray-100 border-r border-gray-200">
                    <input
                        type="text"
                        placeholder="Search projects..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </aside>

                <main className="flex-1 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                            >
                                {project.image && (
                                    <img
                                        src={`data:${project.image.content_type};base64,${project.image.data}`}
                                        alt={project.image.filename}
                                        className="w-full h-48 object-cover"
                                    />
                                )}
                                <div className="p-4">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{project.project_name}</h2>
                                    {/* <p className="text-sm text-gray-500 mb-2">{project.tagline}</p> */}
                                    <p className="text-sm text-gray-700 mb-4">{project.description}</p>
                                    <p className="text-sm text-gray-700 mb-4"><strong>Domain:</strong> {project.domain}</p>
                                    <a
                                        href={project.github_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm font-medium text-blue-600 hover:underline"
                                    >
                                        GitHub Link
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default PreviewPage;