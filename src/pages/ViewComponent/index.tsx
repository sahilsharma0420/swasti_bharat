import React, { useState, useCallback } from "react";
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { Edit, Trash2, Eye, X, ChevronLeft, ChevronRight } from "lucide-react";
import Table from "@/components/Base/Table";
import { Menu } from "@/components/Base/Headless";
import Lucide from "@/components/Base/Lucide";

import { pdfjs } from 'react-pdf';

// Explicitly import the worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
// Set the worker source
// Types
interface Resource {
  id: number;
  name: string;
  description: string;
  pdfFile?: File | null;
  pdfUrl?: string | null;
}

interface ViewPdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  resource: Resource;
}

interface EditResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  resource: Resource;
  onSave: (updatedResource: Resource) => void;
}

const ViewPdfModal: React.FC<ViewPdfModalProps> = ({ isOpen, onClose, resource }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pdfLoadError, setPdfLoadError] = useState<boolean>(false);

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
  }, []);

  const changePage = useCallback((offset: number) => {
    setPageNumber(prevPageNumber => 
      Math.max(1, Math.min(prevPageNumber + offset, numPages))
    );
  }, [numPages]);

  if (!isOpen) return null;

  // Determine PDF source
  const pdfSource = resource.pdfFile 
    ? URL.createObjectURL(resource.pdfFile) 
    : resource.pdfUrl;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg p-6 w-3/4 h-3/4 relative flex flex-col">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 z-10"
      >
        <X size={24} />
      </button>
      <h2 className="text-2xl font-bold mb-4">{resource.name}</h2>
      <p className="mb-4">{resource.description}</p>
      
      {pdfSource ? (
        <div className="flex-grow overflow-auto relative">
          <Document
            file={pdfSource}
            onLoadSuccess={onDocumentLoadSuccess}
            className="w-full h-full"
            loading={
              <div className="flex justify-center items-center h-full">
                <p>Loading PDF...</p>
              </div>
            }
            error={
              <div className="flex justify-center items-center h-full text-red-500">
                <p>Error loading PDF</p>
              </div>
            }
          >
            <Page 
              pageNumber={pageNumber} 
              renderTextLayer={true}
              renderAnnotationLayer={true}
              width={800}
              className="shadow-lg mx-auto"
            />
          </Document>
          
          {numPages > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 bg-white p-2 rounded-full shadow-md">
              <button 
                onClick={() => changePage(-1)} 
                disabled={pageNumber <= 1}
                className="disabled:opacity-50"
              >
                <ChevronLeft />
              </button>
              <span>Page {pageNumber} of {numPages}</span>
              <button 
                onClick={() => changePage(1)} 
                disabled={pageNumber >= numPages}
                className="disabled:opacity-50"
              >
                <ChevronRight />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="w-full h-96 border rounded-lg flex justify-center items-center">
          <p className="text-gray-500">No PDF available</p>
        </div>
      )}
    </div>
  </div>
  );
};

