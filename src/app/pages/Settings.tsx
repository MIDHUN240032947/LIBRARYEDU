import { Settings as SettingsIcon, User, Bell, Shield, Database, Palette, Globe } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Separator } from "../components/ui/separator";
import { Badge } from "../components/ui/badge";
import { toast } from "sonner";

export default function Settings() {
  const handleSave = () => {
    toast.success('Settings saved successfully!');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center">
            <SettingsIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-gray-600">Manage your account and application preferences</p>
          </div>
        </div>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Preferences
          </TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile">
          <div className="bg-white rounded-xl border p-8 space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                    AD
                  </div>
                  <div>
                    <Button variant="outline" size="sm">Change Avatar</Button>
                    <p className="text-xs text-gray-500 mt-2">JPG, PNG or GIF. Max 2MB</p>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" defaultValue="Admin User" className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="admin@edulibrary.com" className="mt-2" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="role">Role</Label>
                    <Input id="role" defaultValue="Administrator" disabled className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="department">Department</Label>
                    <Input id="department" defaultValue="Computer Science" className="mt-2" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <textarea
                    id="bio"
                    className="w-full mt-2 px-3 py-2 border rounded-lg resize-none"
                    rows={4}
                    placeholder="Tell us about yourself..."
                    defaultValue="Platform administrator managing educational resources and user access."
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex justify-end gap-3">
              <Button variant="outline">Cancel</Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          </div>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <div className="bg-white rounded-xl border p-8 space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Email Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">New Resource Uploads</p>
                    <p className="text-sm text-gray-600">Get notified when new resources are added</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Resource Comments</p>
                    <p className="text-sm text-gray-600">Receive notifications for comments on your resources</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Weekly Digest</p>
                    <p className="text-sm text-gray-600">Get a weekly summary of platform activity</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">User Messages</p>
                    <p className="text-sm text-gray-600">Notifications when users send you messages</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-4">Push Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Desktop Notifications</p>
                    <p className="text-sm text-gray-600">Show desktop notifications for important updates</p>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Mobile Notifications</p>
                    <p className="text-sm text-gray-600">Receive push notifications on your mobile device</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex justify-end gap-3">
              <Button variant="outline">Cancel</Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          </div>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <div className="bg-white rounded-xl border p-8 space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Change Password</h3>
              <div className="space-y-4 max-w-md">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" className="mt-2" />
                </div>
                <Button>Update Password</Button>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-4">Two-Factor Authentication</h3>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Enable 2FA</p>
                  <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                </div>
                <Button variant="outline">Enable</Button>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-4">Active Sessions</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Windows • Chrome</p>
                    <p className="text-sm text-gray-600">Current session • Last active: Now</p>
                  </div>
                  <Badge className="bg-green-100 text-green-700">Active</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">iPhone • Safari</p>
                    <p className="text-sm text-gray-600">Last active: 2 hours ago</p>
                  </div>
                  <Button variant="outline" size="sm">Revoke</Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Preferences Settings */}
        <TabsContent value="preferences">
          <div className="bg-white rounded-xl border p-8 space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Display Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Dark Mode</p>
                    <p className="text-sm text-gray-600">Use dark theme across the application</p>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Compact View</p>
                    <p className="text-sm text-gray-600">Show more content with reduced spacing</p>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div>
                  <Label htmlFor="language">Language</Label>
                  <select id="language" className="mt-2 w-full px-3 py-2 border rounded-lg">
                    <option>English (US)</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-4">Content Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Auto-play Videos</p>
                    <p className="text-sm text-gray-600">Automatically play video tutorials</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Show Featured Content</p>
                    <p className="text-sm text-gray-600">Display featured resources on homepage</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div>
                  <Label htmlFor="resultsPerPage">Resources per Page</Label>
                  <select id="resultsPerPage" className="mt-2 w-full px-3 py-2 border rounded-lg">
                    <option>12</option>
                    <option>24</option>
                    <option>48</option>
                    <option>96</option>
                  </select>
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex justify-end gap-3">
              <Button variant="outline">Cancel</Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}