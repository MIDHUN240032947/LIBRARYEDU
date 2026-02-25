import { useState } from "react";
import { mockResources } from "../data/mockResources";
import { 
  FileText, 
  Download, 
  Eye, 
  Star,
  Edit,
  Trash2,
  Share2,
  MoreVertical,
  Filter
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { toast } from "sonner";

export default function MyResources() {
  const [filter, setFilter] = useState<'all' | 'textbook' | 'research-paper' | 'study-guide'>('all');
  
  // Simulate user's uploaded resources (first 5 for demo)
  const myResources = mockResources.slice(0, 5);
  
  const filteredResources = filter === 'all' 
    ? myResources 
    : myResources.filter(r => r.category === filter);

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

  const handleEdit = (id: string) => {
    toast.info(`Edit resource: ${id}`);
  };

  const handleDelete = (id: string) => {
    toast.success(`Resource deleted: ${id}`);
  };

  const handleShare = (id: string) => {
    toast.success('Link copied to clipboard!');
  };

  const totalDownloads = myResources.reduce((sum, r) => sum + r.downloads, 0);
  const totalViews = myResources.reduce((sum, r) => sum + r.views, 0);
  const avgRating = (myResources.reduce((sum, r) => sum + r.rating, 0) / myResources.length).toFixed(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Resources</h1>
        <p className="text-gray-600">
          Manage and track your uploaded educational materials
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
          <p className="text-3xl font-bold mb-1">{myResources.length}</p>
          <p className="text-sm text-gray-600">Total Resources</p>
        </div>
        <div className="bg-white rounded-xl border p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <Download className="w-8 h-8 text-purple-600" />
          </div>
          <p className="text-3xl font-bold mb-1">{totalDownloads.toLocaleString()}</p>
          <p className="text-sm text-gray-600">Total Downloads</p>
        </div>
        <div className="bg-white rounded-xl border p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <Eye className="w-8 h-8 text-green-600" />
          </div>
          <p className="text-3xl font-bold mb-1">{totalViews.toLocaleString()}</p>
          <p className="text-sm text-gray-600">Total Views</p>
        </div>
        <div className="bg-white rounded-xl border p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <Star className="w-8 h-8 text-yellow-600" />
          </div>
          <p className="text-3xl font-bold mb-1">{avgRating}</p>
          <p className="text-sm text-gray-600">Average Rating</p>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-xl border p-4 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <span className="text-sm font-medium text-gray-700">Filter:</span>
          <div className="flex gap-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button
              variant={filter === 'textbook' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('textbook')}
            >
              Textbooks
            </Button>
            <Button
              variant={filter === 'research-paper' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('research-paper')}
            >
              Papers
            </Button>
            <Button
              variant={filter === 'study-guide' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('study-guide')}
            >
              Guides
            </Button>
          </div>
        </div>
        <p className="text-sm text-gray-600">
          {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Resources List */}
      <div className="space-y-4">
        {filteredResources.map((resource) => (
          <div key={resource.id} className="bg-white rounded-xl border p-6 hover:border-blue-300 hover:shadow-md transition-all">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{resource.title}</h3>
                      <Badge className={getCategoryColor(resource.category)}>
                        {getCategoryLabel(resource.category)}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Download className="w-4 h-4" />
                        {resource.downloads} downloads
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {resource.views} views
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        {resource.rating} ({resource.ratingCount} reviews)
                      </span>
                      <span className="text-gray-400">•</span>
                      <span>{resource.fileSize}</span>
                      <span className="text-gray-400">•</span>
                      <span>Uploaded {new Date(resource.uploadDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(resource.id)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Resource
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleShare(resource.id)}>
                        <Share2 className="w-4 h-4 mr-2" />
                        Share Link
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDelete(resource.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {resource.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
