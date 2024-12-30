import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PreviewPage = () => {
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCollege, setSelectedCollege] = useState(""); // New state for filter
    const navigate = useNavigate();

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

    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.project_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.domain.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCollege = selectedCollege ? project.college === selectedCollege : true;
        return matchesSearch && matchesCollege;
    });

    const handleViewProject = (product_id) => {
        navigate(`/project/${product_id}`);
    };

    const handleFilterClick = (college) => {
        setSelectedCollege(college);
    };

    const handleProjectUpload = () => {
        navigate("/formpage");
    };

    if (error) {
        return <div className="text-red-500 text-center mt-4">{error}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-blue-600">SNS Project Suite</h1>
                <nav className="flex items-center">
                    <a href="#" className="text-blue-600 hover:underline mr-4">Home</a>
                    <button
                        onClick={handleProjectUpload}
                        className="bg-blue-500 text-white px-4 py-2 rounded flex items-center hover:bg-blue-600 mr-4"
                    >
                        <span className="material-icons mr-2">add</span> Project Upload
                    </button>
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
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                    />
                    <div className="mb-4">
                        <button
                            onClick={() => handleFilterClick("SNSCE")}
                            className={`px-4 py-2 rounded ${selectedCollege === "SNSCE" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"} mr-2`}
                        >
                            SNSCE
                        </button>
                        <button
                            onClick={() => handleFilterClick("SNSCT")}
                            className={`px-4 py-2 rounded ${selectedCollege === "SNSCT" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"} mr-2`}
                        >
                            SNSCT
                        </button>
                        <button
                            onClick={() => handleFilterClick("SNSCANS")}
                            className={`px-4 py-2 rounded ${selectedCollege === "SNSCANS" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}
                        >
                            SNSCANS
                        </button>
                        <button
                            onClick={() => handleFilterClick("")}
                            className="px-4 py-2 bg-gray-300 rounded ml-2"
                        >
                            Clear Filter
                        </button>
                    </div>
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
                                    <p className="text-sm text-gray-500 mb-2">{project.tagline}</p>
                                    <p className="text-sm text-gray-700 mb-4">{project.description}</p>
                                    <p className="text-sm text-gray-700 mb-4"><strong>Domain:</strong> {project.domain}</p>
                                    <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                                        {project.college}
                                    </span>
                                    <button
                                        onClick={() => handleViewProject(project.product_id)}
                                        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    >
                                        View Project
                                    </button>
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
