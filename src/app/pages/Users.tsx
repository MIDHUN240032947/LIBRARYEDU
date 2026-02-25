import { useState } from "react";
import { mockUsers } from "../data/mockResources";
import { 
  Users as UsersIcon, 
  Search, 
  Filter,
  MoreVertical,
  Mail,
  Shield,
  Ban,
  CheckCircle,
  TrendingUp,
  Download
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { toast } from "sonner";

export default function Users() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<'all' | 'student' | 'educator' | 'admin'>('all');

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-700';
      case 'educator':
        return 'bg-blue-100 text-blue-700';
      case 'student':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleSendMessage = (userId: string) => {
    toast.success('Message sent successfully');
  };

  const handleChangeRole = (userId: string) => {
    toast.info('Role change dialog would open here');
  };

  const handleToggleStatus = (userId: string) => {
    toast.success('User status updated');
  };

  const stats = {
    total: mockUsers.length,
    students: mockUsers.filter(u => u.role === 'student').length,
    educators: mockUsers.filter(u => u.role === 'educator').length,
    admins: mockUsers.filter(u => u.role === 'admin').length,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">User Management</h1>
        <p className="text-gray-600">
          Manage user accounts, roles, and permissions
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <UsersIcon className="w-8 h-8 text-blue-600" />
          </div>
          <p className="text-3xl font-bold mb-1">{stats.total}</p>
          <p className="text-sm text-gray-600">Total Users</p>
        </div>
        <div className="bg-white rounded-xl border p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <UsersIcon className="w-8 h-8 text-green-600" />
          </div>
          <p className="text-3xl font-bold mb-1">{stats.students}</p>
          <p className="text-sm text-gray-600">Students</p>
        </div>
        <div className="bg-white rounded-xl border p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <UsersIcon className="w-8 h-8 text-blue-600" />
          </div>
          <p className="text-3xl font-bold mb-1">{stats.educators}</p>
          <p className="text-sm text-gray-600">Educators</p>
        </div>
        <div className="bg-white rounded-xl border p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <Shield className="w-8 h-8 text-red-600" />
          </div>
          <p className="text-3xl font-bold mb-1">{stats.admins}</p>
          <p className="text-sm text-gray-600">Administrators</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl border p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search users by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <div className="flex gap-2">
              <Button
                variant={roleFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setRoleFilter('all')}
              >
                All
              </Button>
              <Button
                variant={roleFilter === 'student' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setRoleFilter('student')}
              >
                Students
              </Button>
              <Button
                variant={roleFilter === 'educator' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setRoleFilter('educator')}
              >
                Educators
              </Button>
              <Button
                variant={roleFilter === 'admin' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setRoleFilter('admin')}
              >
                Admins
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">User</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Role</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Activity</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Contributions</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-semibold">
                        {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge className={getRoleBadgeColor(user.role)}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Badge className={user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                      {user.status === 'active' ? (
                        <>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Active
                        </>
                      ) : (
                        'Inactive'
                      )}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600">
                      {new Date(user.lastActive).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-400">Last active</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        <span>{user.resourcesUploaded}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="w-4 h-4" />
                        <span>{user.totalDownloads}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleSendMessage(user.id)}>
                          <Mail className="w-4 h-4 mr-2" />
                          Send Message
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleChangeRole(user.id)}>
                          <Shield className="w-4 h-4 mr-2" />
                          Change Role
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleToggleStatus(user.id)}>
                          {user.status === 'active' ? (
                            <>
                              <Ban className="w-4 h-4 mr-2" />
                              Deactivate
                            </>
                          ) : (
                            <>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Activate
                            </>
                          )}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border mt-6">
          <UsersIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No users found matching your criteria</p>
        </div>
      )}
    </div>
  );
}
