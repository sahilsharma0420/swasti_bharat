import React, { useState, useEffect } from 'react';
import { PlusCircle, Pencil, Trash2, X, Save, Loader, AlertCircle, CheckCircle, ListIcon, FileText } from 'lucide-react';
import { YogaTutorRequirementsService, YTRequirement } from '@/services/apiService';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Validation schema for requirement
const RequirementSchema = Yup.object().shape({
  requirement: Yup.string()
    .min(5, 'Requirement must be at least 5 characters')
    .max(500, 'Requirement must be less than 500 characters')
    .required('Requirement text is required')
});

type TabType = 'add' | 'view';

const YogaTutorRequirements: React.FC = () => {
  const [requirements, setRequirements] = useState<YTRequirement[]>([]);
  const [editingRequirement, setEditingRequirement] = useState<{id: string, value: string} | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('add');

  // Fetch all requirements on component mount
  useEffect(() => {
    fetchRequirements();
  }, []);

  const fetchRequirements = async () => {
    setIsLoading(true);
    try {
      const requirementsData = await YogaTutorRequirementsService.getAllRequirements();
      setRequirements(requirementsData);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch requirements');
    } finally {
      setIsLoading(false);
    }
  };

  const addRequirement = async (values: { requirement: string }, { resetForm }: any) => {
    setIsLoading(true);
    try {
      const message = await YogaTutorRequirementsService.addRequirement(values.requirement);
      setSuccess(message || 'Requirement added successfully');
      resetForm();
      fetchRequirements();
      setActiveTab('view'); // Switch to view tab after adding
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to add requirement');
    } finally {
      setIsLoading(false);
    }
  };

  const startEditing = (requirement: YTRequirement) => {
    setEditingRequirement({ id: requirement._id, value: requirement.requirement });
  };

  const cancelEditing = () => {
    setEditingRequirement(null);
  };

  const updateRequirement = async (values: { requirement: string }) => {
    if (!editingRequirement) return;

    setIsLoading(true);
    try {
      const message = await YogaTutorRequirementsService.updateRequirement(
        editingRequirement.id, 
        values.requirement
      );
      setSuccess(message || 'Requirement updated successfully');
      setEditingRequirement(null);
      fetchRequirements();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update requirement');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteRequirement = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this requirement?')) {
      return;
    }

    setIsLoading(true);
    try {
      const message = await YogaTutorRequirementsService.deleteRequirement(id);
      setSuccess(message || 'Requirement deleted successfully');
      fetchRequirements();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete requirement');
    } finally {
      setIsLoading(false);
    }
  };

  // Clear notifications after 3 seconds
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess(null);
        setError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-8  mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <div className="bg-indigo-100 text-indigo-700 p-2 rounded-lg mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          Yoga Tutor Requirements
        </h2>
        
        <div className="text-sm text-gray-500">
          Total Requirements: <span className="font-bold text-indigo-600">{requirements.length}</span>
        </div>
      </div>
      
      {/* Notification area */}
      {success && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-md flex items-center animate-fadeIn">
          <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
          <span className="font-medium">{success}</span>
        </div>
      )}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md flex items-center animate-fadeIn">
          <AlertCircle className="h-5 w-5 mr-2 text-red-600" />
          <span className="font-medium">{error}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-6">
            <button
              onClick={() => setActiveTab('add')}
              className={`${
                activeTab === 'add'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm flex items-center transition-all`}
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              Add Requirement
            </button>
            <button
              onClick={() => setActiveTab('view')}
              className={`${
                activeTab === 'view'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm flex items-center transition-all`}
            >
              <ListIcon className="h-5 w-5 mr-2" />
              View Requirements
              {requirements.length > 0 && (
                <span className="ml-2 bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full text-xs">
                  {requirements.length}
                </span>
              )}
            </button>
          </nav>
        </div>
      </div>

      {/* Add Requirement Tab */}
      {activeTab === 'add' && (
        <div className="animate-fadeIn">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-100 shadow-sm">
            <h3 className="text-lg font-semibold text-indigo-700 mb-4 flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Create New Requirement
            </h3>
            
            <Formik
              initialValues={{ requirement: '' }}
              validationSchema={RequirementSchema}
              onSubmit={addRequirement}
            >
              {({ isSubmitting, errors, touched, values }) => (
                <Form className="space-y-4">
                  <div className="flex flex-col">
                    <label htmlFor="requirement" className="text-sm font-medium text-gray-700 mb-1">
                      Requirement Description
                    </label>
                    <Field
                      as="textarea"
                      id="requirement"
                      name="requirement"
                      rows={5}
                      placeholder="Enter detailed yoga tutor requirement..."
                      className={`p-4 border ${errors.requirement && touched.requirement ? 'border-red-300 bg-red-50' : 'border-indigo-200'} 
                        rounded-lg text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-base`}
                    />
                    <ErrorMessage 
                      name="requirement" 
                      component="div" 
                      className="text-red-600 text-sm mt-1 font-medium" 
                    />
                    <div className="flex justify-between mt-2">
                      <div className="text-xs text-gray-500">
                        {values.requirement.length} / 500 characters
                      </div>
                      {values.requirement.length < 5 && values.requirement.length > 0 && (
                        <div className="text-xs text-amber-600">
                          Minimum 5 characters required
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting || isLoading}
                      className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 flex items-center justify-center transition-all shadow-md hover:shadow-lg disabled:opacity-70"
                    >
                      {(isSubmitting || isLoading) ? (
                        <Loader className="h-5 w-5 animate-spin mr-2" />
                      ) : (
                        <PlusCircle className="h-5 w-5 mr-2" />
                      )}
                      Add Requirement
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}

      {/* View Requirements Tab */}
      {activeTab === 'view' && (
        <div className="animate-fadeIn">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100 shadow-sm mb-6">
            <h3 className="text-lg font-semibold text-blue-700 mb-4 flex items-center">
              <ListIcon className="h-5 w-5 mr-2" />
              Existing Requirements
            </h3>
            
            {isLoading && !requirements.length ? (
              <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                <Loader className="h-10 w-10 animate-spin mx-auto text-indigo-500 mb-3" />
                <p className="text-gray-600 font-medium">Loading requirements...</p>
              </div>
            ) : requirements.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
                <p className="text-gray-500 font-medium">No requirements found.</p>
                <button 
                  onClick={() => setActiveTab('add')}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Your First Requirement
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {requirements.map((requirement, index) => (
                  <div 
                    key={requirement._id} 
                    className={`border border-gray-200 rounded-xl p-5 bg-white hover:bg-gray-50 transition-all shadow-sm hover:shadow ${
                      index % 2 === 0 ? 'border-l-4 border-l-indigo-400' : 'border-l-4 border-l-blue-400'
                    }`}
                  >
                    {editingRequirement && editingRequirement.id === requirement._id ? (
                      <Formik
                        initialValues={{ requirement: editingRequirement.value }}
                        validationSchema={RequirementSchema}
                        onSubmit={updateRequirement}
                      >
                        {({ isSubmitting, errors, touched, values }) => (
                          <Form className="space-y-4">
                            <div className="flex flex-col">
                              <Field
                                as="textarea"
                                name="requirement"
                                rows={4}
                                className={`w-full p-3 border ${errors.requirement && touched.requirement ? 'border-red-300 bg-red-50' : 'border-indigo-200'} 
                                  rounded-lg text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                              />
                              <ErrorMessage 
                                name="requirement" 
                                component="div" 
                                className="text-red-600 text-sm mt-1" 
                              />
                              <div className="flex justify-between mt-2">
                                <div className="text-xs text-gray-500">
                                  {values.requirement.length} / 500 characters
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-end space-x-3">
                              <button
                                type="button"
                                onClick={cancelEditing}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 flex items-center transition-all"
                              >
                                <X className="h-4 w-4 mr-1" /> Cancel
                              </button>
                              <button
                                type="submit"
                                disabled={isSubmitting || isLoading}
                                className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 flex items-center shadow-sm hover:shadow transition-all"
                              >
                                {(isSubmitting || isLoading) ? (
                                  <Loader className="h-4 w-4 animate-spin mr-1" />
                                ) : (
                                  <Save className="h-4 w-4 mr-1" />
                                )}
                                Save Changes
                              </button>
                            </div>
                          </Form>
                        )}
                      </Formik>
                    ) : (
                      <div className="flex items-start justify-between group">
                        <p className="text-gray-700 leading-relaxed">{requirement.requirement}</p>
                        <div className="flex space-x-2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => startEditing(requirement)}
                            className="p-2 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-100 rounded-full transition-colors"
                            title="Edit Requirement"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deleteRequirement(requirement._id)}
                            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-full transition-colors"
                            title="Delete Requirement"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {requirements.length > 0 && (
            <div className="flex justify-center">
              <button 
                onClick={() => setActiveTab('add')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Another Requirement
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default YogaTutorRequirements;