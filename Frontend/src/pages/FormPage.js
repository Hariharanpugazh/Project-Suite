import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function FormPage() {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedDomains, setSelectedDomains] = useState([]);

  const domains = [
    "Robotics & Automation",
    "Metaverse Gaming & Digital Twins",
    "Data Science / AI / ML",
    "Internet of Things",
    "Communication and Growth Tec",
    "Additive Manufacturing (3D Printing)",
    "Low Code Development"
  ];

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    college: "",
    problemStatement: "",
    keyFeatures: "",
    scope: "",
    presentationLayer: "",
    applicationLayer: "",
    dataLayer: "",
    methodology: "",
    tools: "",
    api: "",
    teamCount: 1,
    teamMembers: [{ name: "", image: null }],
    associateProjectMentor: "",
    associateProjectMentorImage: null,
    associateTechMentor: "",
    associateTechMentorImage: null,
    dtMentor: "",
    dtMentorImage: null,
    image: null,
    youtubeUrl: "",
    githubUrl: "",
    ppt: "",
  });

  const handleTagAdd = (tag) => {
    if (selectedTags.length < 4 && !selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleDomainSelect = (domain) => {
    if (selectedDomains.includes(domain)) {
      setSelectedDomains(selectedDomains.filter(d => d !== domain));
    } else if (selectedDomains.length < 2) {
      setSelectedDomains([...selectedDomains, domain]);
    }
  };

  const validateSection = (section) => {
    let isValid = true;
    let errorMessage = "";

    switch (section) {
      case 1:
        if (!formData.title.trim() || !formData.description.trim() || !formData.college) {
          isValid = false;
          errorMessage = "Please fill in all required fields in the Form section.";
        }
        break;
      case 2:
        if (!formData.problemStatement.trim() || !formData.keyFeatures.trim() || !formData.scope.trim() || selectedTags.length === 0 || selectedDomains.length === 0) {
          isValid = false;
          errorMessage = "Please fill in all required fields in the Project Info section.";
        }
        break;
      case 3:
        if (!formData.presentationLayer.trim() || !formData.applicationLayer.trim() || !formData.dataLayer.trim() || !formData.methodology.trim() || !formData.tools.trim()) {
          isValid = false;
          errorMessage = "Please fill in all required fields in the Tech Stack section.";
        }
        break;
      case 4:
        const allTeamMembersValid = formData.teamMembers.every(member => member.name.trim() && member.image);
        if (!allTeamMembersValid || !formData.associateProjectMentor.trim() || !formData.associateProjectMentorImage || !formData.associateTechMentor.trim() || !formData.associateTechMentorImage || !formData.dtMentor.trim() || !formData.dtMentorImage) {
          isValid = false;
          errorMessage = "Please fill in all required fields in the Team Info section.";
        }
        break;
      case 5:
        if (!formData.image || !formData.youtubeUrl.trim() || !formData.githubUrl.trim() || !formData.ppt.trim()) {
          isValid = false;
          errorMessage = "Please fill in all required fields in the Uploads section.";
        }
        break;
      default:
        break;
    }

    return { isValid, errorMessage };
  };

  const handleNextSection = () => {
    const { isValid, errorMessage } = validateSection(currentSection);
    if (isValid) {
      setCurrentSection(prev => prev + 1);
    } else {
      toast.warning(errorMessage, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData(prevData => ({ ...prevData, [name]: files[0] }));
    }
  };

  const handleTeamMemberChange = (index, field, value) => {
    const newTeamMembers = [...formData.teamMembers];
    newTeamMembers[index] = { ...newTeamMembers[index], [field]: value };
    setFormData(prevData => ({ ...prevData, teamMembers: newTeamMembers }));
  };

  const renderProgress = () => {
    const progress = (currentSection / 5) * 100;
    return (
      <div className="w-full mb-8">
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div className="flex-1">
              <div className="relative h-2 overflow-hidden rounded-full bg-gray-200">
                <div
                  style={{ width: `${progress}%` }}
                  className="absolute h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300 ease-in-out"
                ></div>
              </div>
            </div>
          </div>
          <div className="flex justify-between text-xs font-medium uppercase tracking-wider text-gray-600">
            <div className={`${currentSection >= 1 ? 'text-indigo-600' : ''}`}>Form</div>
            <div className={`${currentSection >= 2 ? 'text-indigo-600' : ''}`}>Project Info</div>
            <div className={`${currentSection >= 3 ? 'text-indigo-600' : ''}`}>Tech Stack</div>
            <div className={`${currentSection >= 4 ? 'text-indigo-600' : ''}`}>Team Info</div>
            <div className={`${currentSection >= 5 ? 'text-indigo-600' : ''}`}>Uploads</div>
          </div>
        </div>
      </div>
    );
  };

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                placeholder="Enter project title (max 50 characters)"
              />
              <p className="text-xs text-gray-500">{formData.title.length}/50 characters</p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                placeholder="Enter project description"
              />
              <p className="text-xs text-gray-500">{formData.description.length}/500 characters</p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                College <span className="text-red-500">*</span>
              </label>
              <select
                name="college"
                value={formData.college}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              >
                <option value="">Select your college</option>
                <option value="SNSCE">SNSCE</option>
                <option value="SNSCT">SNSCT</option>
                <option value="SNSRCAS">SNSRCAS</option>
                <option value="Dr. SNSCE">Dr. SNSCE</option>
                <option value="SNSBSPINE">SNSBSPINE</option>
                <option value="SNSCPHS">SNSCPHS</option>
                <option value="SNSCAHS">SNSCAHS</option>
                <option value="SNSCNURSING">SNSCNURSING</option>
                <option value="SNSCPHYSIO">SNSCPHYSIO</option>
                <option value="SNS ACADEMY">SNS ACADEMY</option>
              </select>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Problem Statement <span className="text-red-500">*</span>
              </label>
              <textarea
                name="problemStatement"
                value={formData.problemStatement}
                onChange={handleChange}
                required
                rows="4"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                placeholder="Describe the problem your project addresses"
              />
              <p className="text-xs text-gray-500">{formData.problemStatement.length}/500 characters</p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Key Features <span className="text-red-500">*</span>
              </label>
              <textarea
                name="keyFeatures"
                value={formData.keyFeatures}
                onChange={handleChange}
                required
                rows="4"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                placeholder="List the key features of your project"
              />
              <p className="text-xs text-gray-500">{formData.keyFeatures.length}/500 characters</p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Scope <span className="text-red-500">*</span>
              </label>
              <textarea
                name="scope"
                value={formData.scope}
                onChange={handleChange}
                required
                rows="4"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                placeholder="Define the scope of your project"
              />
              <p className="text-xs text-gray-500">{formData.scope.length}/500 characters</p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Tags <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {selectedTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => setSelectedTags(selectedTags.filter(t => t !== tag))}
                      className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-indigo-200"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <input
                placeholder="Type a tag and press Enter"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const value = e.target.value.trim();
                    if (value) {
                      handleTagAdd(value);
                      e.target.value = '';
                    }
                  }
                }}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Domains <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {domains.map((domain) => (
                  <button
                    key={domain}
                    type="button"
                    onClick={() => handleDomainSelect(domain)}
                    className={`p-3 text-sm rounded-lg border transition-all duration-200 ${
                      selectedDomains.includes(domain)
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                        : 'border-gray-300 hover:border-indigo-300'
                    }`}
                  >
                    {domain}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Presentation Layer <span className="text-red-500">*</span>
              </label>
              <input
                name="presentationLayer"
                value={formData.presentationLayer}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                placeholder="e.g., React, Vue.js, Angular"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Application Layer <span className="text-red-500">*</span>
              </label>
              <input
                name="applicationLayer"
                value={formData.applicationLayer}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                placeholder="e.g., Node.js, Django, Ruby on Rails"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Data Layer <span className="text-red-500">*</span>
              </label>
              <input
                name="dataLayer"
                value={formData.dataLayer}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                placeholder="e.g., MySQL, MongoDB, PostgreSQL"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Methodology <span className="text-red-500">*</span>
              </label>
              <input
                name="methodology"
                value={formData.methodology}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                placeholder="e.g., Agile, Scrum, Waterfall"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Tools <span className="text-red-500">*</span>
              </label>
              <input
                name="tools"
                value={formData.tools}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                placeholder="e.g., Git, JIRA, Docker"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                API <span className="text-gray-500 text-sm">(optional)</span>
              </label>
              <input
                name="api"
                value={formData.api}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                placeholder="e.g., Gemini API"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Team Members <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.teamCount}
                onChange={(e) => {
                  const count = parseInt(e.target.value);
                  setFormData({
                    ...formData,
                    teamCount: count,
                    teamMembers: Array(count).fill().map((_, i) => formData.teamMembers[i] || { name: "", image: null }),
                  });
                }}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num} Member{num > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>

            {formData.teamMembers.map((member, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Team Member {index + 1} <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={member.name}
                    onChange={(e) => handleTeamMemberChange(index, "name", e.target.value)}
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    placeholder={`Enter name of team member ${index + 1}`}
                  />
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      onChange={(e) => handleTeamMemberChange(index, "image", e.target.files[0])}
                      accept="image/*"
                      required
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    />
                  </div>
                </div>
              </div>
            ))}

            <div className="space-y-4 p-4 border border-gray-200 rounded-lg">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Associate Project Mentor <span className="text-red-500">*</span>
                </label>
                <input
                  name="associateProjectMentor"
                  value={formData.associateProjectMentor}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  placeholder="Enter name of associate project mentor"
                />
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    name="associateProjectMentorImage"
                    onChange={handleFileChange}
                    accept="image/*"
                    required
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 p-4 border border-gray-200 rounded-lg">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Associate Technology Mentor <span className="text-red-500">*</span>
                </label>
                <input
                  name="associateTechMentor"
                  value={formData.associateTechMentor}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  placeholder="Enter name of associate technology mentor"
                />
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    name="associateTechMentorImage"
                    onChange={handleFileChange}
                    accept="image/*"
                    required
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 p-4 border border-gray-200 rounded-lg">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  DT Mentor <span className="text-red-500">*</span>
                </label>
                <input
                  name="dtMentor"
                  value={formData.dtMentor}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  placeholder="Enter name of DT mentor"
                />
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    name="dtMentorImage"
                    onChange={handleFileChange}
                    accept="image/*"
                    required
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="p-4 border border-gray-200 rounded-lg space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Project Image <span className="text-red-500">*</span>
              </label>
              <input
                name="image"
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                required
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
            </div>

            <div className="p-4 border border-gray-200 rounded-lg space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                YouTube URL <span className="text-red-500">*</span>
              </label>
              <input
                name="youtubeUrl"
                type="url"
                value={formData.youtubeUrl}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                placeholder="https://www.youtube.com/watch?v=..."
              />
            </div>

            <div className="p-4 border border-gray-200 rounded-lg space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                GitHub URL <span className="text-red-500">*</span>
              </label>
              <input
                name="githubUrl"
                type="url"
                value={formData.githubUrl}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                placeholder="https://github.com/username/repository"
              />
            </div>

            <div className="p-4 border border-gray-200 rounded-lg space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                PPT Drive URL <span className="text-red-500">*</span>
              </label>
              <input
                name="ppt"
                type="url"
                value={formData.ppt}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                placeholder="https://drive.google.com/..."
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all sections before submission
    for (let i = 1; i <= 5; i++) {
      const { isValid, errorMessage } = validateSection(i);
      if (!isValid) {
        toast.error(errorMessage);
        setCurrentSection(i);
        return;
      }
    }

    setIsLoading(true);

    try {
      const formDataToSend = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (value instanceof File) {
          formDataToSend.append(key, value);
        } else if (Array.isArray(value)) {
          value.forEach((item, index) => {
            if (typeof item === 'object' && item !== null) {
              Object.entries(item).forEach(([subKey, subValue]) => {
                formDataToSend.append(`${key}[${index}][${subKey}]`, subValue || "");
              });
            } else {
              formDataToSend.append(`${key}[${index}]`, item || "");
            }
          });
        } else {
          formDataToSend.append(key, value || "");
        }
      });

      const response = await fetch("http://127.0.0.1:8000/api/projects/save-project/", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();
      if (response.ok) {
        toast.success(`Project saved successfully! Product ID: ${result.product_id}`);
        navigate("/dashboard");
      } else {
        throw new Error("Failed to save project");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="px-6 py-8 sm:p-10">
            {renderProgress()}
            <form onSubmit={handleSubmit} className="space-y-8">
              {renderCurrentSection()}
              
              <div className="flex justify-between pt-6">
                <button
                  type="button"
                  onClick={() => setCurrentSection(prev => prev - 1)}
                  disabled={currentSection === 1 || isLoading}
                  className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  Previous
                </button>
                
                {currentSection < 5 ? (
                  <button
                    type="button"
                    onClick={handleNextSection}
                    disabled={isLoading}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting
                      </>
                    ) : (
                      'Submit'
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

