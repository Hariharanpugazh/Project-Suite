import React, { useState } from "react";

const FormPage = () => {
  const [formData, setFormData] = useState({
    projectName: "",
    tagline: "",
    description: "",
    keyFeatures: "",
    domain: "",
    techStack: "",
    githubUrl: "",
    demoUrl: "",
    image: null,
    ppt: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("projectName", formData.projectName || "");
    formDataToSend.append("tagline", formData.tagline || "");
    formDataToSend.append("description", formData.description || "");
    formDataToSend.append("keyFeatures", formData.keyFeatures || "");
    formDataToSend.append("domain", formData.domain || "");
    formDataToSend.append("techStack", formData.techStack || "");
    formDataToSend.append("githubUrl", formData.githubUrl || "");
    formDataToSend.append("demoUrl", formData.demoUrl || "");
    if (formData.image) formDataToSend.append("image", formData.image);
    if (formData.ppt) formDataToSend.append("ppt", formData.ppt);

    try {
        const response = await fetch("http://127.0.0.1:8000/api/projects/save-project/", {
            method: "POST",
            body: formDataToSend,
        });
        const result = await response.json();
        if (response.ok) {
            alert(`Project saved successfully! Product ID: ${result.product_id}`);
        } else {
            console.error(result);
            alert("Error saving project. Please check the console for details.");
        }
    } catch (error) {
        console.error(error);
        alert("An error occurred. Please try again.");
    }
};

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6">Add New Project</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Project Name</label>
          <input
            type="text"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Tagline</label>
          <input
            type="text"
            name="tagline"
            value={formData.tagline}
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
            rows="4"
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
            rows="3"
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
          <label className="block text-gray-700 font-bold mb-2">Tech Stack</label>
          <input
            type="text"
            name="techStack"
            value={formData.techStack}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
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
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Demo (YouTube URL)</label>
          <input
            type="url"
            name="demoUrl"
            value={formData.demoUrl}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Image Upload</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">PPT Upload</label>
          <input
            type="file"
            name="ppt"
            accept=".ppt,.pptx"
            onChange={handleChange}
            className="w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormPage;
