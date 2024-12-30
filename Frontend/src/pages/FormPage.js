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

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        // Handle file inputs
        if (files) {
            if (
                name === "image" &&
                files[0]?.type.startsWith("image/")
            ) {
                setFormData({ ...formData, [name]: files[0] });
            } else if (
                name === "ppt" &&
                (files[0]?.type ===
                    "application/vnd.ms-powerpoint" ||
                    files[0]?.type ===
                        "application/vnd.openxmlformats-officedocument.presentationml.presentation")
            ) {
                setFormData({ ...formData, [name]: files[0] });
            } else {
                alert("Invalid file format. Please upload a valid file.");
            }
        } else {
            // Handle text inputs
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleTeamNameChange = (index, value) => {
        const updatedTeamNames = [...formData.teamNames];
        updatedTeamNames[index] = value || "NA"; // Default to "NA" if value is empty
        setFormData({ ...formData, teamNames: updatedTeamNames });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();

        // Convert form data to FormData object
        Object.keys(formData).forEach((key) => {
            if (Array.isArray(formData[key])) {
                // Handle array fields like teamNames
                formData[key].forEach((value, index) => {
                    formDataToSend.append(`${key}[${index}]`, value || "NA");
                });
            } else if (formData[key] instanceof File) {
                // Handle file fields
                formDataToSend.append(key, formData[key]);
            } else {
                // Handle other fields
                formDataToSend.append(key, formData[key] || "");
            }
        });

        try {
            const response = await fetch(
                "http://127.0.0.1:8000/api/projects/save-project/",
                {
                    method: "POST",
                    body: formDataToSend,
                }
            );

            const result = await response.json();
            if (response.ok) {
                alert(
                    `Project saved successfully! Product ID: ${result.product_id}`
                );
            } else {
                console.error(result);
                alert("Error saving project. Please check the console for details.");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred. Please try again.");
        }
    };

    const renderCurrentFields = () => {
        const validateField = (field, errorMessage) => {
            if (!formData[field] || formData[field].toString().trim() === "") {
                const errorElement = document.getElementById(`${field}-error`);
                if (errorElement) {
                    errorElement.textContent = errorMessage;
                    errorElement.style.display = "block";
                }
                return false;
            }
            const errorElement = document.getElementById(`${field}-error`);
            if (errorElement) {
                errorElement.style.display = "none";
            }
            return true;
        };
    
        switch (currentSection) {
            case 1:
                return (
                    <>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md"
                                onBlur={() => validateField("title", "Title is required.")}
                                required
                            />
                            <p id="title-error" className="text-red-500 text-sm hidden"></p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md"
                                rows="4"
                                onBlur={() => validateField("description", "Description is required.")}
                                required
                            />
                            <p id="description-error" className="text-red-500 text-sm hidden"></p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">College</label>
                            <select
                                name="college"
                                value={formData.college}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md"
                                onBlur={() => validateField("college", "Please select a college.")}
                                required
                            >
                                <option value="SNSCE">SNSCE</option>
                                <option value="SNSCT">SNSCT</option>
                                <option value="SNSRCAS">SNSRCAS</option>
                            </select>
                            <p id="college-error" className="text-red-500 text-sm hidden"></p>
                        </div>
                    </>
                );
            case 2:
                return (
                    <>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Problem Statement</label>
                            <textarea
                                name="problemStatement"
                                value={formData.problemStatement}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md"
                                rows="3"
                                onBlur={() => validateField("problemStatement", "Problem Statement is required.")}
                                required
                            />
                            <p id="problemStatement-error" className="text-red-500 text-sm hidden"></p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Key Features</label>
                            <textarea
                                name="keyFeatures"
                                value={formData.keyFeatures}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md"
                                rows="3"
                                onBlur={() => validateField("keyFeatures", "Key Features are required.")}
                                required
                            />
                            <p id="keyFeatures-error" className="text-red-500 text-sm hidden"></p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Scope</label>
                            <textarea
                                name="scope"
                                value={formData.scope}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md"
                                rows="3"
                                onBlur={() => validateField("scope", "Scope is required.")}
                                required
                            />
                            <p id="scope-error" className="text-red-500 text-sm hidden"></p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Domain</label>
                            <input
                                type="text"
                                name="domain"
                                value={formData.domain}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md"
                                onBlur={() => validateField("domain", "Domain is required.")}
                                required
                            />
                            <p id="domain-error" className="text-red-500 text-sm hidden"></p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Tags</label>
                            <input
                                type="text"
                                name="tags"
                                value={formData.tags}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md"
                                onBlur={() => validateField("tags", "Tags are required.")}
                                required
                            />
                            <p id="tags-error" className="text-red-500 text-sm hidden"></p>
                        </div>
                    </>
                );
            case 3:
                return (
                    <>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Presentation Layer</label>
                            <input
                                type="text"
                                name="presentationLayer"
                                value={formData.presentationLayer}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md"
                                onBlur={() => validateField("presentationLayer", "Presentation Layer is required.")}
                                required
                            />
                            <p id="presentationLayer-error" className="text-red-500 text-sm hidden"></p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Application Layer</label>
                            <input
                                type="text"
                                name="applicationLayer"
                                value={formData.applicationLayer}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md"
                                onBlur={() => validateField("applicationLayer", "Application Layer is required.")}
                                required
                            />
                            <p id="applicationLayer-error" className="text-red-500 text-sm hidden"></p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Data Layer</label>
                            <input
                                type="text"
                                name="dataLayer"
                                value={formData.dataLayer}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md"
                                onBlur={() => validateField("dataLayer", "Data Layer is required.")}
                                required
                            />
                            <p id="dataLayer-error" className="text-red-500 text-sm hidden"></p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Methodology</label>
                            <input
                                type="text"
                                name="methodology"
                                value={formData.methodology}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md"
                                onBlur={() => validateField("methodology", "Methodology is required.")}
                                required
                            />
                            <p id="methodology-error" className="text-red-500 text-sm hidden"></p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Tools</label>
                            <input
                                type="text"
                                name="tools"
                                value={formData.tools}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md"
                                onBlur={() => validateField("tools", "Tools are required.")}
                                required
                            />
                            <p id="tools-error" className="text-red-500 text-sm hidden"></p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">API</label>
                            <input
                                type="text"
                                name="api"
                                value={formData.api}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md"
                                onBlur={() => validateField("api", "API is required.")}
                                required
                            />
                            <p id="api-error" className="text-red-500 text-sm hidden"></p>
                        </div>
                    </>
                );
                case 4:
    return (
        <>
            <div className="grid grid-cols-2 gap-4">
                {[0, 1, 2, 3].map((index) => (
                    <div key={index} className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">
                            Teammate {index + 1} Name
                        </label>
                        <input
                            type="text"
                            name={`teamNames[${index}]`}
                            value={formData.teamNames[index] || ""}
                            onChange={(e) => handleTeamNameChange(index, e.target.value)}
                            className="w-full px-3 py-2 border rounded-md"
                            onBlur={() => {
                                // If empty, set default value as "NA"
                                if (
                                    !formData.teamNames[index] ||
                                    formData.teamNames[index].trim() === ""
                                ) {
                                    handleTeamNameChange(index, "NA");
                                }
                            }}
                            required
                        />
                        <p
                            id={`teamNames[${index}]-error`}
                            className="text-red-500 text-sm hidden"
                        ></p>
                    </div>
                ))}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                    Associate Project Mentor
                </label>
                <input
                    type="text"
                    name="associateProjectMentor"
                    value={formData.associateProjectMentor}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                    onBlur={() =>
                        validateField(
                            "associateProjectMentor",
                            "Associate Project Mentor is required."
                        )
                    }
                    required
                />
                <p
                    id="associateProjectMentor-error"
                    className="text-red-500 text-sm hidden"
                ></p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                    Associate Technology Mentor
                </label>
                <input
                    type="text"
                    name="associateTechMentor"
                    value={formData.associateTechMentor}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                    onBlur={() =>
                        validateField(
                            "associateTechMentor",
                            "Associate Technology Mentor is required."
                        )
                    }
                    required
                />
                <p
                    id="associateTechMentor-error"
                    className="text-red-500 text-sm hidden"
                ></p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                    DT Mentor
                </label>
                <input
                    type="text"
                    name="dtMentor"
                    value={formData.dtMentor}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                    onBlur={() =>
                        validateField("dtMentor", "DT Mentor is required.")
                    }
                    required
                />
                <p id="dtMentor-error" className="text-red-500 text-sm hidden"></p>
            </div>
        </>
    );
                
            case 5:
                return (
                    <>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Image Upload</label>
                            <input
                                type="file"
                                name="image"
                                onChange={handleChange}
                                className="w-full"
                                accept="image/*"
                                onBlur={() => validateField("image", "Please upload a valid image file.")}
                                required
                            />
                            <p id="image-error" className="text-red-500 text-sm hidden"></p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">YouTube URL</label>
                            <input
                                type="url"
                                name="youtubeUrl"
                                value={formData.youtubeUrl}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md"
                                onBlur={() => validateField("youtubeUrl", "YouTube URL is required.")}
                                required
                            />
                            <p id="youtubeUrl-error" className="text-red-500 text-sm hidden"></p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">GitHub URL</label>
                            <input
                                type="url"
                                name="githubUrl"
                                value={formData.githubUrl}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md"
                                onBlur={() => validateField("githubUrl", "GitHub URL is required.")}
                                required
                            />
                            <p id="githubUrl-error" className="text-red-500 text-sm hidden"></p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">PPT Upload</label>
                            <input
                                type="file"
                                name="ppt"
                                onChange={handleChange}
                                className="w-full"
                                accept=".ppt,.pptx"
                                onBlur={() => validateField("ppt", "Please upload a valid PPT file.")}
                                required
                            />
                            <p id="ppt-error" className="text-red-500 text-sm hidden"></p>
                        </div>
                    </>
                );
            default:
                return null;
        }
    };
    
    

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
            <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
                <form onSubmit={handleSubmit}>
                    {renderCurrentFields()}
                    <div className="flex justify-between mt-6">
                        {currentSection > 1 && (
                            <button
                                type="button"
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                                onClick={() => setCurrentSection((prev) => prev - 1)}
                            >
                                Previous
                            </button>
                        )}
                        {currentSection < 5 ? (
                            <button
                                type="button"
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                onClick={() => setCurrentSection((prev) => prev + 1)}
                            >
                                Next
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="bg-green-500 text-white px-4 py-2 rounded"
                            >
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
