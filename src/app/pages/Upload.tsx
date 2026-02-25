import { UploadResourceForm } from "../components/UploadResourceForm";
import { Upload as UploadIcon, BookOpen, FileText, Info } from "lucide-react";

export default function Upload() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
            <UploadIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Upload Resource</h1>
            <p className="text-gray-600">Share your educational materials with the community</p>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
        <div className="flex gap-4">
          <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Upload Guidelines</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Ensure your content is original or you have permission to share it</li>
              <li>• Files should be in PDF, DOC, DOCX format (max 50MB)</li>
              <li>• Provide accurate metadata including title, author, and description</li>
              <li>• Add relevant tags to help others discover your resource</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Upload Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border p-6">
          <BookOpen className="w-8 h-8 text-blue-600 mb-3" />
          <p className="text-2xl font-bold mb-1">24</p>
          <p className="text-sm text-gray-600">Resources in Library</p>
        </div>
        <div className="bg-white rounded-xl border p-6">
          <FileText className="w-8 h-8 text-green-600 mb-3" />
          <p className="text-2xl font-bold mb-1">5</p>
          <p className="text-sm text-gray-600">Your Contributions</p>
        </div>
        <div className="bg-white rounded-xl border p-6">
          <UploadIcon className="w-8 h-8 text-purple-600 mb-3" />
          <p className="text-2xl font-bold mb-1">3</p>
          <p className="text-sm text-gray-600">Pending Review</p>
        </div>
      </div>

      {/* Upload Form */}
      <div className="bg-white rounded-xl border p-8 shadow-sm">
        <h2 className="text-xl font-semibold mb-6">Resource Details</h2>
        <UploadResourceForm />
      </div>
    </div>
  );
}
