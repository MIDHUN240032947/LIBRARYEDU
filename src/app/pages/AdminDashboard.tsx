import { useState } from "react";
import { mockResources } from "../data/mockResources";
import { 
  Upload, 
  Trash2, 
  Edit, 
  TrendingUp, 
  Users, 
  FileText,
  Download,
  Eye 
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { UploadResourceForm } from "../components/UploadResourceForm";
import { Badge } from "../components/ui/badge";
import { toast } from "sonner";

export default function AdminDashboard() {
  const [resources] = useState(mockResources);

  const handleDelete = (id: string) => {
    toast.success("Resource deleted successfully");
  };

  const handleEdit = (id: string) => {
    toast.info("Edit functionality would open here");
  };

  // Calculate statistics
  const totalDownloads = resources.reduce((sum, r) => sum + r.downloads, 0);
  const avgRating = (resources.reduce((sum, r) => sum + r.rating, 0) / resources.length).toFixed(1);
  const recentUploads = resources.filter(r => {
    const uploadDate = new Date(r.uploadDate);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return uploadDate > weekAgo;
  }).length;

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">
          Manage educational resources and monitor platform activity
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Resources</p>
              <p className="text-3xl font-bold mt-1">{resources.length}</p>
              <p className="text-xs text-green-600 mt-1">+{recentUploads} this week</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Downloads</p>
              <p className="text-3xl font-bold mt-1">{totalDownloads.toLocaleString()}</p>
              <p className="text-xs text-green-600 mt-1">
                <TrendingUp className="w-3 h-3 inline mr-1" />
                12% increase
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <Download className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Average Rating</p>
              <p className="text-3xl font-bold mt-1">{avgRating}</p>
              <p className="text-xs text-gray-500 mt-1">out of 5.0</p>
            </div>
            <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Users</p>
              <p className="text-3xl font-bold mt-1">2,547</p>
              <p className="text-xs text-green-600 mt-1">+8% this month</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="manage" className="space-y-6">
        <TabsList>
          <TabsTrigger value="manage">Manage Resources</TabsTrigger>
          <TabsTrigger value="upload">Upload New Resource</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
        </TabsList>

        {/* Manage Resources Tab */}
        <TabsContent value="manage" className="space-y-4">
          <div className="bg-white rounded-xl border">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">All Resources</h2>
            </div>
            <div className="divide-y">
              {resources.map((resource) => (
                <div key={resource.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <h3 className="font-semibold text-lg mb-1">{resource.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{resource.author}</p>
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge className={getCategoryColor(resource.category)}>
                              {getCategoryLabel(resource.category)}
                            </Badge>
                            <span className="text-sm text-gray-500">{resource.subject}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(resource.id)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(resource.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mt-3">
                        <span className="flex items-center gap-1">
                          <Download className="w-4 h-4" />
                          {resource.downloads} downloads
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {Math.floor(resource.downloads * 2.5)} views
                        </span>
                        <span>⭐ {resource.rating}</span>
                        <span>{resource.fileSize}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Upload Resource Tab */}
        <TabsContent value="upload">
          <div className="bg-white rounded-xl border p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Upload New Resource</h2>
              <p className="text-gray-600">
                Add a new educational resource to the library
              </p>
            </div>
            <UploadResourceForm />
          </div>
        </TabsContent>

        {/* User Management Tab */}
        <TabsContent value="users">
          <div className="bg-white rounded-xl border p-6">
            <h2 className="text-xl font-semibold mb-4">User Management</h2>
            <p className="text-gray-600 mb-6">
              Manage user access and permissions for the educational resource library.
            </p>
            
            <div className="space-y-4">
              {/* Sample user list */}
              {[
                { name: "John Smith", email: "john.smith@example.com", role: "Student", status: "Active" },
                { name: "Emma Davis", email: "emma.davis@example.com", role: "Educator", status: "Active" },
                { name: "Michael Wilson", email: "michael.w@example.com", role: "Student", status: "Active" },
                { name: "Sarah Johnson", email: "sarah.j@example.com", role: "Educator", status: "Active" },
              ].map((user, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary">{user.role}</Badge>
                    <Badge className="bg-green-100 text-green-700">{user.status}</Badge>
                    <Button size="sm" variant="outline">
                      Manage Access
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
