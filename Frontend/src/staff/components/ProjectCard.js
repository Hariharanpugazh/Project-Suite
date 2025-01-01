import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, Trash2 } from "lucide-react";

const ProjectCard = ({ project, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleViewProject = () => {
    const staff_id = localStorage.getItem("staff_id");
    if (staff_id) {
      window.location.href = `/${staff_id}/staffviewproject/${project.product_id}`;
    } else {
      console.error("Staff ID is not found in local storage.");
    }
  };

  const handleDeleteProject = async () => {
    setIsDeleting(true);
    setShowConfirmModal(false); // Close the modal
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/projects/delete/${project.product_id}/`, {
        method: "DELETE",
      });

      if (response.ok) {
        if (onDelete) onDelete(project.product_id); // Callback to update UI after deletion
        window.location.reload(); // Refresh the page
      } else {
        const error = await response.json();
        console.error("Failed to delete project:", error.error || "Unknown error");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl"
    >
      <div className="relative">
        {project.image && project.image.data && project.image.content_type ? (
          <img
            src={`data:${project.image.content_type};base64,${project.image.data}`}
            alt={project.title}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 flex items-center justify-center bg-gray-200">
            <span className="text-gray-500">No Image Available</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
          <h3 className="text-xl font-semibold text-white">{project.title}</h3>
        </div>
      </div>
      <div className="p-4">
        <p className="text-gray-600 mb-4 h-20 overflow-hidden">{project.description}</p>
        <div className="flex justify-between items-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleViewProject}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-md font-semibold transition-all duration-200 hover:from-indigo-700 hover:to-purple-700 flex items-center justify-center"
          >
            <Eye size={18} className="mr-2" />
            View Project
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowConfirmModal(true)}
            className="bg-red-500 text-white px-4 py-2 rounded-md font-semibold transition-all duration-200 hover:bg-red-600 flex items-center justify-center"
          >
            <Trash2 size={18} className="mr-2" />
            Remove
          </motion.button>
        </div>
      </div>

      {showConfirmModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-red-100 p-4 rounded-full inline-block mb-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-8 h-8 text-red-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </motion.div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Confirm Delete
        </h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this project? This action cannot be undone.
        </p>
      </div>
      <div className="flex justify-between">
        <button
          onClick={() => setShowConfirmModal(false)}
          className="w-1/2 text-gray-700 bg-gray-200 py-2 rounded-lg font-medium transition duration-200 hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={handleDeleteProject}
          className="w-1/2 ml-4 text-white bg-red-500 py-2 rounded-lg font-medium transition duration-200 hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </motion.div>
  </div>
)}

      {/* Loading Spinner */}
      {isDeleting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      )}
    </motion.div>
  );
};

export default ProjectCard;
