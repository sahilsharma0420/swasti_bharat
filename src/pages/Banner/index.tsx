import { useState } from "react";

function Main() {
  const [activeTab, setActiveTab] = useState('upload');
  const [selectedFile, setSelectedFile] = useState(null);
  const [savedImages, setSavedImages] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const processFile = (file) => {
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveImage = () => {
    if (selectedFile && previewUrl) {
      const newImage = {
        id: Date.now(),
        name: selectedFile.name,
        url: previewUrl,
        date: new Date().toLocaleDateString()
      };
      setSavedImages([...savedImages, newImage]);
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  };

  const handleDeleteImage = (id) => {
    setSavedImages(savedImages.filter(image => image.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
     

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8 flex-grow">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200">
            <button 
              className={`py-4 px-6 flex-1 font-medium text-sm transition-all duration-200 flex items-center justify-center ${
                activeTab === 'upload' 
                  ? 'bg-white text-blue-600 border-b-2 border-blue-600' 
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => handleTabChange('upload')}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
              Upload
            </button>
            <button 
              className={`py-4 px-6 flex-1 font-medium text-sm transition-all duration-200 flex items-center justify-center ${
                activeTab === 'view' 
                  ? 'bg-white text-blue-600 border-b-2 border-blue-600' 
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => handleTabChange('view')}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
              </svg>
              Gallery
            </button>
          </div>
          
          <div className="p-6">
            {/* Upload Tab Content */}
            {activeTab === 'upload' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-5">
                  <h2 className="text-lg font-medium text-gray-800">Upload New Image</h2>
                  <div 
                    className={`border-2 border-dashed rounded-lg p-10 text-center transition-all duration-200 ${
                      isDragging 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <label className="block cursor-pointer">
                      <div className="flex flex-col items-center">
                        <div className="w-20 h-20 mb-4 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                          </svg>
                        </div>
                        <span className="text-base font-medium text-gray-800">Drag & drop or click to upload</span>
                        <span className="text-sm text-gray-500 mt-2">Supports JPG, PNG or GIF (Max 5MB)</span>
                      </div>
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>

                  <button 
                    className={`w-full py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center ${
                      selectedFile 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:from-blue-700 hover:to-indigo-800 shadow-md hover:shadow-lg' 
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                    disabled={!selectedFile}
                    onClick={handleSaveImage}
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path>
                    </svg>
                    Save Image
                  </button>
                </div>
                
                {/* Image Preview Section */}
                <div>
                  <h2 className="text-lg font-medium text-gray-800 mb-5">Image Preview</h2>
                  {previewUrl ? (
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                      <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-700">
                          {selectedFile?.name}
                        </p>
                        <button 
                          className="text-gray-400 hover:text-gray-600 p-1"
                          onClick={() => {
                            setSelectedFile(null);
                            setPreviewUrl(null);
                          }}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                          </svg>
                        </button>
                      </div>
                      <div className="bg-gray-100 p-6">
                        <div className="bg-white border border-gray-200 rounded-md p-2 flex items-center justify-center">
                          <img 
                            src={previewUrl} 
                            alt="Preview" 
                            className="max-w-full max-h-80 object-contain rounded-md"
                          />
                        </div>
                      </div>
                      <div className="p-4 flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center">
                          <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
                          </svg>
                          <span>{selectedFile?.type}</span>
                        </div>
                        <span>{(selectedFile?.size / 1024).toFixed(2)} KB</span>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-10 text-center h-full flex items-center justify-center">
                      <div className="text-gray-400">
                        <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        <p className="text-base">No image selected</p>
                        <p className="text-sm mt-1">Upload an image to preview it here</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Gallery Tab Content */}
            {activeTab === 'view' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-medium text-gray-800">Image Gallery</h2>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{savedImages.length} images</span>
                </div>
                
                {savedImages.length === 0 ? (
                  <div className="text-center py-20 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center text-gray-300">
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <p className="text-gray-600 text-lg mb-2">No images saved yet</p>
                    <p className="text-gray-500 text-base mb-6">Upload images to see them here</p>
                    <button 
                      className="text-base text-white bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition-colors shadow-sm"
                      onClick={() => handleTabChange('upload')}
                    >
                      Upload an Image
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {savedImages.map(image => (
                      <div key={image.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                        <div className="h-48 overflow-hidden bg-gray-100 relative">
                          <img 
                            src={image.url} 
                            alt={image.name} 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                            <div className="p-4 w-full text-white">
                              <p className="text-sm font-medium truncate">{image.name}</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 border-t border-gray-100">
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-500">{image.date}</p>
                            <div className="flex space-x-2">
                              <button className="p-1.5 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                </svg>
                              </button>
                              <button 
                                className="p-1.5 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors"
                                onClick={() => handleDeleteImage(image.id)}
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
  
    </div>
  );
}

export default Main;