const EditResourceModal: React.FC<EditResourceModalProps> = ({ 
  isOpen, 
  onClose, 
  resource, 
  onSave 
}) => {
  const [name, setName] = useState(resource.name);
  const [description, setDescription] = useState(resource.description);
  const [pdfFile, setPdfFile] = useState<File | null>(resource.pdfFile || null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...resource,
      name,
      description,
      pdfFile,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-1/2">
        <h2 className="text-2xl font-bold mb-4">Edit Resource</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              rows={4}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Update PDF
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Main: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([
    {
      id: 1,
      name: "Sample Resource 1",
      description: "This is a detailed description of the first resource.",
      pdfUrl: "public/pdfs/table.pdf", // Replace with actual PDF path
    },
    {
      id: 2,
      name: "Another Resource",
      description: "Description of the second resource goes here.",
      pdfUrl: "public/pdfs/table.pdf", // Replace with actual PDF path
    },
  ]);

  const [viewingResource, setViewingResource] = useState<Resource | null>(null);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);

  const handleView = (resource: Resource) => {
    setViewingResource(resource);
  };

  const handleEdit = (resource: Resource) => {
    setEditingResource(resource);
  };

  const handleDelete = (id: number) => {
    setResources(resources.filter((resource) => resource.id !== id));
  };

  const handleSaveEdit = (updatedResource: Resource) => {
    setResources(
      resources.map((resource) =>
        resource.id === updatedResource.id ? updatedResource : resource
      )
    );
  };

  return (
    <div className="p-6 box box--stacked rounded-lg shadow-md relative">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        View Free Resources
      </h2>
      <div className="overflow-x-auto">
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Td className="font-medium bg-slate-50 dark:bg-darkmode-500 first:rounded-tl-[0.6rem] last:rounded-tr-[0.6rem] py-5 border-slate-200/80 text-slate-500">
                S.No
              </Table.Td>
              <Table.Td className="w-56 font-medium bg-slate-50 dark:bg-darkmode-500 first:rounded-tl-[0.6rem] last:rounded-tr-[0.6rem] py-5 border-slate-200/80 text-slate-500">
                Name
              </Table.Td>
              <Table.Td className="truncate font-medium bg-slate-50 dark:bg-darkmode-500 first:rounded-tl-[0.6rem] last:rounded-tr-[0.6rem] py-5 border-slate-200/80 text-slate-500">
                Description
              </Table.Td>
              <Table.Td className="w-32 truncate text-left font-medium bg-slate-50 dark:bg-darkmode-500 first:rounded-tl-[0.6rem] last:rounded-tr-[0.6rem] py-5 border-slate-200/80 text-slate-500">
                Actions
              </Table.Td>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {resources.map((resource, index) => (
              <Table.Tr key={resource.id} className="[&_td]:last:border-b-0">
                <Table.Td className="py-5 first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] rounded-l-none rounded-r-none border-x-0 border-t-0 border-dashed dark:bg-darkmode-600">
                  <div className="flex items-center text-primary">
                    <div className="ml-1.5 whitespace-nowrap">{index + 1}</div>
                  </div>
                </Table.Td>
                <Table.Td className="py-5 first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] rounded-l-none rounded-r-none border-x-0 border-t-0 border-dashed dark:bg-darkmode-600">
                  <div className="flex items-center">
                    <div className="ml-1 text-xs text-slate-500">
                      ({resource.name})
                    </div>
                  </div>
                </Table.Td>
                <Table.Td className="text-left py-5 first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] rounded-l-none rounded-r-none border-x-0 border-t-0 border-dashed dark:bg-darkmode-600">
                  <div className="font-medium whitespace-nowrap">
                    {resource.description}
                  </div>
                </Table.Td>
                <Table.Td className="py-5 relative first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] rounded-l-none rounded-r-none border-x-0 border-t-0 border-dashed dark:bg-darkmode-600">
                  <div className="flex items-center justify-center">
                    <Menu className="h-5">
                      <Menu.Button className="w-5 h-5 text-slate-500">
                        <Lucide
                          icon="MoreVertical"
                          className="w-5 h-5 stroke-slate-400/70 fill-slate-400/70"
                        />
                      </Menu.Button>
                      <Menu.Items className="w-40">
                        <Menu.Item onClick={() => handleView(resource)}>
                          <Eye size={20} />
                          View
                        </Menu.Item>
                        <Menu.Item onClick={() => handleEdit(resource)}>
                          <Edit size={20} />
                          Edit
                        </Menu.Item>
                        <Menu.Item onClick={() => handleDelete(resource.id)}>
                          <Trash2 size={20} />
                          Delete
                        </Menu.Item>
                      </Menu.Items>
                    </Menu>
                  </div>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </div>

      {/* View PDF Modal */}
      {viewingResource && (
        <ViewPdfModal
          isOpen={!!viewingResource}
          onClose={() => setViewingResource(null)}
          resource={viewingResource}
        />
      )}

      {/* Edit Resource Modal */}
      {editingResource && (
        <EditResourceModal
          isOpen={!!editingResource}
          onClose={() => setEditingResource(null)}
          resource={editingResource}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
};

export default Main;