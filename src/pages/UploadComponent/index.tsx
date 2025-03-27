import React, { useState } from 'react';
import { Upload, File, X } from 'lucide-react';

const Main =()=> {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [pdfFile, setPdfFile] = useState(null);

  const handleFileUpload = (e:any) => {
    const file = e.target.files[0];
    setPdfFile(file);
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    // Logic for uploading resource
    console.log('Submitting:', { name, description, pdfFile });
  };

  const handleRemoveFile = () => {
    setPdfFile(null);
  };

  return (
    <div className="p-6 box  box--stacked rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Upload  Resources</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter resource name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter resource description"
            rows={4}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload PDF
          </label>
          <div className="flex items-center space-x-4">
            <input 
              type="file" 
              accept=".pdf"
              onChange={handleFileUpload}
              className="hidden"
              id="pdf-upload"
            />
            <label 
              htmlFor="pdf-upload" 
              className="flex items-center px-4 py-2 bg-gradient-to-r from-[#4A0F38] to-[#913674] text-white rounded-md cursor-pointer hover:bg-blue-600 transition"
            >
              <Upload className="mr-2" size={20} />
              Choose File
            </label>
            {pdfFile && (
              <div className="flex items-center space-x-2">
                <File className="text-blue-500" size={20} />
                <span className="text-sm">{"sahil"}</span>
                <button 
                  type="button"
                  onClick={handleRemoveFile}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={20} />
                </button>
              </div>
            )}
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full bg-gradient-to-r from-[#4A0F38] to-[#913674] text-white py-2 rounded-md hover:bg-green-600 transition"
        >
          Upload Resource
        </button>
      </form>
    </div>
  );
};

export default Main;