import React, { useState, useEffect } from 'react';
import { PlusCircle, Pencil, Trash2, X, Save, Loader, AlertCircle, CheckCircle, ListIcon, FileText, BookOpen } from 'lucide-react';
import { YogaTutorRulesService, YTRule } from '@/services/apiService';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Validation schema for rule
const RuleSchema = Yup.object().shape({
  rule: Yup.string()
    .min(5, 'Rule must be at least 5 characters')
    .max(500, 'Rule must be less than 500 characters')
    .required('Rule text is required')
});

type TabType = 'add' | 'view';

const YogaTutorRules: React.FC = () => {
  const [rules, setRules] = useState<YTRule[]>([]);
  const [editingRule, setEditingRule] = useState<{id: string, value: string} | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('add');

  // Fetch all rules on component mount
  useEffect(() => {
    fetchRules();
  }, []);

  const fetchRules = async () => {
    setIsLoading(true);
    try {
      const rulesData = await YogaTutorRulesService.getAllRules();
      setRules(rulesData);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch rules');
    } finally {
      setIsLoading(false);
    }
  };

  const addRule = async (values: { rule: string }, { resetForm }: any) => {
    setIsLoading(true);
    try {
      const message = await YogaTutorRulesService.addRule(values.rule);
      setSuccess(message || 'Rule added successfully');
      resetForm();
      fetchRules();
      setActiveTab('view'); // Switch to view tab after adding
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to add rule');
    } finally {
      setIsLoading(false);
    }
  };

  const startEditing = (rule: YTRule) => {
    setEditingRule({ id: rule._id, value: rule.rule });
  };

  const cancelEditing = () => {
    setEditingRule(null);
  };

  const updateRule = async (values: { rule: string }) => {
    if (!editingRule) return;

    setIsLoading(true);
    try {
      const message = await YogaTutorRulesService.updateRule(
        editingRule.id, 
        values.rule
      );
      setSuccess(message || 'Rule updated successfully');
      setEditingRule(null);
      fetchRules();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update rule');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteRule = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this rule?')) {
      return;
    }

    setIsLoading(true);
    try {
      const message = await YogaTutorRulesService.deleteRule(id);
      setSuccess(message || 'Rule deleted successfully');
      fetchRules();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete rule');
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
          <div className="bg-blue-100 text-blue-700 p-2 rounded-lg mr-3">
            <BookOpen className="h-6 w-6" />
          </div>
          Yoga Tutor Rules
        </h2>
        
        <div className="text-sm text-gray-500">
          Total Rules: <span className="font-bold text-blue-600">{rules.length}</span>
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
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm flex items-center transition-all`}
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              Add Rule
            </button>
            <button
              onClick={() => setActiveTab('view')}
              className={`${
                activeTab === 'view'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm flex items-center transition-all`}
            >
              <ListIcon className="h-5 w-5 mr-2" />
              View Rules
              {rules.length > 0 && (
                <span className="ml-2 bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs">
                  {rules.length}
                </span>
              )}
            </button>
          </nav>
        </div>
      </div>

      {/* Add Rule Tab */}
      {activeTab === 'add' && (
        <div className="animate-fadeIn">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-100 shadow-sm">
            <h3 className="text-lg font-semibold text-blue-700 mb-4 flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Create New Rule
            </h3>
            
            <Formik
              initialValues={{ rule: '' }}
              validationSchema={RuleSchema}
              onSubmit={addRule}
            >
              {({ isSubmitting, errors, touched, values }) => (
                <Form className="space-y-4">
                  <div className="flex flex-col">
                    <label htmlFor="rule" className="text-sm font-medium text-gray-700 mb-1">
                      Rule Description
                    </label>
                    <Field
                      as="textarea"
                      id="rule"
                      name="rule"
                      rows={5}
                      placeholder="Enter detailed yoga tutor rule..."
                      className={`p-4 border ${errors.rule && touched.rule ? 'border-red-300 bg-red-50' : 'border-blue-200'} 
                        rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-base`}
                    />
                    <ErrorMessage 
                      name="rule" 
                      component="div" 
                      className="text-red-600 text-sm mt-1 font-medium" 
                    />
                    <div className="flex justify-between mt-2">
                      <div className="text-xs text-gray-500">
                        {values.rule.length} / 500 characters
                      </div>
                      {values.rule.length < 5 && values.rule.length > 0 && (
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
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center transition-all shadow-md hover:shadow-lg disabled:opacity-70"
                    >
                      {(isSubmitting || isLoading) ? (
                        <Loader className="h-5 w-5 animate-spin mr-2" />
                      ) : (
                        <PlusCircle className="h-5 w-5 mr-2" />
                      )}
                      Add Rule
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}

      {/* View Rules Tab */}
      {activeTab === 'view' && (
        <div className="animate-fadeIn">
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 rounded-xl border border-cyan-100 shadow-sm mb-6">
            <h3 className="text-lg font-semibold text-cyan-700 mb-4 flex items-center">
              <ListIcon className="h-5 w-5 mr-2" />
              Existing Rules
            </h3>
            
            {isLoading && !rules.length ? (
              <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                <Loader className="h-10 w-10 animate-spin mx-auto text-blue-500 mb-3" />
                <p className="text-gray-600 font-medium">Loading rules...</p>
              </div>
            ) : rules.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
                <p className="text-gray-500 font-medium">No rules found.</p>
                <button 
                  onClick={() => setActiveTab('add')}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Your First Rule
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {rules.map((rule, index) => (
                  <div 
                    key={rule._id} 
                    className={`border border-gray-200 rounded-xl p-5 bg-white hover:bg-gray-50 transition-all shadow-sm hover:shadow ${
                      index % 2 === 0 ? 'border-l-4 border-l-blue-400' : 'border-l-4 border-l-cyan-400'
                    }`}
                  >
                    {editingRule && editingRule.id === rule._id ? (
                      <Formik
                        initialValues={{ rule: editingRule.value }}
                        validationSchema={RuleSchema}
                        onSubmit={updateRule}
                      >
                        {({ isSubmitting, errors, touched, values }) => (
                          <Form className="space-y-4">
                            <div className="flex flex-col">
                              <Field
                                as="textarea"
                                name="rule"
                                rows={4}
                                className={`w-full p-3 border ${errors.rule && touched.rule ? 'border-red-300 bg-red-50' : 'border-blue-200'} 
                                  rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                              />
                              <ErrorMessage 
                                name="rule" 
                                component="div" 
                                className="text-red-600 text-sm mt-1" 
                              />
                              <div className="flex justify-between mt-2">
                                <div className="text-xs text-gray-500">
                                  {values.rule.length} / 500 characters
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
                        <p className="text-gray-700 leading-relaxed">{rule.rule}</p>
                        <div className="flex space-x-2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => startEditing(rule)}
                            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-full transition-colors"
                            title="Edit Rule"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deleteRule(rule._id)}
                            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-full transition-colors"
                            title="Delete Rule"
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
          
          {rules.length > 0 && (
            <div className="flex justify-center">
              <button 
                onClick={() => setActiveTab('add')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Another Rule
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default YogaTutorRules;