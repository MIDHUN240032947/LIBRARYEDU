import { mockResources } from "../data/mockResources";
import { 
  TrendingUp, 
  Download, 
  Eye, 
  Star,
  Users,
  FileText,
  ArrowUp,
  ArrowDown
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

export default function Analytics() {
  // Calculate statistics
  const totalResources = mockResources.length;
  const totalDownloads = mockResources.reduce((sum, r) => sum + r.downloads, 0);
  const totalViews = mockResources.reduce((sum, r) => sum + r.views, 0);
  const avgRating = (mockResources.reduce((sum, r) => sum + r.rating, 0) / mockResources.length).toFixed(2);

  // Category distribution
  const categoryData = [
    { name: 'Textbooks', value: mockResources.filter(r => r.category === 'textbook').length, color: '#3b82f6' },
    { name: 'Research Papers', value: mockResources.filter(r => r.category === 'research-paper').length, color: '#8b5cf6' },
    { name: 'Study Guides', value: mockResources.filter(r => r.category === 'study-guide').length, color: '#10b981' },
    { name: 'Lecture Notes', value: mockResources.filter(r => r.category === 'lecture-notes').length, color: '#f59e0b' },
    { name: 'Videos', value: mockResources.filter(r => r.category === 'video-tutorial').length, color: '#ef4444' },
  ];

  // Subject distribution
  const subjectCounts: Record<string, number> = {};
  mockResources.forEach(r => {
    subjectCounts[r.subject] = (subjectCounts[r.subject] || 0) + 1;
  });
  const subjectData = Object.entries(subjectCounts)
    .map(([subject, count]) => ({ subject, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  // Monthly uploads (simulated)
  const monthlyData = [
    { month: 'Sep', uploads: 12 },
    { month: 'Oct', uploads: 18 },
    { month: 'Nov', uploads: 15 },
    { month: 'Dec', uploads: 21 },
    { month: 'Jan', uploads: 24 },
    { month: 'Feb', uploads: 19 },
  ];

  // Top resources
  const topDownloaded = [...mockResources]
    .sort((a, b) => b.downloads - a.downloads)
    .slice(0, 5);

  const topRated = [...mockResources]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600">
          Comprehensive insights into platform performance and usage
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl border p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
              <ArrowUp className="w-4 h-4" />
              12%
            </div>
          </div>
          <p className="text-3xl font-bold mb-1">{totalResources}</p>
          <p className="text-sm text-gray-600">Total Resources</p>
        </div>

        <div className="bg-white rounded-xl border p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <Download className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
              <ArrowUp className="w-4 h-4" />
              18%
            </div>
          </div>
          <p className="text-3xl font-bold mb-1">{totalDownloads.toLocaleString()}</p>
          <p className="text-sm text-gray-600">Total Downloads</p>
        </div>

        <div className="bg-white rounded-xl border p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
              <ArrowUp className="w-4 h-4" />
              24%
            </div>
          </div>
          <p className="text-3xl font-bold mb-1">{totalViews.toLocaleString()}</p>
          <p className="text-sm text-gray-600">Total Views</p>
        </div>

        <div className="bg-white rounded-xl border p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
              <ArrowUp className="w-4 h-4" />
              5%
            </div>
          </div>
          <p className="text-3xl font-bold mb-1">{avgRating}</p>
          <p className="text-sm text-gray-600">Average Rating</p>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Monthly Uploads */}
        <div className="bg-white rounded-xl border p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Upload Trends
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              />
              <Line 
                type="monotone" 
                dataKey="uploads" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-xl border p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Category Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Subject Distribution */}
        <div className="bg-white rounded-xl border p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Resources by Subject</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={subjectData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="subject" stroke="#6b7280" angle={-45} textAnchor="end" height={100} />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              />
              <Bar dataKey="count" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Resources */}
        <div className="bg-white rounded-xl border p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Top Downloaded Resources</h3>
          <div className="space-y-3">
            {topDownloaded.map((resource, index) => (
              <div key={resource.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{resource.title}</p>
                  <p className="text-xs text-gray-500">{resource.author}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm">{resource.downloads}</p>
                  <p className="text-xs text-gray-500">downloads</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Rated Resources */}
      <div className="bg-white rounded-xl border p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Highest Rated Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {topRated.map((resource) => (
            <div key={resource.id} className="p-4 border rounded-lg hover:border-blue-300 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <span className="font-bold text-lg">{resource.rating}</span>
              </div>
              <p className="font-medium text-sm mb-1 line-clamp-2">{resource.title}</p>
              <p className="text-xs text-gray-500">{resource.ratingCount} reviews</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
