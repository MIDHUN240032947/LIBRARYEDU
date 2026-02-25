import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { X } from "lucide-react";

export interface Filters {
  category: string;
  subject: string;
  sortBy: string;
}

interface FilterPanelProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  subjects: string[];
}

export function FilterPanel({ filters, onFilterChange, subjects }: FilterPanelProps) {
  const resetFilters = () => {
    onFilterChange({
      category: 'all',
      subject: 'all',
      sortBy: 'recent',
    });
  };

  const hasActiveFilters = filters.category !== 'all' || filters.subject !== 'all';

  return (
    <div className="bg-white rounded-xl border p-6 sticky top-20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-lg">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Clear
          </button>
        )}
      </div>

      <div className="space-y-5">
        {/* Category Filter */}
        <div>
          <Label className="mb-2 block">Category</Label>
          <Select
            value={filters.category}
            onValueChange={(value) => onFilterChange({ ...filters, category: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="textbook">Textbooks</SelectItem>
              <SelectItem value="research-paper">Research Papers</SelectItem>
              <SelectItem value="study-guide">Study Guides</SelectItem>
              <SelectItem value="lecture-notes">Lecture Notes</SelectItem>
              <SelectItem value="video-tutorial">Video Tutorials</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Subject Filter */}
        <div>
          <Label className="mb-2 block">Subject</Label>
          <Select
            value={filters.subject}
            onValueChange={(value) => onFilterChange({ ...filters, subject: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              {subjects.map((subject) => (
                <SelectItem key={subject} value={subject}>
                  {subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sort By */}
        <div>
          <Label className="mb-2 block">Sort By</Label>
          <Select
            value={filters.sortBy}
            onValueChange={(value) => onFilterChange({ ...filters, sortBy: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="title">Title (A-Z)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="pt-4 border-t">
            <Label className="mb-2 block text-xs">Active Filters</Label>
            <div className="flex flex-wrap gap-2">
              {filters.category !== 'all' && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {filters.category}
                  <button
                    onClick={() => onFilterChange({ ...filters, category: 'all' })}
                    className="ml-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {filters.subject !== 'all' && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {filters.subject}
                  <button
                    onClick={() => onFilterChange({ ...filters, subject: 'all' })}
                    className="ml-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}