import React, { useState, useEffect } from "react";
import {
  Trash2,
  Edit,
  Check,
  Search,
  AlertCircle,
  X,
  PlusCircle,
  RefreshCw,
  ChevronDown,
} from "lucide-react";
import { SpecializationService } from '@/services/apiService';



import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";

// Updated Specialization interface to match API response
interface Specialization {
  _id: string;
  specialization: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Form values interface
interface SpecializationFormValues {
  specialization: string;
  description: string;
}

// Notification interface
interface NotificationState {
  show: boolean;
  message: string;
  type: "success" | "error" | "";
}

// Validation schema using Yup
const SpecializationSchema = Yup.object().shape({
  specialization: Yup.string()
    .required("Specialization name is required")
    .min(2, "Specialization must be at least 2 characters")
    .max(50, "Specialization must be less than 50 characters"),
  description: Yup.string().max(
    500,
    "Description must be less than 500 characters"
  ),
});

const Main: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"add" | "get">("add");
  const [specializations, setSpecializations] = useState<Specialization[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [notification, setNotification] = useState<NotificationState>({
    show: false,
    message: "",
    type: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [apiResponseDebug, setApiResponseDebug] = useState<string>(
    "No API call made yet"
  );

  // Initial form values for Formik
  const initialValues: SpecializationFormValues = {
    specialization: "",
    description: "",
  };

  // Fetch all specializations on component mount
  useEffect(() => {
    fetchSpecializations();
  }, []);

  // Helper function to extract specializations from various response formats
  const extractSpecializations = (response: any): Specialization[] => {
    const specializationArray = response?.data?.specialization;
  
    if (Array.isArray(specializationArray)) {
      return specializationArray.filter(
        (item) =>
          item &&
          typeof item === "object" &&
          "_id" in item &&
          "specialization" in item
      );
    }
  
    return [];
  };
  

  // Fetch all specializations from API
  const fetchSpecializations = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await SpecializationService.getAllSpecializations();
      console.log("Raw API response:", response);
      setApiResponseDebug(JSON.stringify(response, null, 2));

      // Try to extract specializations regardless of the response structure
      const extractedSpecializations = extractSpecializations(response);

      if (extractedSpecializations.length > 0) {
        setSpecializations(extractedSpecializations);
        showNotification(
          `Loaded ${extractedSpecializations.length} specializations successfully`,
          "success"
        );

        // Try to extract pagination info if available
        const totalPages =
          response?.data?.totalPages || response?.data?.data?.totalPages || 1;
        const currentPage =
          response?.data?.currentPage || response?.data?.data?.currentPage || 1;

        setTotalPages(totalPages);
        setCurrentPage(currentPage);
      } else {
        console.error("No valid specializations found in response");
        setSpecializations([]);
        showNotification("No specializations found in the response", "error");
      }
    } catch (error: any) {
      console.error("Error fetching specializations:", error);
      setSpecializations([]);
      showNotification(
        error.message || "Failed to load specializations",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (
    message: string,
    type: "success" | "error"
  ): void => {
    setNotification({ show: true, message, type });
    setTimeout(
      () => setNotification({ show: false, message: "", type: "" }),
      3000
    );
  };

  const handleSubmit = async (
    values: SpecializationFormValues,
    { resetForm, setSubmitting }: FormikHelpers<SpecializationFormValues>
  ): Promise<void> => {
    // Check for duplicate specialization
    const specialtyExists = specializations.some(
      (spec: Specialization) =>
        spec.specialization.toLowerCase() ===
          values.specialization.toLowerCase() &&
        (editIndex === null || specializations.indexOf(spec) !== editIndex)
    );

    if (specialtyExists) {
      showNotification("This specialization already exists", "error");
      setSubmitting(false);
      return;
    }

    setLoading(true);

    try {
      const newSpecialization: Omit<
        Specialization,
        "_id" | "createdAt" | "updatedAt"
      > = {
        specialization: values.specialization,
        description: values.description || "No description provided",
      };

      if (editIndex !== null && editId !== null) {
        await SpecializationService.updateSpecialization(
          editId,
          newSpecialization
        );
        showNotification("Specialization updated successfully!", "success");
      } else {
        await SpecializationService.createSpecialization(newSpecialization);
        showNotification("Specialization added successfully!", "success");
      }

      // Refresh the specialization list after add/update
      await fetchSpecializations();
      setEditIndex(null);
      setEditId(null);
      resetForm();
    } catch (error: any) {
      showNotification(error.message || "Operation failed", "error");
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  const handleEdit = (index: number): void => {
    const spec = specializations[index];
    if (spec) {
      setEditIndex(index);
      setEditId(spec._id);
      setActiveTab("add");
    }
  };

  const handleDelete = (index: number): void => {
    setConfirmDelete(index);
  };

  const confirmDeleteAction = async (): Promise<void> => {
    if (confirmDelete === null) return;

    const specToDelete = specializations[confirmDelete];
    if (!specToDelete) {
      setConfirmDelete(null);
      return;
    }

    setLoading(true);
    try {
      await SpecializationService.deleteSpecialization(specToDelete._id);
      await fetchSpecializations();
      showNotification("Specialization deleted successfully!", "success");
    } catch (error: any) {
      showNotification(
        error.message || "Failed to delete specialization",
        "error"
      );
    } finally {
      setConfirmDelete(null);
      setLoading(false);
    }
  };

  const cancelDelete = (): void => {
    setConfirmDelete(null);
  };

  const handleSort = (): void => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);

    const sorted = [...specializations].sort((a, b) => {
      if (newOrder === "asc") {
        return a.specialization.localeCompare(b.specialization);
      } else {
        return b.specialization.localeCompare(a.specialization);
      }
    });

    setSpecializations(sorted);
  };

  const resetFilters = (): void => {
    setSearchTerm("");
    setSortOrder("asc");
    fetchSpecializations();
  };

  // Safely filter specializations with proper checks
  const filteredSpecializations = specializations
    .filter((spec) => spec && typeof spec === "object")
    .filter(
      (spec) =>
        spec.specialization &&
        spec.specialization.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
        <div
          className={`mb-4 p-4 rounded-lg flex items-center justify-between transition-all ${
            notification.type === "success"
              ? "bg-green-100 text-green-800 border-l-4 border-green-500"
              : "bg-red-100 text-red-800 border-l-4 border-red-500"
          }`}
        >
          <div className="flex items-center">
            {notification.type === "success" ? (
              <Check size={20} className="mr-2" />
            ) : (
              <AlertCircle size={20} className="mr-2" />
            )}
            {notification.message}
          </div>
          <button
            onClick={() =>
              setNotification({ show: false, message: "", type: "" })
            }
            className="hover:bg-gray-200 p-1 rounded-full"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {confirmDelete !== null && specializations[confirmDelete] && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Confirm Delete</h3>
            <p className="mb-6">
              Are you sure you want to delete "
              {specializations[confirmDelete]?.specialization}"?
            </p>
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
            activeTab === "add"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("add")}
        >
          <PlusCircle size={18} className="mr-2" />
          {editIndex !== null ? "Edit" : "Add"} Specialization
        </button>
        <button
          className={`py-3 px-6 font-medium transition-all flex items-center ${
            activeTab === "get"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("get")}
        >
          <Search size={18} className="mr-2" />
          View Specializations
        </button>
      </div>

      {activeTab === "add" && (
        <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
          <Formik
            initialValues={
              editIndex !== null && specializations[editIndex]
                ? {
                    specialization: specializations[editIndex].specialization,
                    description: specializations[editIndex].description || "",
                  }
                : initialValues
            }
            validationSchema={SpecializationSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form className="space-y-5">
                <div>
                  <label className="block mb-2 font-medium text-gray-700">
                    Specialization Name <span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="text"
                    name="specialization"
                    className={`w-full p-3 border ${
                      errors.specialization && touched.specialization
                        ? "border-red-500 ring-1 ring-red-500"
                        : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Enter yoga specialization"
                    disabled={loading}
                  />
                  <ErrorMessage
                    name="specialization"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium text-gray-700">
                    Description
                  </label>
                  <Field
                    as="textarea"
                    name="description"
                    className={`w-full p-3 border ${
                      errors.description && touched.description
                        ? "border-red-500 ring-1 ring-red-500"
                        : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-24`}
                    placeholder="Enter a brief description about this specialization"
                    disabled={loading}
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition shadow-md flex items-center"
                    disabled={isSubmitting || loading}
                  >
                    {editIndex !== null ? "Update" : "Save"} Specialization
                    <Check size={18} className="ml-2" />
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}

      {activeTab === "get" && (
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="relative flex-grow">
              <Search
                size={18}
                className="absolute left-3 top-3 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search by specialization name..."
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
                <ChevronDown
                  size={16}
                  className={`transform transition-transform ${
                    sortOrder === "desc" ? "rotate-180" : ""
                  }`}
                />
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
                    <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">
                      S.No
                    </th>
                    <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase">
                      Specialization
                    </th>
                    <th className="p-4 text-center text-xs font-semibold text-gray-600 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSpecializations.map((spec, index) => (
                    <tr key={spec._id} className="hover:bg-gray-50 border-b">
                      <td className="p-4">{index + 1}</td>
                      <td className="p-4 font-medium">{spec.specialization}</td>
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
              <h3 className="text-xl font-medium text-gray-700">
                No specializations found
              </h3>
              <p className="text-gray-500 mt-2">
                {loading
                  ? "Loading specializations..."
                  : "Try adjusting your search or add a new specialization"}
              </p>
            </div>
          )}

          {/* Pagination display */}
          {totalPages > 1 && (
            <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
              <div>
                Page {currentPage} of {totalPages}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Main;
