import { Link, useNavigate } from "react-router";
import { mockResources } from "../data/mockResources";
import { ResourceCard } from "../components/ResourceCard";
import { 
  BookOpen, 
  FileText, 
  Presentation, 
  TrendingUp,
  Download,
  Users,
  Star,
  ArrowRight,
  PlayCircle,
  Sparkles,
  Upload
} from "lucide-react";
import { Button } from "../components/ui/button";

export default function Home() {
  const navigate = useNavigate();
  
  const userRole = localStorage.getItem("userRole") || "student";
  const userName = localStorage.getItem("userEmail") === "2400032947@kluniversity.in" 
    ? "KUNAPARAJU S N MIDHUN VARMA" 
    : "Student User";

  // Filter featured resources based on role
  const featuredResources = mockResources
    .filter(r => {
      const isFeatured = r.featured;
      const matchesRole = userRole === "admin" || r.author === "KUNAPARAJU S N MIDHUN VARMA";
      return isFeatured && matchesRole;
    })
    .slice(0, 6);

  // Recent resources
  const recentResources = mockResources
    .filter(r => userRole === "admin" || r.author === "KUNAPARAJU S N MIDHUN VARMA")
    .sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())
    .slice(0, 4);

  const stats = {
    total: mockResources.length,
    textbooks: mockResources.filter(r => r.category === 'textbook').length,
    papers: mockResources.filter(r => r.category === 'research-paper').length,
    guides: mockResources.filter(r => r.category === 'study-guide').length,
    totalDownloads: mockResources.reduce((sum, r) => sum + r.downloads, 0),
    activeUsers: 2547,
    avgRating: (mockResources.reduce((sum, r) => sum + r.rating, 0) / mockResources.length).toFixed(1),
  };

  return (
    <div className="pb-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-yellow-300" />
                <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                  Welcome to EduLibrary
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
                Your Gateway to Educational Excellence
              </h1>
              <p className="text-lg text-blue-100 mb-8">
                Access thousands of high-quality educational resources including textbooks, 
                research papers, study guides, and video tutorials from leading educators worldwide.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/library">
                  <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Browse Library
                  </Button>
                </Link>
                <Link to="/upload">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    <Upload className="w-5 h-5 mr-2" />
                    Upload Resource
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <FileText className="w-10 h-10 text-blue-200 mb-3" />
                <p className="text-3xl font-bold mb-1">{stats.total}+</p>
                <p className="text-blue-100 text-sm">Resources Available</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <Download className="w-10 h-10 text-blue-200 mb-3" />
                <p className="text-3xl font-bold mb-1">{(stats.totalDownloads / 1000).toFixed(1)}K+</p>
                <p className="text-blue-100 text-sm">Total Downloads</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <Users className="w-10 h-10 text-blue-200 mb-3" />
                <p className="text-3xl font-bold mb-1">{stats.activeUsers}+</p>
                <p className="text-blue-100 text-sm">Active Users</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <Star className="w-10 h-10 text-blue-200 mb-3" />
                <p className="text-3xl font-bold mb-1">{stats.avgRating}/5.0</p>
                <p className="text-blue-100 text-sm">Average Rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500">
            <div className="flex items-center justify-between mb-2">
              <BookOpen className="w-8 h-8 text-blue-500" />
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-2xl font-bold mb-1">{stats.textbooks}</p>
            <p className="text-sm text-gray-600">Textbooks</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-purple-500">
            <div className="flex items-center justify-between mb-2">
              <FileText className="w-8 h-8 text-purple-500" />
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-2xl font-bold mb-1">{stats.papers}</p>
            <p className="text-sm text-gray-600">Research Papers</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-green-500">
            <div className="flex items-center justify-between mb-2">
              <Presentation className="w-8 h-8 text-green-500" />
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-2xl font-bold mb-1">{stats.guides}</p>
            <p className="text-sm text-gray-600">Study Guides</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-orange-500">
            <div className="flex items-center justify-between mb-2">
              <PlayCircle className="w-8 h-8 text-orange-500" />
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-2xl font-bold mb-1">
              {mockResources.filter(r => r.category === 'video-tutorial').length}
            </p>
            <p className="text-sm text-gray-600">Video Tutorials</p>
          </div>
        </div>
      </div>

      {/* Featured Resources */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-1">Featured Resources</h2>
            <p className="text-gray-600">Top-rated materials selected by our community</p>
          </div>
          <Link to="/library">
            <Button variant="outline">
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </div>

      {/* Recent Uploads */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-1">Recently Added</h2>
            <p className="text-gray-600">Fresh content from our educators</p>
          </div>
          <Link to="/library">
            <Button variant="outline">
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} compact />
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 lg:p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Share Your Knowledge</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of educators and students contributing to our growing library of educational resources.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/upload">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
                <Upload className="w-5 h-5 mr-2" />
                Upload Your First Resource
              </Button>
            </Link>
            <Link to="/library">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Explore Library
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}