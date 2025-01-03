import React, { useState } from 'react';

const FormPage = () => {
  const [year, setYear] = useState('');
  const [batch, setBatch] = useState('');
  const [sequence, setSequence] = useState(1);
  const [staffData, setStaffData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterCollege, setFilterCollege] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [selectedStaff, setSelectedStaff] = useState([]);

  const generatePreview = () => {
    if (year && batch) {
      const formattedSequence = String(sequence).padStart(3, '0');
      return `GENAI-${year}-B${batch} ${formattedSequence}`;
    }
    return 'Preview will appear here';
  };

  const handlePublish = () => {
    fetch('http://127.0.0.1:8000/api/projects/get_staff_data/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(`Error: ${data.error}`);
        } else {
          setStaffData(data.staff_data);
          setIsModalOpen(true);
        }
      })
      .catch((error) => {
        alert('Error fetching staff data: ' + error);
      });
  };

  const getAcademicYear = () => {
    const currentYear = new Date().getFullYear();
    return `${currentYear}-${currentYear + 1}`;
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCheckboxChange = (staffId) => {
    setSelectedStaff((prevSelected) =>
      prevSelected.includes(staffId)
        ? prevSelected.filter((id) => id !== staffId)
        : [...prevSelected, staffId]
    );
  };

  const handleAdd = () => {
    const previewValue = generatePreview(); // Generate the preview value
    console.log(previewValue)
    const projectData = {
      year,
      batch,
      staff_ids: selectedStaff,
      preview: previewValue, // Include the preview value
    };

    fetch('http://127.0.0.1:8000/api/projects/assign_project/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(`Error: ${data.error}`);
        } else {
          alert('Project assigned successfully');
          setIsModalOpen(false);
        }
      })
      .catch((error) => {
        alert('Error assigning project: ' + error);
      });
  };

  const filteredData = staffData.filter(staff => {
    const collegeMatch = !filterCollege || staff.college.includes(filterCollege);
    const departmentMatch = !filterDepartment || staff.department.includes(filterDepartment);
    return collegeMatch && departmentMatch;
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">Form Page</h2>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">Year <span className="text-red-500">*</span></label>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Select academic year</option>
            {[getAcademicYear()].map((yr) => (
              <option key={yr} value={yr}>{yr}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">Batch <span className="text-red-500">*</span></label>
          <select
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Select batch number</option>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">Preview Field</label>
          <div className="w-full p-2 bg-gray-100 border border-gray-300 rounded-md">{generatePreview()}</div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handlePublish}
            className="px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            Publish
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">Select Students</h2>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Filter by College Name"
                value={filterCollege}
                onChange={(e) => setFilterCollege(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 mb-2"
              />
              <input
                type="text"
                placeholder="Filter by Department"
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <input type="checkbox" className="mr-2" />
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                    <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">College Name</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((staff, index) => (
                    <tr key={index} className="bg-white">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={selectedStaff.includes(staff.staff_id)}
                          onChange={() => handleCheckboxChange(staff.staff_id)}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.department}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.college}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormPage;
