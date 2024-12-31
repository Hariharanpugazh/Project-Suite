import React from "react";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";

const ProjectCard = ({ project }) => {
  const handleViewProject = () => {
    window.location.href = `/project/${project.product_id}`;
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
        {/* Project Description */}
        <p className="text-gray-600 mb-4 h-20 overflow-hidden">{project.description}</p>

        {/* College */}
        <div className="mb-4">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
            {project.college}
          </span>
        </div>

        {/* Domains and Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.domains?.map((domain, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium"
            >
              {domain}
            </span>
          ))}
          {project.tags?.map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* View Project Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleViewProject}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-md font-semibold transition-all duration-200 hover:from-indigo-700 hover:to-purple-700 flex items-center justify-center"
        >
          <Eye size={18} className="mr-2" />
          View Project
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
