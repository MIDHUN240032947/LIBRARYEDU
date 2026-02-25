import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { 
  BookOpen, 
  LayoutDashboard, 
  Library as LibraryIcon,
  Home,
  FileText,
  Users,
  Settings,
  BarChart3,
  Upload,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Bell,
  Search,
  LogOut
} from "lucide-react";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { toast } from "sonner";

export default function RootLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const userEmail = localStorage.getItem("userEmail") || "2400032947@kluniversity.in";
  const userName = userEmail === "2400032947@kluniversity.in" 
    ? "KUNAPARAJU S N MIDHUN VARMA" 
    : userEmail.split("@")[0] || "Admin User";
  const userRole = localStorage.getItem("userRole") || "student";

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const navigation = [
    { name: 'Home', path: '/', icon: Home, badge: null },
    { name: 'Library', path: '/library', icon: LibraryIcon, badge: null },
    { name: 'My Resources', path: '/my-resources', icon: FileText, badge: '5' },
    { name: 'Analytics', path: '/analytics', icon: BarChart3, badge: null },
    { name: 'Upload', path: '/upload', icon: Upload, badge: null },
    { name: 'Users', path: '/users', icon: Users, badge: null },
    { name: 'Admin', path: '/admin', icon: LayoutDashboard, badge: '3' },
    { name: 'Settings', path: '/settings', icon: Settings, badge: null },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col bg-white border-r transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b">
          {sidebarOpen ? (
            <>
              <Link to="/" className="flex items-center gap-2">
                <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-md">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-base font-bold text-gray-900">EduLibrary</h1>
                  <p className="text-xs text-gray-500">Resource Hub</p>
                </div>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(false)}
                className="w-8 h-8 p-0"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
            </>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(true)}
              className="w-8 h-8 p-0 mx-auto"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  active
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                } ${!sidebarOpen && 'justify-center'}`}
                title={!sidebarOpen ? item.name : undefined}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && (
                  <>
                    <span className="flex-1 font-medium text-sm">{item.name}</span>
                    {item.badge && (
                      <Badge className="bg-blue-100 text-blue-700 text-xs px-2">
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        {sidebarOpen && (
          <div className="p-4 border-t">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 mb-3">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {userName.substring(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{userName}</p>
                  <p className="text-xs text-gray-500 truncate">{userEmail}</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        )}
      </aside>

      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setMobileMenuOpen(false)}>
          <aside
            className="w-64 bg-white h-full flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-16 flex items-center justify-between px-4 border-b">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-base font-bold">EduLibrary</h1>
                  <p className="text-xs text-gray-500">Resource Hub</p>
                </div>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(false)}
                className="w-8 h-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              {navigation.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      active
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="flex-1 font-medium text-sm">{item.name}</span>
                    {item.badge && (
                      <Badge className="bg-blue-100 text-blue-700 text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t">
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-4 lg:px-6 sticky top-0 z-40">
          <div className="flex items-center gap-4 flex-1">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden w-9 h-9 p-0"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            
            <div className="hidden md:flex items-center flex-1 max-w-xl">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search resources, authors, subjects..."
                  className="pl-10 bg-gray-50 border-gray-200"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="relative w-9 h-9 p-0">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            
            <div className="hidden sm:flex items-center gap-2 ml-2">
              <div className="text-right">
                <p className="text-sm font-medium">{userName}</p>
                <p className="text-xs text-gray-500">{userRole === 'admin' ? 'Administrator' : 'Student'}</p>
              </div>
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {userName.substring(0, 2).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}