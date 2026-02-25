import { useParams, Link, useNavigate } from "react-router";
import { mockResources, mockFeedback } from "../data/mockResources";
import { 
  ArrowLeft, 
  Download, 
  Star, 
  Calendar, 
  FileText, 
  User,
  Tag 
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { FeedbackForm } from "../components/FeedbackForm";
import { toast } from "sonner";
import { useState } from "react";

export default function ResourceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const userRole = localStorage.getItem("userRole") || "student";
  const resource = mockResources.find(r => r.id === id);
  const feedback = mockFeedback.filter(f => f.resourceId === id);

  if (!resource) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Resource not found</h2>
          <Button onClick={() => navigate('/library')}>Back to Library</Button>
        </div>
      </div>
    );
  }

  // Check if student has access to this resource
  if (userRole === 'student' && resource.author !== 'KUNAPARAJU S N MIDHUN VARMA') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-4">You don't have permission to view this resource.</p>
          <Button onClick={() => navigate('/library')}>Back to Library</Button>
        </div>
      </div>
    );
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'textbook':
        return 'bg-blue-100 text-blue-700';
      case 'research-paper':
        return 'bg-purple-100 text-purple-700';
      case 'study-guide':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryLabel = (category: string) => {
    return category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const handleDownload = () => {
    toast.success(`Downloading: ${resource.title}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Link to="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6">
        <ArrowLeft className="w-4 h-4" />
        Back to Library
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Resource Header */}
          <div className="bg-white rounded-xl border p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h1 className="text-2xl font-bold">{resource.title}</h1>
                  <Badge className={getCategoryColor(resource.category)}>
                    {getCategoryLabel(resource.category)}
                  </Badge>
                </div>
                <p className="text-gray-600 flex items-center gap-2 mb-2">
                  <User className="w-4 h-4" />
                  {resource.author}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(resource.uploadDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Download className="w-4 h-4" />
                    {resource.downloads} downloads
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    {resource.rating} rating
                  </span>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Tag className="w-4 h-4 text-gray-400" />
              {resource.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Description */}
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">{resource.description}</p>
            </div>
          </div>

          {/* Feedback Section */}
          <div className="bg-white rounded-xl border p-6">
            <h2 className="text-xl font-semibold mb-4">User Feedback</h2>
            {feedback.length > 0 ? (
              <div className="space-y-4 mb-6">
                {feedback.map((feedback) => (
                  <div key={feedback.id} className="border-b pb-4 last:border-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{feedback.userName}</span>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < feedback.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-1">{feedback.comment}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(feedback.date).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 mb-6">No feedback yet. Be the first to share your thoughts!</p>
            )}
            
            <FeedbackForm resourceId={resource.id} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border p-6 sticky top-24">
            <h3 className="font-semibold text-lg mb-4">Resource Details</h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Subject</p>
                <p className="font-medium">{resource.subject}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">File Type</p>
                <p className="font-medium">{resource.fileType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">File Size</p>
                <p className="font-medium">{resource.fileSize}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Category</p>
                <p className="font-medium">{getCategoryLabel(resource.category)}</p>
              </div>
            </div>

            <Button onClick={handleDownload} className="w-full" size="lg">
              <Download className="w-5 h-5 mr-2" />
              Download Resource
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}