import React, { useState } from 'react';

const FormPage = () => {
  const [year, setYear] = useState('');
  const [batch, setBatch] = useState('');
  const [sequence, setSequence] = useState(1); // Starting sequence number (001)

  const generatePreview = () => {
    if (year && batch) {
      const formattedSequence = String(sequence).padStart(3, '0'); // Ensure 3 digits
      return `GENAI-${year}-B${batch} ${formattedSequence}`;
    }
    return 'Preview will appear here';
  };

  const handleNext = () => {
    if (year && batch) {
      alert(`Form submitted: Year - ${year}, Batch - ${batch}`);
      setSequence(sequence + 1); // Increment sequence for the next preview
    } else {
      alert('Please select both Year and Batch');
    }
  };

  const handleAssign = () => {
    if (year && batch) {
      alert(`Assigning: Year - ${year}, Batch - ${batch}`);
      // Add your assign logic here
    } else {
      alert('Please select both Year and Batch');
    }
  };

  const handlePublish = () => {
    if (year && batch) {
      alert(`Publishing: Year - ${year}, Batch - ${batch}`);
      // Add your publish logic here
    } else {
      alert('Please select both Year and Batch');
    }
  };

  const getAcademicYear = () => {
    const currentYear = new Date().getFullYear();
    return `${currentYear}-${currentYear + 1}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">Form Page</h2>

        {/* Year Dropdown */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">Year <span className="text-red-500">*</span></label>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Select academic year</option>
            <option value={getAcademicYear()}>{getAcademicYear()}</option>
          </select>
        </div>

        {/* Batch Dropdown */}
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

        {/* Preview Field */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">Preview Field</label>
          <div className="w-full p-2 bg-gray-100 border border-gray-300 rounded-md">{generatePreview()}</div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handleAssign}
            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Assign
          </button>
          <button
            onClick={handlePublish}
            className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Publish
          </button>
          <button
            onClick={handleNext}
            className="px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormPage;
