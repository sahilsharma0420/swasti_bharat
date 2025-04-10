import React, { useState, useEffect } from 'react';
import { 
  YogaClassService, 
  YogaCategoryService, 
  YogaTutorRequirementsService, 
  YogaTutorRulesService,
  type YogaClass,
  type YogaCategory,
  type YTRequirement,
  type YTRule} from "../../services/apiService"

// Component interfaces
interface FormData {
  modeOfClass: string;
  classType: string;
  time: string;
  description: string;
  timeDurationInMin: number;
  numberOfSeats: number;
  numberOfClass: number;
  packageType: string;
  price: number;
  datesOfClasses: string[];
  yogaCategory: string[];
  yTRequirement: string[];
  yTRule: string[];
  instructorTimeZone: string;
}

interface YogaClassManagerProps {
  userRole: 'instructor' | 'admin' | 'user';
  onClassCreated?: () => void;
  onClassUpdated?: () => void;
}

const initialFormData: FormData = {
  modeOfClass: 'online',
  classType: 'individual',
  time: '09:00',
  description: '',
  timeDurationInMin: 60,
  numberOfSeats: 10,
  numberOfClass: 1,
  packageType: 'daily',
  price: 500,
  datesOfClasses: [],
  yogaCategory: [],
  yTRequirement: [],
  yTRule: [],
  instructorTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
};

