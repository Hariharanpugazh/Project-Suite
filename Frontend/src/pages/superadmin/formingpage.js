import React, { useState } from 'react';

const FormPage = () => {
  const [year, setYear] = useState('');
  const [batch, setBatch] = useState('');
  const [sequence, setSequence] = useState(1);

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
          const staffInfo = data.staff_data.map(
            (staff, index) => `Staff ${index + 1}: ${JSON.stringify(staff, null, 2)}`
          ).join('\n');
          alert(`Staff Data:\n${staffInfo}`);
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
    </div>
  );
};

export default FormPage;
