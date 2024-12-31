import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaGithub, FaYoutube, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";

const ProjectDetailPage = () => {
  const { staff_id, product_id } = useParams();
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedProject, setEditedProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/projects/${product_id}/`);
        const data = await response.json();
        setProject(data);
        setEditedProject(data);
      } catch (error) {
        console.error("Error fetching project:", error);
        setError("An error occurred while fetching the project.");
      }
    };

    fetchProject();
  }, [product_id]);

  const handleSave = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/projects/${product_id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedProject),
      });
      const data = await response.json();
      setProject(data);
      setEditMode(false);
    } catch (error) {
      console.error("Error saving project:", error);
      setError("An error occurred while saving the project.");
    }
  };

  const handleCancel = () => {
    setEditedProject(project);
    setEditMode(false);
  };

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  if (!project) {
    return <div className="text-gray-500 text-center mt-4">Loading project...</div>;
  }

  const getImageSrc = (image) => {
    return image.startsWith("data:") ? image : `data:image/jpeg;base64,${image}`;
  };

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    setEditedProject((prevProject) => ({
      ...prevProject,
      [field]: value,
    }));
  };

  const handleTeamMemberChange = (index, field, value) => {
    const newTeamMembers = [...editedProject.team_members];
    newTeamMembers[index][field] = value;
    setEditedProject((prevProject) => ({
      ...prevProject,
      team_members: newTeamMembers,
    }));
  };

  const handleMentorChange = (key, field, value) => {
    const newMentors = { ...editedProject.mentors };
    newMentors[key][field] = value;
    setEditedProject((prevProject) => ({
      ...prevProject,
      mentors: newMentors,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-6 px-10 shadow-lg">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto flex justify-between items-center"
        >
          <h1 className="text-3xl font-bold">SNS Project Suite</h1>
          <p className="italic text-lg">Innovation for the Future</p>
        </motion.div>
      </header>

      <main className="container mx-auto py-10 px-4 md:px-10">
        {/* General Details */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white shadow-md rounded-lg p-6"
        >
          <h2 className="text-4xl font-bold mb-4">{project.title}</h2>
          <p className="text-lg text-gray-700 mb-2">Description: {project.description}</p>
          <p className="text-lg text-gray-700">Problem Statement: {project.problem_statement}</p>
        </motion.div>

        {/* Key Features, Scope, and Layers */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-4">Key Features</h3>
            {editMode ? (
              <textarea
                value={editedProject.key_features || ""}
                onChange={(e) => handleInputChange(e, "key_features")}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            ) : (
              <p>{project.key_features || "No key features available"}</p>
            )}
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-4">Layers</h3>
            {editMode ? (
              <>
                <input
                  type="text"
                  value={editedProject.presentation_layer || ""}
                  onChange={(e) => handleInputChange(e, "presentation_layer")}
                  className="w-full p-2 border border-gray-300 rounded-md mb-2"
                  placeholder="Presentation Layer"
                />
                <input
                  type="text"
                  value={editedProject.application_layer || ""}
                  onChange={(e) => handleInputChange(e, "application_layer")}
                  className="w-full p-2 border border-gray-300 rounded-md mb-2"
                  placeholder="Application Layer"
                />
                <input
                  type="text"
                  value={editedProject.data_layer || ""}
                  onChange={(e) => handleInputChange(e, "data_layer")}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Data Layer"
                />
              </>
            ) : (
              <>
                <p>Presentation: {project.presentation_layer || "N/A"}</p>
                <p>Application: {project.application_layer || "N/A"}</p>
                <p>Data: {project.data_layer || "N/A"}</p>
              </>
            )}
          </div>
        </motion.div>

        {/* Tags and Domains */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-4">Tags</h3>
            {Array.isArray(project.tags) && project.tags.length > 0 ? (
              project.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-sm mr-2"
                >
                  {tag}
                </span>
              ))
            ) : (
              <p className="text-gray-700">No tags available.</p>
            )}
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-4">Domains</h3>
            {Array.isArray(project.domains) && project.domains.length > 0 ? (
              project.domains.map((domain, index) => (
                <span
                  key={index}
                  className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-sm mr-2"
                >
                  {domain}
                </span>
              ))
            ) : (
              <p className="text-gray-700">No domains available.</p>
            )}
          </div>
        </motion.div>

        {/* Mentors and Team */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-6 bg-white shadow-md rounded-lg p-6"
        >
          <h3 className="text-2xl font-bold mb-4">Team & Mentors</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {editedProject.team_members.map((member, index) => (
              <div key={index} className="flex items-center space-x-4">
                <img
                  src={getImageSrc(member.image)}
                  alt={member.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                {editMode ? (
                  <input
                    type="text"
                    value={member.name}
                    onChange={(e) => handleTeamMemberChange(index, "name", e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Member Name"
                  />
                ) : (
                  <p className="text-gray-700 font-medium">{member.name}</p>
                )}
              </div>
            ))}
          </div>
          <div className="mt-6">
            <h4 className="text-xl font-semibold text-gray-800 mb-2">Mentors</h4>
            {Object.entries(editedProject.mentors).map(([key, mentor], index) => (
              <div key={index} className="flex items-center space-x-4 mb-4">
                <img
                  src={getImageSrc(mentor.image)}
                  alt={mentor.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                {editMode ? (
                  <input
                    type="text"
                    value={mentor.name}
                    onChange={(e) => handleMentorChange(key, "name", e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Mentor Name"
                  />
                ) : (
                  <p className="text-gray-700 font-medium">
                    {key.replace(/_/g, " ").toUpperCase()}: {mentor.name}
                  </p>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Links */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-6 bg-white shadow-md rounded-lg p-6"
        >
          <h3 className="text-2xl font-bold mb-4">Links</h3>
          <div className="flex space-x-4">
            <a href={project.github_url || "#"} className="text-blue-600 hover:underline">GitHub</a>
            <a href={project.demo_url || "#"} className="text-blue-600 hover:underline">Live Demo</a>
            <a href={project.ppt_url || "#"} className="text-blue-600 hover:underline">PPT</a>
          </div>
        </motion.div>

        {/* Edit Button */}
        <div className="flex justify-end mt-10 space-x-4">
          {editMode ? (
            <>
              <button
                className="flex items-center bg-red-600 text-white px-4 py-2 rounded-md shadow hover:bg-red-700 transition"
                onClick={handleCancel}
              >
                <FaTimes className="mr-2" /> Cancel
              </button>
              <button
                className="flex items-center bg-green-600 text-white px-4 py-2 rounded-md shadow hover:bg-green-700 transition"
                onClick={handleSave}
              >
                <FaSave className="mr-2" /> Save
              </button>
            </>
          ) : (
            <button
              className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition"
              onClick={() => setEditMode(true)}
            >
              <FaEdit className="mr-2" /> Edit
            </button>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProjectDetailPage;
