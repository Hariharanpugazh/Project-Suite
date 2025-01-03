import React, { useState, useEffect } from 'react';

function Filters({ onFilterChange }) {
  const [filters, setFilters] = useState({
    categories: [],
    domains: []
  });

  const categories = [
    'SNSCT', 'SNSCE', 'Dr.SNSICAS', 'Dr.SNSCE', 
    'SNSBSPINE', 'SNSEPHS', 'SNSCAHS', 'SNSCNURSING', 
    'SNSCPHYSIO', 'SNS ACADEMY'
  ];

  const domains = [
    'Machine Learning', 'Artificial Intelligence', 
    'GenAI', 'Blockchain', 'IoT', 'Big Data', 
    'Embedded Systems'
  ];

  const handleCategoryChange = (category) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    
    const newFilters = { ...filters, categories: newCategories };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleDomainChange = (domain) => {
    const newDomains = filters.domains.includes(domain)
      ? filters.domains.filter(d => d !== domain)
      : [...filters.domains, domain];
    
    const newFilters = { ...filters, domains: newDomains };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    setFilters({ categories: [], domains: [] });
    onFilterChange({ categories: [], domains: [] });
  };

  return (
    <div className="w-64 rounded-lg bg-gray-50 p-6 shadow-lg">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search..."
          className="w-full rounded-lg border border-gray-200 p-2 text-sm"
        />
      </div>
      <div className="mb-4">
        <h3 className="mb-3 text-lg font-medium">Filters</h3>
        <div className="space-y-2">
          {categories.map(category => (
            <label key={category} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.categories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="mr-2"
              />
              <span className="text-sm">{category}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <h3 className="mb-3 text-lg font-medium">Domains</h3>
        <div className="flex flex-wrap gap-2">
          {domains.map(domain => (
            <button
              key={domain}
              onClick={() => handleDomainChange(domain)}
              className={`rounded-full bg-gray-100 px-3 py-1 text-sm ${
                filters.domains.includes(domain)
                  ? 'bg-gray-200'
                  : 'hover:bg-gray-200'
              }`}
            >
              {domain}
            </button>
          ))}
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onFilterChange(filters)}
          className="rounded-md bg-yellow-500 px-4 py-2 text-sm font-medium text-black hover:bg-yellow-400"
        >
          Apply
        </button>
        <button
          onClick={clearFilters}
          className="rounded-md border border-gray-200 px-4 py-2 text-sm hover:bg-gray-50"
        >
          Clear all filters
        </button>
      </div>
    </div>
  );
}

function ProjectGrid({ projects }) {
  return (
    <div className="flex-1">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div key={project.id} className="overflow-hidden rounded-lg bg-[#0F172A]">
            {/* Decode and render base64 image */}
            <img
              src={`data:${project.image.content_type};base64,${project.image.data}`}
              alt={`${project.title} thumbnail`}
              className="h-48 w-full object-cover"
            />
            <div className="p-6">
              <h3 className="mb-2 text-xl font-semibold text-white">{project.title}</h3>
              <p className="mb-2 text-sm text-gray-300">{project.description}</p>
              <p className="mb-2 text-xs text-gray-400">College: {project.college}</p>
              <p className="mb-4 text-xs text-gray-400">Domain: {project.domains?.join(", ")}</p>
              <button className="rounded-md bg-yellow-500 px-4 py-2 text-sm font-medium text-black hover:bg-yellow-400">
                View Project
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProjects = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/projects/get-projects/");
      const data = await response.json();
      setProjects(data);
      setFilteredProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleFilterChange = (filters) => {
    const filtered = projects.filter((project) => {
      const categoryMatch = !filters.categories.length || filters.categories.includes(project.college);
      const domainMatch = !filters.domains.length || project.domains?.some((domain) => filters.domains.includes(domain));
      return categoryMatch && domainMatch;
    });
    setFilteredProjects(filtered);
  };

  const startIndex = (currentPage - 1) * 10;
  const displayedProjects = filteredProjects.slice(startIndex, startIndex + 10);

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="mb-8 text-4xl font-bold">Explore Projects</h1>
      <div className="flex gap-8">
        <Filters onFilterChange={handleFilterChange} />
        <div className="flex-1">
          <ProjectGrid projects={displayedProjects} />
          <Pagination currentPage={currentPage} onPageChange={setCurrentPage} />
        </div>
      </div>
    </div>
  );
}

function Pagination({ currentPage, onPageChange }) {
  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:text-gray-400"
      >
        ←
      </button>
      {[1, 2, 3].map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`rounded px-3 py-1 ${
            currentPage === page
              ? 'bg-gray-900 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === 3}
        className="rounded px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:text-gray-400"
      >
        →
      </button>
    </div>
  );
}

export default ProjectsPage;
