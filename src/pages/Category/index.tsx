import React, { useState, useEffect } from "react";
import {
  Trash2,
  Edit,
  Check,
  Search,
  AlertCircle,
  X,
  Info,
  Save,
  RefreshCw,
  Tag,
  BookOpen,
} from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { YogaCategoryService } from "@/services/category.service";

// Define TypeScript interfaces
interface CategoryFormValues {
  category: string;
  description: string;
}

interface CategoryItem {
  id: string;
  category: string;
  description: string;
}

interface NotificationState {
  show: boolean;
  message: string;
  type: "success" | "error" | "";
}

// Define validation schema using Yup
const CategorySchema = Yup.object().shape({
  category: Yup.string()
    .required("Category name is required")
    .min(2, "Category name must be at least 2 characters")
    .max(50, "Category name must be less than 50 characters"),
  description: Yup.string()
    .max(500, "Description must be less than 500 characters")
});

const Main: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"add" | "get">("add");
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [notification, setNotification] = useState<NotificationState>({
    show: false,
    message: "",
    type: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
  const [viewDetails, setViewDetails] = useState<CategoryItem | null>(null);

  // Initial form values
  const initialValues: CategoryFormValues = {
    category: "",
    description: "",
  };

  // Fetch all categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await YogaCategoryService.getAllCategories();
      // Map API response to our component's data structure
      const formattedCategories: CategoryItem[] = response.data.data.map((item: any) => ({
        id: item._id,
        category: item.yogaCategory,
        description: item.description || ""
      }));
      setCategories(formattedCategories);
    } catch (error: any) {
      showNotification(`Error fetching categories: ${error.message}`, "error");
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message: string, type: "success" | "error"): void => {
    setNotification({ show: true, message, type });
    setTimeout(
      () => setNotification({ show: false, message: "", type: "" }),
      3000
    );
  };

  const handleSubmit = async (
    values: CategoryFormValues, 
    { resetForm, setSubmitting }: { resetForm: () => void; setSubmitting: (isSubmitting: boolean) => void }
  ): Promise<void> => {
    // Check for duplicates when adding new category
    if (
      editIndex === null &&
      categories.some(
        (item) => item.category.toLowerCase() === values.category.toLowerCase()
      )
    ) {
      showNotification("This category already exists", "error");
      setSubmitting(false);
      return;
    }
    
    setLoading(true);
    try {
      const categoryData = { 
        category: values.category, 
        description: values.description
      };
      
      if (editIndex !== null) {
        // Edit existing category
        const categoryToUpdate = categories[editIndex];
        await YogaCategoryService.updateCategory(categoryToUpdate.id, categoryData);
        showNotification("Yoga category updated successfully", "success");
        setEditIndex(null);
      } else {
        // Add new category
        console.log(categoryData)
        await YogaCategoryService.createCategory(categoryData);
        showNotification("Yoga category added successfully", "success");
      }
      
      // Refresh categories list
      fetchCategories();
      
      // Reset form
      resetForm();
    } catch (error: any) {
      showNotification(`Error: ${error.message}`, "error");
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  const handleEdit = (index: number): void => {
    const item = categories[index];
    setEditIndex(index);
    setSelectedCategoryId(item.id);
    setActiveTab("add");
  };

  const handleDelete = (index: number): void => {
    setConfirmDelete(index);
  };

  const confirmDeleteAction = async (): Promise<void> => {
    if (confirmDelete === null) return;
    
    setLoading(true);
    try {
      const categoryToDelete = categories[confirmDelete];
      await YogaCategoryService.deleteCategory(categoryToDelete.id);
      showNotification("Yoga category deleted successfully", "success");
      fetchCategories();
    } catch (error: any) {
      showNotification(`Error deleting category: ${error.message}`, "error");
    } finally {
      setLoading(false);
      setConfirmDelete(null);
    }
  };

  const cancelDelete = (): void => {
    setConfirmDelete(null);
  };

  const handleViewDetails = async (item: CategoryItem): Promise<void> => {
    setLoading(true);
    try {
      console.log(item)
      // If we need detailed info for a single category, fetch it by ID
      const response = await YogaCategoryService.getCategoryById(item.id);
      const detailedCategory: CategoryItem = {
        id: response.data.yogaCategory._id,
        category: response.data.yogaCategory.yogaCategory,
        description: response.data.yogaCategory.description || ""
      };
      setViewDetails(detailedCategory);
    } catch (error: any) {
      showNotification(`Error fetching category details: ${error.message}`, "error");
    } finally {
      setLoading(false);
    }
  };

  const getSortedCategories = (): CategoryItem[] => {
    return categories.filter((item) => {
      return item.category.toLowerCase().includes(searchTerm.toLowerCase());
    });
  };

  const filteredCategories = getSortedCategories();

  const getCurrentFormValues = (): CategoryFormValues => {
    if (editIndex !== null) {
      const category = categories[editIndex];
      return {
        category: category.category,
        description: category.description || '',
      };
    }
    return initialValues;
  };

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-lg border-t-4 border-indigo-600 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center justify-between">
        <span>Yoga Category Management</span>
      </h2>

      {/* Notification */}
      {notification.show && (
        <div
          className={`mb-4 p-3 rounded-lg flex items-center justify-between ${
            notification.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          <div className="flex items-center">
            {notification.type === "success" ? (
              <Check size={18} className="mr-2" />
            ) : (
              <AlertCircle size={18} className="mr-2" />
            )}
            {notification.message}
          </div>
          <button
            onClick={() =>
              setNotification({ show: false, message: "", type: "" })
            }
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex border-b mb-6">
        <button
          className={`py-3 px-6 font-medium transition-all flex items-center ${
            activeTab === "add"
              ? "border-b-2 border-indigo-600 text-indigo-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("add")}
        >
          <Tag size={16} className="mr-2" />
          {editIndex !== null ? "Edit" : "Add"} Category
        </button>
        <button
          className={`py-3 px-6 font-medium transition-all flex items-center ${
            activeTab === "get"
              ? "border-b-2 border-indigo-600 text-indigo-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("get")}
        >
          <BookOpen size={16} className="mr-2" />
          View Categories
        </button>
      </div>

      {/* Add Tab Content */}
      {activeTab === "add" && (
        <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium mb-4 text-gray-800">
            {editIndex !== null
              ? "Edit Yoga Category"
              : "Add New Yoga Category"}
          </h3>

          <Formik
            initialValues={getCurrentFormValues()}
            validationSchema={CategorySchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {({ values, errors, touched, handleChange, handleBlur, resetForm, isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <label
                    htmlFor="category"
                    className="block mb-2 font-medium text-gray-700"
                  >
                    Yoga Category <span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="text"
                    id="category"
                    name="category"
                    className={`w-full p-3 border ${
                      errors.category && touched.category 
                        ? "border-red-300 ring-red-500" 
                        : "border-gray-300 focus:ring-indigo-500"
                    } rounded-md focus:outline-none focus:ring-2 focus:border-transparent`}
                    placeholder="Enter yoga category name"
                    disabled={loading || isSubmitting}
                  />
                  <ErrorMessage 
                    name="category" 
                    component="p" 
                    className="mt-1 text-sm text-red-600" 
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Enter a unique yoga category name
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block mb-2 font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <Field
                    as="textarea"
                    id="description"
                    name="description"
                    className={`w-full p-3 border ${
                      errors.description && touched.description 
                        ? "border-red-300 ring-red-500" 
                        : "border-gray-300 focus:ring-indigo-500"
                    } rounded-md focus:outline-none focus:ring-2 focus:border-transparent`}
                    placeholder="Enter detailed description of the yoga category"
                    rows={3}
                    disabled={loading || isSubmitting}
                  />
                  <ErrorMessage 
                    name="description" 
                    component="p" 
                    className="mt-1 text-sm text-red-600" 
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Provide a brief description of the yoga style and practices
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      resetForm();
                      setEditIndex(null);
                    }}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                    disabled={loading || isSubmitting}
                  >
                    Clear Form
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center"
                    disabled={loading || isSubmitting}
                  >
                    {loading || isSubmitting ? (
                      <span className="flex items-center">
                        <RefreshCw size={16} className="mr-2 animate-spin" />
                        Processing...
                      </span>
                    ) : (
                      <>
                        <Save size={16} className="mr-2" />
                        {editIndex !== null ? "Update" : "Save"} Category
                      </>
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}

      {/* Get Tab Content */}
      {activeTab === "get" && (
        <div className="space-y-4">
          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row justify-between gap-3">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search categories..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-10">
                    S.No
                  </th>
                  <th className="p-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Category Name
                  </th>
                  <th className="p-3 border-b-2 border-gray-200 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={3}
                      className="p-6 text-center text-gray-500"
                    >
                      <div className="flex flex-col items-center justify-center">
                        <RefreshCw
                          size={24}
                          className="animate-spin mb-2 text-indigo-500"
                        />
                        <p>Loading categories...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredCategories.length > 0 ? (
                  filteredCategories.map((item, index) => {
                    const originalIndex = categories.findIndex(
                      (cat) => cat.id === item.id
                    );
                    return (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="p-3 border-b border-gray-200">
                          {index + 1}
                        </td>
                        <td className="p-3 border-b border-gray-200 font-medium">
                          {item.category}
                        </td>
                        <td className="p-3 border-b border-gray-200">
                          <div className="flex items-center justify-center space-x-2">
                            <button
                              className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                              onClick={() => handleViewDetails(item)}
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
                    <td
                      colSpan={3}
                      className="p-6 text-center text-gray-500"
                    >
                      <div className="flex flex-col items-center justify-center">
                        <AlertCircle size={24} className="mb-2 text-gray-400" />
                        <p>
                          No yoga categories found matching your search
                          criteria.
                        </p>
                        <button
                          onClick={() => {
                            setSearchTerm("");
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
              Showing {filteredCategories.length} out of {categories.length}{" "}
              categories
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
              Are you sure you want to delete the yoga category "
              {categories[confirmDelete]?.category}"? This action cannot be
              undone.
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
              <button
                onClick={() => setViewDetails(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-4 bg-gray-50 rounded mb-4">
              <h4 className="font-medium mb-2">{viewDetails.category}</h4>
              <p className="text-gray-600">
                {viewDetails.description || "No description available for this category."}
              </p>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  const index = categories.findIndex(
                    (cat) => cat.id === viewDetails.id
                  );
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