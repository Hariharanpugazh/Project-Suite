import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, Search, X } from "lucide-react";

const colleges = [
  "SNSCT",
  "SNSCE",
  "SNSRCAS",
  "Dr.SNS",
  "SNSSPINE",
  "SNSCPHS",
  "SNSCAHS",
  "SNSNURSING",
  "SNSPHYSIO",
  "SNS ACADEMY",
];

const domains = [
  "Robotics and Automation",
  "AR/VR Metaverse Gaming & Digital Twins",
  "Data Science/AI/ML",
  "Internet Of Things",
  "Communication and growth tech",
  "Additive Manufacturing",
  "Low code development",
];

const Sidebar = ({
  isOpen,
  setIsOpen,
  searchTerm,
  setSearchTerm,
  selectedCollege,
  setSelectedCollege,
  selectedDomain,
  setSelectedDomain,
}) => {
  const [expandedCollege, setExpandedCollege] = useState(null);

  return (
    <>
      {/* Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)} // Close sidebar on overlay click
        ></div>
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? 0 : "-100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 bottom-0 w-80 bg-gradient-to-b from-indigo-100 to-indigo-50 shadow-xl z-50 overflow-y-auto"
      >
        {/* Sidebar Header */}
        <div className="bg-indigo-600 text-white py-4 px-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Filters</h2>
          <button
            className="text-white hover:bg-indigo-700 p-2 rounded-full"
            onClick={() => setIsOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="sticky top-0 bg-indigo-50 z-10 p-4 border-b border-indigo-200 shadow-sm">
          <div className="relative">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 pl-10 rounded-full border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-indigo-900 placeholder-indigo-400"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400"
              size={20}
            />
          </div>
        </div>

        {/* College Filter */}
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-3 text-indigo-900">Colleges</h3>
          {colleges.map((college) => (
            <div key={college} className="mb-3">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() =>
                  setSelectedCollege(selectedCollege === college ? "" : college)
                }
                className={`w-full text-left p-2 rounded-md flex justify-between items-center shadow-sm transition-transform duration-200 ${
                  selectedCollege === college
                    ? "bg-indigo-500 text-white"
                    : "bg-indigo-100 text-indigo-800"
                }`}
              >
                <span>{college}</span>
                {expandedCollege === college ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </motion.button>
            </div>
          ))}
        </div>

        {/* Domains Filter */}
        <div className="p-4 border-t border-indigo-200">
          <h3 className="text-lg font-semibold mb-3 text-indigo-900">Domains</h3>
          <div className="flex flex-wrap gap-3">
            {domains.map((domain) => (
              <motion.button
                key={domain}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  setSelectedDomain(selectedDomain === domain ? "" : domain)
                }
                className={`px-3 py-2 rounded-full text-sm font-medium transition-all shadow-sm duration-200 ${
                  selectedDomain === domain
                    ? "bg-indigo-500 text-white"
                    : "bg-indigo-100 text-indigo-800"
                }`}
              >
                {domain}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
