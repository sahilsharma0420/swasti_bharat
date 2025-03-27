import React, { useState, useEffect } from 'react';
import { Trash2, Edit, Check, Search, AlertCircle, X, Info, Save, RefreshCw, Tag, BookOpen, Clock, ArrowUpDown, Filter, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

const Main = () => {
  const [activeTab, setActiveTab] = useState('add');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [difficultyLevel, setDifficultyLevel] = useState('intermediate');
  const [duration, setDuration] = useState('');
  const [benefits, setBenefits] = useState('');
  

  const [categories, setCategories] = useState<{ category: string; description: string ;difficultyLevel:string;duration:string;benefits:string;lastUpdated:string}[]>([]);

  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [loading, setLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [viewDetails, setViewDetails] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [filterOptions, setFilterOptions] = useState({ difficulty: 'all' });
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [bulkActionMode, setBulkActionMode] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [stats, setStats] = useState({ total: 0, beginner: 0, intermediate: 0, advanced: 0 });
  const [expandedView, setExpandedView] = useState(false);

  // Simulate loading data
  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      // Simulated data fetch
      setTimeout(() => {
        const initialCategories = [
          { 
            category: 'Restorative Yoga', 
            description: 'Gentle, slow-paced style that focuses on relaxation and tension release.',
            difficultyLevel: 'beginner',
            duration: '60-90 min',
            benefits: 'Stress reduction, improved flexibility, better sleep quality',
            lastUpdated: '2025-02-15'
          },
          { 
            category: 'Power Yoga', 
            description: 'Vigorous, fitness-based approach to vinyasa-style yoga with emphasis on strength.',
            difficultyLevel: 'advanced',
            duration: '45-75 min',
            benefits: 'Increased strength, improved cardiovascular health, enhanced endurance',
            lastUpdated: '2025-03-01'
          },
          { 
            category: 'Prenatal Yoga', 
            description: 'Modified yoga postures safe for pregnancy that support maternal health.',
            difficultyLevel: 'beginner',
            duration: '30-60 min',
            benefits: 'Reduced pregnancy discomfort, preparation for childbirth, stress relief',
            lastUpdated: '2025-02-28'
          },
          { 
            category: 'Hatha Yoga', 
            description: 'Traditional form emphasizing static poses with breathing techniques.',
            difficultyLevel: 'intermediate',
            duration: '60 min',
            benefits: 'Improved balance, flexibility, and mind-body awareness',
            lastUpdated: '2025-03-10'
          },
          { 
            category: 'Yin Yoga', 
            description: 'Passive practice where poses are held for extended periods targeting connective tissues.',
            difficultyLevel: 'intermediate',
            duration: '75-90 min',
            benefits: 'Enhanced joint mobility, stress reduction, deeper relaxation',
            lastUpdated: '2025-03-05'
          }
        ];
        setCategories(initialCategories);
        updateStats(initialCategories);
        setLoading(false);
      }, 800);
    };

    fetchData();
  }, []);

  const updateStats = (categoriesData:any) => {
    const stats = {
      total: categoriesData.length,
      beginner: categoriesData.filter((c:any )=> c.difficultyLevel === 'beginner').length,
      intermediate: categoriesData.filter((c:any )=> c.difficultyLevel === 'intermediate').length,
      advanced: categoriesData.filter((c:any )=> c.difficultyLevel === 'advanced').length
    };
    setStats(stats);
  };

  const showNotification = (message:any, type:any) => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (category.trim() === '') {
      showNotification('Category name cannot be empty', 'error');
      return;
    }

    // Check for duplicates
    if (editIndex === null && categories.some(item => item.category.toLowerCase() === category.toLowerCase())) {
      showNotification('This category already exists', 'error');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const today = new Date().toISOString().split('T')[0];
      const categoryData = { 
        category, 
        description, 
        difficultyLevel, 
        duration, 
        benefits,
        lastUpdated: today
      };
      
      if (editIndex !== null) {
        // Edit existing category
        const updatedCategories = [...categories];
        updatedCategories[editIndex] = categoryData;
        setCategories(updatedCategories);
        updateStats(updatedCategories);
        setEditIndex(null);
        showNotification('Yoga category updated successfully', 'success');
      } else {
        // Add new category
        const updatedCategories = [...categories, categoryData];
        setCategories(updatedCategories);
        updateStats(updatedCategories);
        showNotification('Yoga category added successfully', 'success');
      }
      setCategory('');
      setDescription('');
      setDifficultyLevel('intermediate');
      setDuration('');
      setBenefits('');
      setLoading(false);
    }, 500);
  };

  const handleEdit = (index:any) => {
    const item = categories[index];
    setCategory(item.category);
    setDescription(item.description);
    setDifficultyLevel(item.difficultyLevel || 'intermediate');
    setDuration(item.duration || '');
    setBenefits(item.benefits || '');
    setEditIndex(index);
    setActiveTab('add');
  };

  const handleDelete = (index:any) => {
    setConfirmDelete(index);
  };

  const confirmDeleteAction = () => {
    setLoading(true);
    setTimeout(() => {
      const updatedCategories = categories.filter((_, i) => i !== confirmDelete);
      setCategories(updatedCategories);
      updateStats(updatedCategories);
      setConfirmDelete(null);
      showNotification('Yoga category deleted successfully', 'success');
      setLoading(false);
    }, 500);
  };

  const cancelDelete = () => {
    setConfirmDelete(null);
  };

  const handleSort = (key:any) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleBulkDelete = () => {
    if (selectedCategories.length === 0) {
      showNotification('No categories selected', 'error');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const updatedCategories = categories.filter((_, index) => !selectedCategories.includes(index));
      setCategories(updatedCategories);
      updateStats(updatedCategories);
      setSelectedCategories([]);
      setBulkActionMode(false);
      showNotification(`${selectedCategories.length} categories deleted successfully`, 'success');
      setLoading(false);
    }, 500);
  };

  const toggleCategorySelection = (index:any) => {
    if (selectedCategories.includes(index)) {
      setSelectedCategories(selectedCategories.filter(i => i !== index));
    } else {
      setSelectedCategories([...selectedCategories, index]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedCategories.length === filteredCategories.length) {
      setSelectedCategories([]);
    } else {
      const allIndexes = filteredCategories.map((_, index) => {
        const originalIndex = categories.findIndex(cat => cat.category === filteredCategories[index].category);
        return originalIndex;
      });
      setSelectedCategories(allIndexes);
    }
  };

  const applyFilter = (options:any) => {
    setFilterOptions(options);
    setShowFilterMenu(false);
  };

  const resetFilters = () => {
    setFilterOptions({ difficulty: 'all' });
    setShowFilterMenu(false);
  };

  const getDifficultyColor = (level:any) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-blue-100 text-blue-800';
      case 'advanced': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Sort and filter categories
  const getSortedCategories = () => {
    const filtered = categories.filter(item => {
      const matchesSearch = 
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.benefits && item.benefits.toLowerCase().includes(searchTerm.toLowerCase()));
        
      const matchesDifficulty = 
        filterOptions.difficulty === 'all' || 
        item.difficultyLevel === filterOptions.difficulty;
        
      return matchesSearch && matchesDifficulty;
    });
    
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return filtered;
  };
  
  const filteredCategories = getSortedCategories();

  return (
    <div className="w-full  mx-auto p-6 bg-white rounded-lg shadow-lg border-t-4 border-indigo-600 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center justify-between">
        <span>Yoga Category Management</span>
        {loading ? (
          <div className="flex items-center text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-600">
            <RefreshCw size={16} className="mr-2 animate-spin" /> Processing...
          </div>
        ) : (
          <div className="flex space-x-2">
            <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full flex items-center">
              <span className="font-semibold mr-1">Beginner:</span> {stats.beginner}
            </div>
            <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex items-center">
              <span className="font-semibold mr-1">Intermediate:</span> {stats.intermediate}
            </div>
            <div className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full flex items-center">
              <span className="font-semibold mr-1">Advanced:</span> {stats.advanced}
            </div>
          </div>
        )}
      </h2>
      
      {/* Notification */}
      {notification.show && (
        <div className={`mb-4 p-3 rounded-lg flex items-center justify-between ${
          notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          <div className="flex items-center">
            {notification.type === 'success' ? <Check size={18} className="mr-2" /> : <AlertCircle size={18} className="mr-2" />}
            {notification.message}
          </div>
          <button onClick={() => setNotification({ show: false, message: '', type: '' })}>
            <X size={18} />
          </button>
        </div>
      )}
      
      {/* Tab Navigation */}
      <div className="flex border-b mb-6">
        <button 
          className={`py-3 px-6 font-medium transition-all flex items-center ${activeTab === 'add' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('add')}
        >
          <Tag size={16} className="mr-2" />
          {editIndex !== null ? 'Edit' : 'Add'} Category
        </button>
        <button 
          className={`py-3 px-6 font-medium transition-all flex items-center ${activeTab === 'get' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('get')}
        >
          <BookOpen size={16} className="mr-2" />
          View Categories
        </button>
      </div>
      
      {/* Add Tab Content */}
      {activeTab === 'add' && (
        <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium mb-4 text-gray-800">
            {editIndex !== null ? 'Edit Yoga Category' : 'Add New Yoga Category'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="category" className="block mb-2 font-medium text-gray-700">
                  Yoga Category <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter yoga category name"
                  disabled={loading}
                />
                <p className="mt-1 text-sm text-gray-500">
                  Enter a unique yoga category name
                </p>
              </div>
              
              <div>
                <label htmlFor="difficulty" className="block mb-2 font-medium text-gray-700">
                  Difficulty Level
                </label>
                <select
                  id="difficulty"
                  value={difficultyLevel}
                  onChange={(e) => setDifficultyLevel(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  disabled={loading}
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
                <p className="mt-1 text-sm text-gray-500">
                  Select appropriate skill level for this yoga style
                </p>
              </div>
            </div>
            
            <div>
              <label htmlFor="description" className="block mb-2 font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter detailed description of the yoga category"
                rows="3"
                disabled={loading}
              />
              <p className="mt-1 text-sm text-gray-500">
                Provide a brief description of the yoga style and practices
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="duration" className="block mb-2 font-medium text-gray-700">
                  Typical Duration
                </label>
                <input
                  type="text"
                  id="duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="e.g., 60-90 min"
                  disabled={loading}
                />
                <p className="mt-1 text-sm text-gray-500">
                  Typical class duration range
                </p>
              </div>
              
              <div>
                <label htmlFor="benefits" className="block mb-2 font-medium text-gray-700">
                  Benefits
                </label>
                <input
                  type="text"
                  id="benefits"
                  value={benefits}
                  onChange={(e) => setBenefits(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="e.g., Stress reduction, flexibility, strength"
                  disabled={loading}
                />
                <p className="mt-1 text-sm text-gray-500">
                  Key benefits separated by commas
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={() => {
                  setCategory('');
                  setDescription('');
                  setDifficultyLevel('intermediate');
                  setDuration('');
                  setBenefits('');
                  setEditIndex(null);
                }}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                disabled={loading}
              >
                Clear Form
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center">
                    <RefreshCw size={16} className="mr-2 animate-spin" />
                    Processing...
                  </span>
                ) : (
                  <>
                    <Save size={16} className="mr-2" />
                    {editIndex !== null ? 'Update' : 'Save'} Category
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Get Tab Content */}
      {activeTab === 'get' && (
        <div className="space-y-4">
          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row justify-between gap-3">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search categories by name, description, or benefits..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <div className="relative">
                <button
                  onClick={() => setShowFilterMenu(!showFilterMenu)}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center"
                >
                  <Filter size={16} className="mr-2 text-gray-500" />
                  Filter
                  <ChevronDown size={16} className="ml-2 text-gray-500" />
                </button>
                
                {showFilterMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-10 p-4">
                    <h4 className="font-medium text-gray-700 mb-3">Filter Options</h4>
                    
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Difficulty Level
                      </label>
                      <select
                        value={filterOptions.difficulty}
                        onChange={(e) => setFilterOptions({...filterOptions, difficulty: e.target.value})}
                        className="w-full p-2 text-sm border border-gray-300 rounded-md"
                      >
                        <option value="all">All levels</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                      </select>
                    </div>
                    
                    <div className="flex justify-between">
                      <button
                        onClick={resetFilters}
                        className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                      >
                        Reset
                      </button>
                      <button
                        onClick={() => applyFilter(filterOptions)}
                        className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              <button
                onClick={() => setExpandedView(!expandedView)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center"
                title={expandedView ? "Switch to compact view" : "Switch to expanded view"}
              >
                {expandedView ? (
                  <ChevronUp size={16} className="text-gray-500" />
                ) : (
                  <ChevronDown size={16} className="text-gray-500" />
                )}
              </button>
              
              <button
                onClick={() => setBulkActionMode(!bulkActionMode)}
                className={`px-4 py-2 border rounded-md flex items-center ${
                  bulkActionMode 
                    ? 'bg-indigo-100 text-indigo-700 border-indigo-300' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {bulkActionMode ? "Cancel" : "Bulk Actions"}
              </button>
            </div>
          </div>
          
          {/* Bulk Actions */}
          {bulkActionMode && selectedCategories.length > 0 && (
            <div className="flex items-center justify-between bg-gray-100 p-3 rounded-md">
              <div className="text-sm">
                <span className="font-medium">{selectedCategories.length}</span> categories selected
              </div>
              <div className="flex gap-2">
                <button
                  className="px-4 py-1 text-white bg-red-600 rounded-md hover:bg-red-700 text-sm flex items-center"
                  onClick={handleBulkDelete}
                  disabled={loading}
                >
                  <Trash2 size={14} className="mr-1" /> Delete Selected
                </button>
              </div>
            </div>
          )}
          
          {/* Table */}
          <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  {bulkActionMode && (
                    <th className="p-3 border-b-2 border-gray-200 text-center w-10">
                      <input 
                        type="checkbox" 
                        checked={selectedCategories.length === filteredCategories.length && filteredCategories.length > 0}
                        onChange={toggleSelectAll}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                    </th>
                  )}
                  <th className="p-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-10">S.No</th>
                  <th 
                    className="p-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-200"
                    onClick={() => handleSort('category')}
                  >
                    <div className="flex items-center">
                      Category Name
                      {sortConfig.key === 'category' && (
                        <ArrowUpDown size={14} className="ml-1" />
                      )}
                    </div>
                  </th>
                  {expandedView && (
                    <th className="p-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Description</th>
                  )}
                  <th 
                    className="p-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-200"
                    onClick={() => handleSort('difficultyLevel')}
                  >
                    <div className="flex items-center">
                      Level
                      {sortConfig.key === 'difficultyLevel' && (
                        <ArrowUpDown size={14} className="ml-1" />
                      )}
                    </div>
                  </th>
                  {expandedView && (
                    <>
                      <th className="p-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Duration</th>
                      <th className="p-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Benefits</th>
                    </>
                  )}
                  <th 
                    className="p-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-200"
                    onClick={() => handleSort('lastUpdated')}
                  >
                    <div className="flex items-center">
                      Updated
                      {sortConfig.key === 'lastUpdated' && (
                        <ArrowUpDown size={14} className="ml-1" />
                      )}
                    </div>
                  </th>
                  <th className="p-3 border-b-2 border-gray-200 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={expandedView ? (bulkActionMode ? 9 : 8) : (bulkActionMode ? 6 : 5)} className="p-6 text-center text-gray-500">
                      <div className="flex flex-col items-center justify-center">
                        <RefreshCw size={24} className="animate-spin mb-2 text-indigo-500" />
                        <p>Loading categories...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredCategories.length > 0 ? (
                  filteredCategories.map((item, index) => {
                    const originalIndex = categories.findIndex(cat => cat.category === item.category);
                    return (
                      <tr key={index} className={`hover:bg-gray-50 ${selectedCategories.includes(originalIndex) ? 'bg-indigo-50' : ''}`}>
                        {bulkActionMode && (
                          <td className="p-3 border-b border-gray-200 text-center">
                            <input 
                              type="checkbox" 
                              checked={selectedCategories.includes(originalIndex)}
                              onChange={() => toggleCategorySelection(originalIndex)}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                          </td>
                        )}
                        <td className="p-3 border-b border-gray-200">{index + 1}</td>
                        <td className="p-3 border-b border-gray-200 font-medium">{item.category}</td>
                        {expandedView && (
                          <td className="p-3 border-b border-gray-200 text-sm max-w-xs">
                            {item.description || "No description available"}
                          </td>
                        )}
                        <td className="p-3 border-b border-gray-200">
                          <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(item.difficultyLevel)}`}>
                            {item.difficultyLevel?.charAt(0).toUpperCase() + item.difficultyLevel?.slice(1) || "N/A"}
                          </span>
                        </td>
                        {expandedView && (
                          <>
                            <td className="p-3 border-b border-gray-200 text-sm">
                              <div className="flex items-center">
                                <Clock size={14} className="mr-1 text-gray-500" />
                                {item.duration || "N/A"}
                              </div>
                            </td>
                            <td className="p-3 border-b border-gray-200 text-sm">{item.benefits || "No benefits listed"}</td>
                          </>
                        )}
                        <td className="p-3 border-b border-gray-200 text-sm">
                          <div className="flex items-center">
                            <Clock size={14} className="mr-1 text-gray-400" />
                            {item.lastUpdated || "N/A"}
                          </div>
                        </td>
                        <td className="p-3 border-b border-gray-200">
                          <div className="flex items-center justify-center space-x-2">
                            <button
                              className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                              onClick={() => setViewDetails(item)}
                              title="View Details"
                            >
                              <Info size={18} />
                            </button>
                            <button
                              className="p-1 text-indigo-600 hover:text-indigo-800 transition-colors"
                              onClick={() => handleEdit(originalIndex)}
                              title="Edit Category"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              className="p-1 text-red-600 hover:text-red-800 transition-colors"
                              onClick={() => handleDelete(originalIndex)}
                              title="Delete Category"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={expandedView ? (bulkActionMode ? 9 : 8) : (bulkActionMode ? 6 : 5)} className="p-6 text-center text-gray-500">
                      <div className="flex flex-col items-center justify-center">
                        <AlertCircle size={24} className="mb-2 text-gray-400" />
                        <p>No yoga categories found matching your search criteria.</p>
                        <button
                          onClick={() => {
                            setSearchTerm('');
                            resetFilters();
                          }}
                          className="mt-2 text-indigo-600 hover:text-indigo-800 text-sm"
                        >
                          Clear all filters
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Category Count */}
          {!loading && filteredCategories.length > 0 && (
            <div className="text-sm text-gray-500">
              Showing {filteredCategories.length} out of {categories.length} categories
            </div>
          )}
        </div>
      )}

      {/* Confirmation Modal for Delete */}
      {confirmDelete !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Confirm Deletion</h3>
            <p className="mb-6 text-gray-700">
              Are you sure you want to delete the yoga category "{categories[confirmDelete]?.category}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteAction}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center">
                    <RefreshCw size={16} className="mr-2 animate-spin" />
                    Processing...
                  </span>
                ) : (
                  <>
                    <Trash2 size={16} className="mr-2" />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {viewDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-medium">Yoga Category Details</h3>
              <button onClick={() => setViewDetails(null)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h4 className="text-lg font-medium text-indigo-700 mb-2">{viewDetails.category}</h4>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(viewDetails.difficultyLevel)}`}>
                  {viewDetails.difficultyLevel?.charAt(0).toUpperCase() + viewDetails.difficultyLevel?.slice(1) || "N/A"}
                </span>
                {viewDetails.duration && (
                  <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800 flex items-center">
                    <Clock size={12} className="mr-1" />
                    {viewDetails.duration}
                  </span>
                )}
              </div>
              <p className="text-gray-700 mb-4">{viewDetails.description || "No description available."}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-1">Benefits</h5>
                  <p className="text-sm text-gray-600">{viewDetails.benefits || "No benefits listed."}</p>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-1">Last Updated</h5>
                  <p className="text-sm text-gray-600">{viewDetails.lastUpdated || "N/A"}</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-end gap-3">
              <a 
                href="#" 
                className="text-gray-700 hover:text-gray-900 flex items-center text-sm"
                onClick={(e) => {
                  e.preventDefault();
                  setViewDetails(null);
                  window.open('https://example.com/yoga-resources', '_blank');
                }}
              >
                <ExternalLink size={14} className="mr-1" />
                View Resources
              </a>
              <button
                onClick={() => {
                  const index = categories.findIndex(cat => cat.category === viewDetails.category);
                  setViewDetails(null);
                  handleEdit(index);
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center"
              >
                <Edit size={16} className="mr-2" />
                Edit Category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
