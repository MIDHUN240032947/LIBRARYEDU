import { Link } from "react-router";
import { FileText, Download, Star, Calendar, Eye, PlayCircle, BookOpen, FileSpreadsheet } from "lucide-react";
import { Resource } from "../data/mockResources";
import { Badge } from "./ui/badge";

interface ResourceCardProps {
  resource: Resource;
  compact?: boolean;
}

export function ResourceCard({ resource, compact = false }: ResourceCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'textbook':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'research-paper':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'study-guide':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'lecture-notes':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'video-tutorial':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'textbook':
        return BookOpen;
      case 'research-paper':
        return FileText;
      case 'study-guide':
        return FileSpreadsheet;
      case 'lecture-notes':
        return FileText;
      case 'video-tutorial':
        return PlayCircle;
      default:
        return FileText;
    }
  };

  const getCategoryLabel = (category: string) => {
    return category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const CategoryIcon = getCategoryIcon(resource.category);

  return (
    <Link to={`/resource/${resource.id}`} className="group">
      <div className="bg-white rounded-xl border hover:border-blue-300 hover:shadow-xl transition-all duration-200 p-5 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <Badge className={`${getCategoryColor(resource.category)} border font-medium`}>
            {getCategoryLabel(resource.category)}
          </Badge>
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-semibold text-gray-700">{resource.rating}</span>
            <span className="text-xs text-gray-400">({resource.ratingCount})</span>
          </div>
        </div>

        {/* Icon */}
        <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <CategoryIcon className="w-7 h-7 text-blue-600" />
        </div>

        {/* Title */}
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 flex-grow group-hover:text-blue-600 transition-colors">
          {resource.title}
        </h3>

        {/* Author */}
        <p className="text-sm text-gray-600 mb-3 flex items-center gap-1">
          <span className="font-medium">by</span> {resource.author}
        </p>

        {/* Subject */}
        <div className="inline-block bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full mb-3 w-fit">
          {resource.subject}
        </div>

        {/* Description */}
        {!compact && (
          <p className="text-sm text-gray-500 mb-4 line-clamp-2">
            {resource.description}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t mt-auto">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1" title="Downloads">
              <Download className="w-3.5 h-3.5" />
              <span className="font-medium">{resource.downloads}</span>
            </div>
            <div className="flex items-center gap-1" title="Views">
              <Eye className="w-3.5 h-3.5" />
              <span className="font-medium">{resource.views}</span>
            </div>
          </div>
          <div className="flex items-center gap-1" title="Upload Date">
            <Calendar className="w-3.5 h-3.5" />
            <span>{new Date(resource.uploadDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
          </div>
        </div>

        {/* Tags */}
        {!compact && resource.tags && resource.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3 pt-3 border-t">
            {resource.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
