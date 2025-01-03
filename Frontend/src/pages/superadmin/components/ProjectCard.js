// ProjectCard.js
import React from "react";

const ProjectCard = ({ project }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
            <img src={project.imageUrl} alt={project.title} className="w-32 h-32 object-cover mb-4" />
            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
            <p className="text-gray-600 mb-4 text-center">{project.description}</p>
            <button className="bg-yellow-500 text-white px-4 py-2 rounded-full">View</button>
        </div>
    );
};

export default ProjectCard;
