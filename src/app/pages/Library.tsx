import { useState, useMemo } from "react";
import { mockResources } from "../data/mockResources";
import { ResourceCard } from "../components/ResourceCard";
import { Input } from "../components/ui/input";
import { BookOpen, FileText, Presentation, PlayCircle, FileSpreadsheet, Search, X } from "lucide-react";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../components/ui/select";

export default function Library() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedResourceType, setSelectedResourceType] = useState<"all" | "Computer Resources" | "Electronics Resources">("all");
  const [sortBy, setSortBy] = useState<"relevance" | "date" | "rating" | "downloads">("relevance");
  
  const userRole = localStorage.getItem("userRole") || "student";

  // Get unique categories and subjects
  const categories = ["all", ...Array.from(new Set(mockResources.map(r => r.category)))];
  const subjects = ["all", ...Array.from(new Set(mockResources.map(r => r.subject)))];
  const resourceTypes: Array<"all" | "Computer Resources" | "Electronics Resources"> = ["all", "Computer Resources", "Electronics Resources"];

  // Filter resources based on search, category, subject, resource type, and role
  let filteredResources = mockResources.filter(resource => {
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
    const matchesSubject = selectedSubject === "all" || resource.subject === selectedSubject;
    const matchesResourceType = selectedResourceType === "all" || resource.resourceType === selectedResourceType;
    
    // Students can only see admin-uploaded resources
    const matchesRole = userRole === "admin" || resource.author === "KUNAPARAJU S N MIDHUN VARMA";
    
    return matchesSearch && matchesCategory && matchesSubject && matchesResourceType && matchesRole;
  });

  // Sort resources
  switch (sortBy) {
    case 'date':
      filteredResources.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());
      break;
    case 'rating':
      filteredResources.sort((a, b) => b.rating - a.rating);
      break;
    case 'downloads':
      filteredResources.sort((a, b) => b.downloads - a.downloads);
      break;
    default:
      // Relevance - featured and recent
      filteredResources.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
      });
      break;
  }

  // Statistics
  const stats = useMemo(() => {
    return {
      total: mockResources.length,
      textbooks: mockResources.filter(r => r.category === 'textbook').length,
      papers: mockResources.filter(r => r.category === 'research-paper').length,
      guides: mockResources.filter(r => r.category === 'study-guide').length,
      lectures: mockResources.filter(r => r.category === 'lecture-notes').length,
      videos: mockResources.filter(r => r.category === 'video-tutorial').length,
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Resource Library</h1>
        <p className="text-gray-600">
          Browse and search through {mockResources.length} educational resources
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        <div className="bg-white rounded-xl border p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <BookOpen className="w-8 h-8 text-blue-600" />
          </div>
          <p className="text-2xl font-bold mb-1">{stats.textbooks}</p>
          <p className="text-sm text-gray-600">Textbooks</p>
        </div>
        <div className="bg-white rounded-xl border p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <FileText className="w-8 h-8 text-purple-600" />
          </div>
          <p className="text-2xl font-bold mb-1">{stats.papers}</p>
          <p className="text-sm text-gray-600">Papers</p>
        </div>
        <div className="bg-white rounded-xl border p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <FileSpreadsheet className="w-8 h-8 text-green-600" />
          </div>
          <p className="text-2xl font-bold mb-1">{stats.guides}</p>
          <p className="text-sm text-gray-600">Guides</p>
        </div>
        <div className="bg-white rounded-xl border p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <Presentation className="w-8 h-8 text-orange-600" />
          </div>
          <p className="text-2xl font-bold mb-1">{stats.lectures}</p>
          <p className="text-sm text-gray-600">Lectures</p>
        </div>
        <div className="bg-white rounded-xl border p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <PlayCircle className="w-8 h-8 text-red-600" />
          </div>
          <p className="text-2xl font-bold mb-1">{stats.videos}</p>
          <p className="text-sm text-gray-600">Videos</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search resources by title, author, subject, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 text-base"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Resource Type Filter */}
          <div>
            <Label className="text-sm font-medium mb-2 block">Resource Type</Label>
            <Select value={selectedResourceType} onValueChange={(value: any) => setSelectedResourceType(value)}>
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                {resourceTypes.map(type => (
                  <SelectItem key={type} value={type}>
                    {type === "all" ? "All Types" : type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Category Filter */}
          <div>
            <Label className="text-sm font-medium mb-2 block">Category</Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Subject Filter */}
          <div>
            <Label className="text-sm font-medium mb-2 block">Subject</Label>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger>
                <SelectValue placeholder="All Subjects" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map(sub => (
                  <SelectItem key={sub} value={sub}>
                    {sub === "all" ? "All Subjects" : sub}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sort By */}
          <div>
            <Label className="text-sm font-medium mb-2 block">Sort By</Label>
            <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="date">Upload Date</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="downloads">Downloads</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Clear Filters Button */}
        {(searchQuery || selectedCategory !== "all" || selectedSubject !== "all" || selectedResourceType !== "all") && (
          <div className="mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setSelectedSubject("all");
                setSelectedResourceType("all");
              }}
            >
              <X className="w-4 h-4 mr-2" />
              Clear All Filters
            </Button>
          </div>
        )}
      </div>

      {/* Results */}
      <div>
        {filteredResources.length > 0 ? (
          <>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing <span className="font-semibold">{filteredResources.length}</span> of <span className="font-semibold">{mockResources.length}</span> resources
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white rounded-xl border p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="font-semibold text-lg mb-2">No resources found</h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your search or filter criteria
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setSelectedSubject("all");
                setSelectedResourceType("all");
              }}
            >
              <X className="w-4 h-4 mr-2" />
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
