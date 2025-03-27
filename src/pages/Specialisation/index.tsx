import React, { useState, useEffect } from 'react';
import { Trash2, Edit, Check, Search, AlertCircle, X, PlusCircle, Info, RefreshCw, ChevronDown } from 'lucide-react';

const Main = () => {
  const [activeTab, setActiveTab] = useState('add');
  const [specialization, setSpecialization] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('beginner');

  const [specializations, setSpecializations] = useState<{name:string;description:string;difficulty:string;created:string}[]>([]);
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [loading, setLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setSpecializations([
        { 
          name: 'Hatha Yoga',
          description: 'Traditional yoga that emphasizes physical postures and breathing techniques',
          difficulty: 'beginner',
          created: '2023-05-12'
        },
        { 
          name: 'Ashtanga Yoga',
          description: 'A dynamic, physically demanding practice that synchronizes breath with movement',
          difficulty: 'advanced',
          created: '2023-06-18'
        },
        { 
          name: 'Vinyasa Yoga',
          description: 'A flowing style where poses are linked together with breath',
          difficulty: 'intermediate',
          created: '2023-07-22'
        },
        { 
          name: 'Iyengar Yoga',
          description: 'Focuses on precision, alignment and often uses props for support',
          difficulty: 'intermediate',
          created: '2023-08-05'
        },
        { 
          name: 'Kundalini Yoga',
          description: 'Combines physical postures with breathing techniques and meditation',
          difficulty: 'intermediate',
          created: '2023-09-14'
        },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (specialization.trim() === '') {
      showNotification('Specialization name cannot be empty', 'error');
      return;
    }
    
    const specialtyExists = specializations.some(spec => 
      spec.name.toLowerCase() === specialization.toLowerCase() && 
      (editIndex === null || specializations.indexOf(spec) !== editIndex)
    );
    
    if (specialtyExists) {
      showNotification('This specialization already exists', 'error');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const newSpecialization = {
        name: specialization,
        description: description || 'No description provided',
        difficulty: difficulty,
        created: new Date().toISOString().split('T')[0]
      };
      
      if (editIndex !== null) {
        const updatedSpecializations = [...specializations];
        updatedSpecializations[editIndex] = newSpecialization;
        setSpecializations(updatedSpecializations);
        setEditIndex(null);
        showNotification('Specialization updated successfully!', 'success');
      } else {
        setSpecializations([...specializations, newSpecialization]);
        showNotification('Specialization added successfully!', 'success');
      }
      setSpecialization('');
      setDescription('');
      setDifficulty('beginner');
      setLoading(false);
    }, 500);
  };

  const handleEdit = (index) => {
    const spec = specializations[index];
    setSpecialization(spec.name);
    setDescription(spec.description);
    setDifficulty(spec.difficulty);
    setEditIndex(index);
    setActiveTab('add');
  };

  const handleDelete = (index) => {
    setConfirmDelete(index);
  };

  const confirmDeleteAction = () => {
    setLoading(true);
    setTimeout(() => {
      setSpecializations(specializations.filter((_, i) => i !== confirmDelete));
      setConfirmDelete(null);
      showNotification('Specialization deleted successfully!', 'success');
      setLoading(false);
    }, 500);
  };

  const cancelDelete = () => {
    setConfirmDelete(null);
  };

  const handleSort = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
    
    const sorted = [...specializations].sort((a, b) => {
      if (newOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    
    setSpecializations(sorted);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSortOrder('asc');
    // Re-fetch or reset to original data
    setLoading(true);
    setTimeout(() => {
      // For demo, we'll just sort alphabetically
      const sorted = [...specializations].sort((a, b) => a.name.localeCompare(b.name));
      setSpecializations(sorted);
      setLoading(false);
    }, 300);
  };

  const filteredSpecializations = specializations.filter((spec) =>
    spec.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    spec.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <span className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-3">
            <PlusCircle size={24} />
          </span>
          Yoga Specialization Management
        </h2>
        {loading && (
          <div className="flex items-center text-blue-600">
            <RefreshCw size={18} className="mr-2 animate-spin" />
            <span>Processing...</span>
          </div>
        )}
      </div>

      {notification.show && (
        <div className={`mb-4 p-4 rounded-lg flex items-center justify-between transition-all ${
          notification.type === 'success' ? 'bg-green-100 text-green-800 border-l-4 border-green-500' : 'bg-red-100 text-red-800 border-l-4 border-red-500'
        }`}>
          <div className="flex items-center">
            {notification.type === 'success' ? <Check size={20} className="mr-2" /> : <AlertCircle size={20} className="mr-2" />}
            {notification.message}
          </div>
          <button onClick={() => setNotification({ show: false, message: '', type: '' })} className="hover:bg-gray-200 p-1 rounded-full">
            <X size={18} />
          </button>
        </div>
      )}

      {confirmDelete !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Confirm Delete</h3>
            <p className="mb-6">Are you sure you want to delete "{specializations[confirmDelete]?.name}"?</p>
            <div className="flex justify-end space-x-3">
              <button 
                onClick={cancelDelete} 
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDeleteAction} 
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex border-b mb-6">
        <button 
          className={`py-3 px-6 font-medium transition-all flex items-center ${
            activeTab === 'add' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('add')}
        >
          <PlusCircle size={18} className="mr-2" />
          {editIndex !== null ? 'Edit' : 'Add'} Specialization
        </button>
        <button 
          className={`py-3 px-6 font-medium transition-all flex items-center ${
            activeTab === 'get' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('get')}
        >
          <Search size={18} className="mr-2" />
          View Specializations
        </button>
      </div>

      {activeTab === 'add' && (
        <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Specialization Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter yoga specialization"
                disabled={loading}
              />
            </div>
            
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-24"
                placeholder="Enter a brief description about this specialization"
                disabled={loading}
              />
            </div>
            
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Difficulty Level
              </label>
              <div className="flex space-x-4">
                {['beginner', 'intermediate', 'advanced'].map((level) => (
                  <label key={level} className="flex items-center">
                    <input
                      type="radio"
                      name="difficulty"
                      value={level}
                      checked={difficulty === level}
                      onChange={() => setDifficulty(level)}
                      className="mr-2"
                      disabled={loading}
                    />
                    <span className="capitalize">{level}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end">
              <button 
                type="submit" 
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition shadow-md flex items-center"
                disabled={loading}
              >
                {editIndex !== null ? 'Update' : 'Save'} Specialization
                <Check size={18} className="ml-2" />
              </button>
            </div>
          </form>
        </div>
      )}

      {activeTab === 'get' && (
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="relative flex-grow">
              <Search size={18} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or description..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
                onClick={handleSort} 
                className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 flex items-center"
              >
                <span className="mr-2">Sort</span>
                <ChevronDown size={16} className={`transform transition-transform ${sortOrder === 'desc' ? 'rotate-180' : ''}`} />
              </button>
              
              <button 
                onClick={resetFilters} 
                className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 flex items-center"
              >
                <RefreshCw size={16} className="mr-2" />
                Reset
              </button>
            </div>
          </div>

          {filteredSpecializations.length > 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-md">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 border-b">
                    <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">S.No</th>
                    <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">Specialization</th>
                    <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase hidden md:table-cell">Description</th>
                    <th className="p-4 text-center text-xs font-semibold text-gray-600 uppercase">Difficulty</th>
                    <th className="p-4 text-center text-xs font-semibold text-gray-600 uppercase hidden md:table-cell">Date Added</th>
                    <th className="p-4 text-center text-xs font-semibold text-gray-600 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSpecializations.map((spec, index) => (
                    <tr key={index} className="hover:bg-gray-50 border-b">
                      <td className="p-4">{index + 1}</td>
                      <td className="p-4 font-medium">{spec.name}</td>
                      <td className="p-4 text-sm text-gray-500 hidden md:table-cell">
                        {spec.description.length > 60 ? `${spec.description.substring(0, 60)}...` : spec.description}
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 text-xs rounded-full capitalize ${getDifficultyColor(spec.difficulty)}`}>
                          {spec.difficulty}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-gray-500 hidden md:table-cell">{spec.created}</td>
                      <td className="p-4">
                        <div className="flex justify-center space-x-2">
                          <button 
                            onClick={() => handleEdit(index)} 
                            className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-100 rounded-full transition"
                            title="Edit"
                          >
                            <Edit size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete(index)} 
                            className="text-red-600 hover:text-red-800 p-1 hover:bg-red-100 rounded-full transition"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 bg-gray-50 rounded-lg border border-gray-200">
              <AlertCircle size={48} className="text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-gray-700">No specializations found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your search or add a new specialization</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Main;