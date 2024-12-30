import React, { useState } from "react";

const FormPage = () => {
    const [currentSection, setCurrentSection] = useState(1);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        college: "SNSCE",
        problemStatement: "",
        keyFeatures: "",
        scope: "",
        domain: "",
        tags: "",
        presentationLayer: "",
        applicationLayer: "",
        dataLayer: "",
        methodology: "",
        tools: "",
        api: "",
        teamCount: 1,
        teamNames: ["", "", "", ""],
        associateProjectMentor: "",
        associateTechMentor: "",
        dtMentor: "",
        image: null,
        youtubeUrl: "",
        githubUrl: "",
        ppt: null,
    });

    const sections = [
        "Form",
        "Project Info",
        "Tech Stack",
        "Team Info",
        "Uploads",
    ];

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleTeamNameChange = (index, value) => {
        const updatedTeamNames = [...formData.teamNames];
        updatedTeamNames[index] = value;
        setFormData({ ...formData, teamNames: updatedTeamNames });
    };

    const handleNext = () => setCurrentSection((prev) => Math.min(prev + 1, 5));
    const handlePrevious = () => setCurrentSection((prev) => Math.max(prev - 1, 1));

    const renderSectionHeader = () => {
        return (
            <div className="flex items-center justify-between mb-6">
                {sections.map((section, index) => (
                    <div
                        key={index}
                        className={`flex items-center ${
                            currentSection === index + 1 ? "text-yellow-500" : "text-gray-400"
                        }`}
                    >
                        <div
                            className={`w-8 h-8 flex items-center justify-center border rounded-full ${
                                currentSection === index + 1 ? "border-yellow-500" : "border-gray-400"
                            }`}
                        >
                            {index + 1}
                        </div>
                        <span className="ml-2 font-medium">{section}</span>
                    </div>
                ))}
            </div>
        );
    };

    const renderBreadcrumb = () => {
        return (
            <div className="mb-4">
                <p className="text-gray-500 text-sm">
                    {sections.slice(0, currentSection).join(" > ")}
                </p>
            </div>
        );
    };

    const renderSection = () => {
        switch (currentSection) {
            case 1:
                return (
                    <>
                        <h2 className="text-xl font-bold mb-4">Section 1: Form</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">College</label>
                            <select
                                name="college"
                                value={formData.college}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md"
                            >
                                <option value="SNSCE">SNSCE</option>
                                <option value="SNSCT">SNSCT</option>
                                <option value="SNSRCAS">SNSRCAS</option>
                            </select>
                        </div>
                    </>
                );
            case 2:
                return (
                    <>
                        <h2 className="text-xl font-bold mb-4">Section 2: Project Info</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Problem Statement</label>
                            <textarea
                                name="problemStatement"
                                value={formData.problemStatement}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Key Features</label>
                            <textarea
                                name="keyFeatures"
                                value={formData.keyFeatures}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Scope</label>
                            <textarea
                                name="scope"
                                value={formData.scope}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Domain</label>
                            <input
                                type="text"
                                name="domain"
                                value={formData.domain}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Tags</label>
                            <input
                                type="text"
                                name="tags"
                                value={formData.tags}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md"
                                required
                            />
                        </div>
                    </>
                );
            case 3:
                return (
                    <>
                        <h2 className="text-xl font-bold mb-4">Section 3: Tech Stack</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Presentation Layer</label>
                            <input
                                type="text"
                                name="presentationLayer"
                                value={formData.presentationLayer}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Application Layer</label>
                            <input
                                type="text"
                                name="applicationLayer"
                                value={formData.applicationLayer}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Data Layer</label>
                            <input
                                type="text"
                                name="dataLayer"
                                value={formData.dataLayer}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Methodology</label>
                            <input
                                type="text"
                                name="methodology"
                                value={formData.methodology}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Tools</label>
                            <input
                                type="text"
                                name="tools"
                                value={formData.tools}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">API</label>
                            <input
                                type="text"
                                name="api"
                                value={formData.api}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                    </>
                );
            case 4:
                return (
                    <>
                        <h2 className="text-xl font-bold mb-4">Section 4: Team Info</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Team Count</label>
                            <input
                                type="number"
                                name="teamCount"
                                value={formData.teamCount}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md"
                                min="1"
                                max="4"
                            />
                        </div>
                        {[...Array(Number(formData.teamCount))].map((_, index) => (
                            <div key={index} className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2">
                                    Teammate {index + 1} Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.teamNames[index]}
                                    onChange={(e) => handleTeamNameChange(index, e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md"
                                />
                            </div>
                        ))}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Associate Project Mentor</label>
                            <input
                                type="text"
                                name="associateProjectMentor"
                                value={formData.associateProjectMentor}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Associate Technology Mentor</label>
                            <input
                                type="text"
                                name="associateTechMentor"
                                value={formData.associateTechMentor}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">DT Mentor</label>
                            <input
                                type="text"
                                name="dtMentor"
                                value={formData.dtMentor}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                    </>
                );
            case 5:
                return (
                    <>
                        <h2 className="text-xl font-bold mb-4">Section 5: Uploads</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Image Upload (Thumbnail)</label>
                            <input
                                type="file"
                                name="image"
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">YouTube URL</label>
                            <input
                                type="url"
                                name="youtubeUrl"
                                value={formData.youtubeUrl}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">GitHub URL</label>
                            <input
                                type="url"
                                name="githubUrl"
                                value={formData.githubUrl}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">PPT Upload</label>
                            <input
                                type="file"
                                name="ppt"
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                    </>
                );
            default:
                return <></>;
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
            <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
                {renderSectionHeader()}
                {renderBreadcrumb()}
                <form onSubmit={(e) => e.preventDefault()}>
                    {renderSection()}
                    <div className="flex justify-between mt-6">
                        {currentSection > 1 && (
                            <button
                                type="button"
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                                onClick={handlePrevious}
                            >
                                Previous
                            </button>
                        )}
                        {currentSection < 5 ? (
                            <button
                                type="button"
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                onClick={handleNext}
                            >
                                Next
                            </button>
                        ) : (
                            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                                Submit
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormPage;