const YogaClassManager: React.FC<YogaClassManagerProps> = ({ userRole, onClassCreated, onClassUpdated }) => {
  // State management
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [classes, setClasses] = useState<YogaClass[]>([]);
  const [categories, setCategories] = useState<YogaCategory[]>([]);
  const [requirements, setRequirements] = useState<YTRequirement[]>([]);
  const [rules, setRules] = useState<YTRule[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Filter state
  const [filters, setFilters] = useState<{
    modeOfClass: string;
    classType: string;
    search: string;
    approvalByAdmin: 'pending' | 'accepted' | 'rejected';
    page: number;
    resultPerPage: number;
  }>({
    modeOfClass: '',
    classType: '',
    search: '',
    approvalByAdmin: userRole === 'admin' ? 'pending' : 'accepted',
    page: 1,
    resultPerPage: 10
  });

  // Load data
  useEffect(() => {
    fetchCategories();
    fetchRequirements();
    fetchRules();
    fetchClasses();
  }, [userRole, filters]);

  // Fetch data functions
  const fetchCategories = async () => {
    try {
      const response = await YogaCategoryService.getAllCategories();
      if (response.success && response.data) {
        setCategories(response.data);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const fetchRequirements = async () => {
    try {
      const requirements = await YogaTutorRequirementsService.getAllRequirements();
      setRequirements(requirements);
    } catch (err) {
      console.error('Error fetching requirements:', err);
    }
  };

  const fetchRules = async () => {
    try {
      const rules = await YogaTutorRulesService.getAllRules();
      setRules(rules);
    } catch (err) {
      console.error('Error fetching rules:', err);
    }
  };

  const fetchClasses = async () => {
    setLoading(true);
    setError(null);
    try {
      let response;
      if (userRole === 'instructor') {
        response = await YogaClassService.getInstructorClasses(filters);
      } else if (userRole === 'admin') {
        response = await YogaClassService.getAdminClasses(filters);
      } else {
        // For user role, we need to transform the filters
        const userFilters = {
          mOC: filters.modeOfClass,
          cT: filters.classType,
          search: filters.search,
          page: filters.page,
          resultPerPage: filters.resultPerPage
        };
        response = await YogaClassService.getUserClasses(userFilters);
      }

      if (response.success && response.data) {
        setClasses(response.data.data);
        setTotalPages(response.data.totalPages);
        setCurrentPage(response.data.currentPage);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch classes');
    } finally {
      setLoading(false);
    }
  };

  const fetchClassDetails = async (classId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await YogaClassService.getClassDetails(classId);
      if (response.success && response.data) {
        const classDetails = response.data;
        setFormData({
          modeOfClass: classDetails.modeOfClass,
          classType: classDetails.classType,
          time: classDetails.time,
          description: classDetails.description,
          timeDurationInMin: classDetails.timeDurationInMin,
          numberOfSeats: classDetails.numberOfSeats,
          numberOfClass: classDetails.numberOfClass,
          packageType: classDetails.packageType,
          price: classDetails.price,
          datesOfClasses: classDetails.datesOfClasses.map(date => date.date),
          yogaCategory: Array.isArray(classDetails.yogaCategory) 
            ? classDetails.yogaCategory.map(cat => typeof cat === 'string' ? cat : cat._id)
            : [],
          yTRequirement: Array.isArray(classDetails.yTRequirement) 
            ? classDetails.yTRequirement.map(req => typeof req === 'string' ? req : req._id)
            : [],
          yTRule: Array.isArray(classDetails.yTRule) 
            ? classDetails.yTRule.map(rule => typeof rule === 'string' ? rule : rule._id)
            : [],
          instructorTimeZone: classDetails.instructorTimeZone || Intl.DateTimeFormat().resolvedOptions().timeZone,
        });
        setIsEditing(true);
        setSelectedClassId(classId);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch class details');
    } finally {
      setLoading(false);
    }
  };

  // Form handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: parseInt(value, 10)
    });
  };

  const handleMultiSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name } = e.target;
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setFormData({
      ...formData,
      [name]: selectedOptions
    });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    let dates = [...formData.datesOfClasses];
    
    if (dates.includes(date)) {
      dates = dates.filter(d => d !== date);
    } else {
      dates.push(date);
    }
    
    setFormData({
      ...formData,
      datesOfClasses: dates,
      numberOfClass: dates.length
    });
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
      page: 1 // Reset to first page on filter change
    });
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    
    setFilters({
      ...filters,
      page: newPage
    });
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError(null);
  setSuccess(null);
  
  try {
    if (isEditing && selectedClassId) {
      // Update existing class
      const { yogaCategory, yTRequirement, yTRule, price } = formData;
      const response = await YogaClassService.updateClass(selectedClassId, {
        yogaCategory,
        yTRequirement,
        yTRule,
        price
      });
      
      if (response.success) {
        setSuccess('Class updated successfully');
        setIsEditing(false);
        setSelectedClassId(null);
        setFormData(initialFormData);
        fetchClasses();
        if (onClassUpdated) onClassUpdated();
      }
    } else {
      // Create new class
      // Transform string dates to DateOfClass objects
      const transformedData = {
        ...formData,
        datesOfClasses: formData.datesOfClasses.map(date => ({
          date,
          meetingLink: null
        }))
      };
      
      const response = await YogaClassService.addNewClass(transformedData);
      
      if (response.success) {
        setSuccess('Class created successfully');
        setFormData(initialFormData);
        fetchClasses();
        if (onClassCreated) onClassCreated();
      }
    }
  } catch (err: any) {
    setError(err.message || 'An error occurred');
  } finally {
    setLoading(false);
  }
};

  const handleDelete = async (classId: string) => {
    if (!confirm('Are you sure you want to delete this class?')) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await YogaClassService.deleteClass(classId);
      if (response.success) {
        setSuccess('Class deleted successfully');
        fetchClasses();
      }
    } catch (err: any) {
      setError(err.message || 'Failed to delete class');
    } finally {
      setLoading(false);
    }
  };

  const handleApproval = async (classId: string, status: 'accepted' | 'rejected') => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await YogaClassService.approveRejectClass(classId, status);
      if (response.success) {
        setSuccess(`Class ${status} successfully`);
        fetchClasses();
      }
    } catch (err: any) {
      setError(err.message || `Failed to ${status} class`);
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setSelectedClassId(null);
    setFormData(initialFormData);
  };

  // Helper function to render dates selector
  const renderDatesSelector = () => {
    if (formData.numberOfClass <= 0) return null;
    
    const today = new Date();
    const dates = [];
    for (let i = 0; i < 60; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      const formattedDate = date.toISOString().split('T')[0];
      dates.push(formattedDate);
    }
    
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Select Class Dates (select {formData.numberOfClass})</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-1">
          {dates.slice(0, 28).map(date => (
            <label key={date} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={date}
                checked={formData.datesOfClasses.includes(date)}
                onChange={handleDateChange}
                disabled={isEditing} // Can't change dates when editing
                className="h-4 w-4 text-blue-600"
              />
              <span>{new Date(date).toLocaleDateString()}</span>
            </label>
          ))}
        </div>
        {formData.datesOfClasses.length !== formData.numberOfClass && (
          <p className="text-red-500 text-sm mt-1">
            Please select exactly {formData.numberOfClass} dates
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      {/* Filter Section */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Mode of Class</label>
            <select
              name="modeOfClass"
              value={filters.modeOfClass}
              onChange={handleFilterChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">All</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Class Type</label>
            <select
              name="classType"
              value={filters.classType}
              onChange={handleFilterChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">All</option>
              <option value="individual">Individual</option>
              <option value="group">Group</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Search</label>
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search classes..."
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          {userRole === 'admin' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Approval Status</label>
              <select
                name="approvalByAdmin"
                value={filters.approvalByAdmin}
                onChange={handleFilterChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Classes List */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">Yoga Classes</h2>
        
        {loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : classes.length === 0 ? (
          <div className="text-center py-4 text-gray-500">No classes found</div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mode</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {classes.map((yogaClass) => (
                    <tr key={yogaClass._id}>
                      <td className="px-4 py-2 whitespace-nowrap">{yogaClass.modeOfClass}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{yogaClass.classType}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{yogaClass.time}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{yogaClass.timeDurationInMin} min</td>
                      <td className="px-4 py-2 whitespace-nowrap">₹{yogaClass.price}</td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          yogaClass.approvalByAdmin === 'accepted' ? 'bg-green-100 text-green-800' :
                          yogaClass.approvalByAdmin === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {yogaClass.approvalByAdmin}
                        </span>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap flex space-x-2">
                        {userRole === 'instructor' && (
                          <>
                            <button
                              onClick={() => fetchClassDetails(yogaClass._id)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(yogaClass._id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              Delete
                            </button>
                          </>
                        )}
                        
                        {userRole === 'admin' && yogaClass.approvalByAdmin === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApproval(yogaClass._id, 'accepted')}
                              className="text-green-600 hover:text-green-800"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleApproval(yogaClass._id, 'rejected')}
                              className="text-red-600 hover:text-red-800"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
              <div>
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Form (only for instructors) */}
      {userRole === 'instructor' && (
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">
            {isEditing ? 'Edit Yoga Class' : 'Create New Yoga Class'}
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Mode of Class</label>
                <select
                  name="modeOfClass"
                  value={formData.modeOfClass}
                  onChange={handleInputChange}
                  disabled={isEditing}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Class Type</label>
                <select
                  name="classType"
                  value={formData.classType}
                  onChange={handleInputChange}
                  disabled={isEditing}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="individual">Individual</option>
                  <option value="group">Group</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Time</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  disabled={isEditing}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
                <input
                  type="number"
                  name="timeDurationInMin"
                  value={formData.timeDurationInMin}
                  onChange={handleNumberChange}
                  disabled={isEditing}
                  min={30}
                  step={15}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Number of Seats</label>
                <input
                  type="number"
                  name="numberOfSeats"
                  value={formData.numberOfSeats}
                  onChange={handleNumberChange}
                  disabled={isEditing}
                  min={1}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Package Type</label>
                <select
                  name="packageType"
                  value={formData.packageType}
                  onChange={handleInputChange}
                  disabled={isEditing}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="daily">Daily (1 class)</option>
                  <option value="weekly">Weekly (2-7 classes)</option>
                  <option value="monthly">Monthly (8-28 classes)</option>
                </select>
              </div>
              
              {!isEditing && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Number of Classes
                  </label>
                  <input
                    type="number"
                    name="numberOfClass"
                    value={formData.numberOfClass}
                    onChange={handleNumberChange}
                    min={1}
                    max={formData.packageType === 'daily' ? 1 : formData.packageType === 'weekly' ? 7 : 28}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {formData.packageType === 'daily' ? 'Max: 1' : 
                     formData.packageType === 'weekly' ? 'Range: 2-7' : 'Range: 8-28'}
                  </p>
                </div>
              )}
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleNumberChange}
                  min={500 * formData.numberOfClass}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Price per class must be at least ₹500
                </p>
              </div>
              
              <div className="mb-4 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  disabled={isEditing}
                  required
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                ></textarea>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Yoga Categories</label>
                <select
                  name="yogaCategory"
                  value={formData.yogaCategory}
                  onChange={handleMultiSelectChange}
                  multiple
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 h-32"
                >
                  {categories.map(category => (
                    <option key={category._id} value={category._id}>
                      {category.yogaCategory}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-gray-500 mt-1">
                  Hold Ctrl/Cmd to select multiple categories
                </p>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Requirements</label>
                <select
                  name="yTRequirement"
                  value={formData.yTRequirement}
                  onChange={handleMultiSelectChange}
                  multiple
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 h-32"
                >
                  {requirements.map(req => (
                    <option key={req._id} value={req._id}>
                      {req.requirement}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-gray-500 mt-1">
                  Hold Ctrl/Cmd to select multiple requirements
                </p>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Rules</label>
                <select
                  name="yTRule"
                  value={formData.yTRule}
                  onChange={handleMultiSelectChange}
                  multiple
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 h-32"
                >
                  {rules.map(rule => (
                    <option key={rule._id} value={rule._id}>
                      {rule.rule}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-gray-500 mt-1">
                  Hold Ctrl/Cmd to select multiple rules
                </p>
              </div>
            </div>
            
            {!isEditing && renderDatesSelector()}
            
            <div className="flex mt-6 space-x-4">
              <button
                type="submit"
                disabled={loading || (!isEditing && formData.datesOfClasses.length !== formData.numberOfClass)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                >
                  {isEditing ? 'Update Class' : 'Create Class'}
                </button>
                
                {isEditing && (
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    );
  };
  
  export default YogaClassManager;