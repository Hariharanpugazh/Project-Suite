import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCard";

const ProjectGrid = ({ projects }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 9;

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(projects.length / projectsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {currentProjects.map((project) => (
            <motion.div
              key={project.product_id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
      <div className="flex justify-center mt-8">
        {pageNumbers.map((number) => (
          <motion.button
            key={number}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentPage(number)}
            className={`mx-1 px-3 py-1 rounded-md transition-colors duration-200 ${
              currentPage === number
                ? "bg-indigo-600 text-white"
                : "bg-indigo-100 text-indigo-800"
            }`}
          >
            {number}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default ProjectGrid;
