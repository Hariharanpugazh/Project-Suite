import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaGithub, FaYoutube } from "react-icons/fa";
import { motion } from "framer-motion";

const ProjectDetailPage = () => {
  const { product_id } = useParams();
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/projects/${product_id}/`);
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
        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          src={`data:${project.image.content_type};base64,${project.image.data}`}
          alt={`${project.project_name} Thumbnail`}
          className="w-full h-64 object-cover rounded-lg shadow-md"
        />
      );
    }
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full h-64 bg-gradient-to-r from-blue-500 to-blue-700 text-white flex items-center justify-center rounded-lg shadow-md"
      >
        <p className="text-lg font-semibold">No Image Available</p>
      </motion.div>
    );
  };

  const handlePPTPreview = (ppt) => {
    if (ppt.data) {
      const binaryData = atob(ppt.data);
      const arrayBuffer = new Uint8Array(binaryData.length);
      for (let i = 0; i < binaryData.length; i++) {
        arrayBuffer[i] = binaryData.charCodeAt(i);
      }

      const blob = new Blob([arrayBuffer], { type: ppt.content_type });
      const url = URL.createObjectURL(blob);

      // Open the file in a new tab
      window.open(url, '_blank');
    } else {
      alert("PPT data not available");
    }
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

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-md p-10"
      >
        <div className="container mx-auto flex flex-col md:flex-row items-center md:items-start">
          <div className="md:w-1/2 mb-6 md:mb-0">{renderImage()}</div>
          <div className="md:w-1/2 md:pl-10">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">{project.project_name}</h2>
            <p className="text-xl italic text-blue-600 mb-6">{project.tagline}</p>
            <p className="text-lg text-gray-700">{project.description}</p>
          </div>
        </div>
      </motion.div>

      <main className="container mx-auto py-10 px-4 md:px-10">
        {/* Key Features, Domain, and Links */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-2xl font-bold text-blue-600 mb-4">Key Features</h3>
            <p className="text-gray-700 text-lg">{project.key_features}</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-2xl font-bold text-blue-600 mb-4">Domain</h3>
            <p className="text-gray-700 text-lg">{project.domain}</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-2xl font-bold text-blue-600 mb-4">Links</h3>
            <div className="flex space-x-4">
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition"
              >
                <FaGithub className="mr-2" /> GitHub
              </a>
              {project.demo_url && (
                <a
                  href={project.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-red-600 text-white px-4 py-2 rounded-md shadow hover:bg-red-700 transition"
                >
                  <FaYoutube className="mr-2" /> Live Demo
                </a>
              )}
              {project.ppt && (
                <button
                  onClick={() => handlePPTPreview(project.ppt)}
                  className="flex items-center bg-green-600 text-white px-4 py-2 rounded-md shadow hover:bg-green-700 transition"
                >
                  Preview PPT
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-10 bg-white shadow-md rounded-lg p-6"
        >
          <h3 className="text-3xl font-bold text-blue-600 mb-6">Tech Stack</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xl font-semibold text-gray-800">Presentation Layer</h4>
              <p className="text-gray-700 text-lg">{project.presentation_layer}</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-gray-800">Application Layer</h4>
              <p className="text-gray-700 text-lg">{project.application_layer}</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-gray-800">Data Layer</h4>
              <p className="text-gray-700 text-lg">{project.data_layer}</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-gray-800">Methodology</h4>
              <p className="text-gray-700 text-lg">{project.methodology}</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-gray-800">Tools</h4>
              <p className="text-gray-700 text-lg">{project.tools}</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-gray-800">API</h4>
              <p className="text-gray-700 text-lg">{project.api}</p>
            </div>
          </div>
        </motion.div>

        {/* Team Details */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-10 bg-white shadow-md rounded-lg p-6"
        >
          <h3 className="text-3xl font-bold text-blue-600 mb-6">Team Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {project.associate_project_mentor && (
              <div>
                <h4 className="text-xl font-semibold text-gray-800">Associate Project Mentor</h4>
                <p className="text-gray-700 text-lg">{project.associate_project_mentor}</p>
              </div>
            )}
            {project.associate_tech_mentor && (
              <div>
                <h4 className="text-xl font-semibold text-gray-800">Associate Tech Mentor</h4>
                <p className="text-gray-700 text-lg">{project.associate_tech_mentor}</p>
              </div>
            )}
            {project.dt_mentor && (
              <div>
                <h4 className="text-xl font-semibold text-gray-800">Domain Technical Mentor</h4>
                <p className="text-gray-700 text-lg">{project.dt_mentor}</p>
              </div>
            )}
            {Array.isArray(project.team_names) &&
              project.team_names
                .filter((name) => name !== "NA")
                .map((name, index) => (
                  <div key={index}>
                    <h4 className="text-xl font-semibold text-gray-800">Team Member {index + 1}</h4>
                    <p className="text-gray-700 text-lg">{name}</p>
                  </div>
                ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default ProjectDetailPage;
