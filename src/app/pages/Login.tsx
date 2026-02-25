import { useState } from "react";
import { useNavigate } from "react-router";
import { BookOpen, Mail, Lock, Eye, EyeOff, Shield, User as UserIcon } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { toast } from "sonner";

// Admin Credentials
const ADMIN_EMAIL = "2400032947@kluniversity.in";
const ADMIN_PASSWORD = "klu@32947";

// Student Credentials
const STUDENT_CREDENTIALS = [
  { email: "2400033144@kluniversity.in", password: "klu@33144" },
  { email: "2400033149@kluniversity.in", password: "klu@33149" },
];

export default function Login() {
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState<'admin' | 'student'>('admin');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate loading
    setTimeout(() => {
      let isValid = false;
      let userRole = '';

      if (loginType === 'admin') {
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
          isValid = true;
          userRole = 'admin';
        }
      } else {
        // Check if credentials match any student
        const validStudent = STUDENT_CREDENTIALS.find(
          cred => cred.email === email && cred.password === password
        );
        if (validStudent) {
          isValid = true;
          userRole = 'student';
        }
      }

      if (isValid) {
        // Store authentication state and role
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userRole", userRole);
        toast.success(`Login successful! Welcome ${userRole === 'admin' ? 'Admin' : 'Student'}.`);
        navigate("/");
      } else {
        toast.error("Invalid email or password. Please try again.");
      }
      setIsLoading(false);
    }, 800);
  };

  const switchToAdmin = () => {
    setLoginType('admin');
    setEmail("");
    setPassword("");
  };

  const switchToStudent = () => {
    setLoginType('student');
    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-white rounded-2xl shadow-xl flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">EduLibrary</h1>
          <p className="text-blue-100">Educational Resources Platform - KL University</p>
        </div>

        {/* Login Type Selector */}
        <div className="flex gap-4 mb-6 max-w-md mx-auto">
          <button
            onClick={switchToAdmin}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
              loginType === 'admin'
                ? 'bg-white text-blue-700 shadow-lg'
                : 'bg-blue-600/30 text-white hover:bg-blue-600/50'
            }`}
          >
            <Shield className="w-5 h-5 inline-block mr-2" />
            Admin Login
          </button>
          <button
            onClick={switchToStudent}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
              loginType === 'student'
                ? 'bg-white text-blue-700 shadow-lg'
                : 'bg-blue-600/30 text-white hover:bg-blue-600/50'
            }`}
          >
            <UserIcon className="w-5 h-5 inline-block mr-2" />
            Student Login
          </button>
        </div>

        {/* Login Cards Container */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Admin Login Card */}
          <div className={`bg-white rounded-2xl shadow-2xl p-8 transition-all ${
            loginType === 'admin' ? 'ring-4 ring-white/50' : 'opacity-50'
          }`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Admin Access</h2>
                <p className="text-sm text-gray-600">Full system management</p>
              </div>
            </div>

            {loginType === 'admin' && (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email Field */}
                <div>
                  <Label htmlFor="admin-email" className="text-gray-700 mb-2 block">
                    Admin Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="admin-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter admin email"
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <Label htmlFor="admin-password" className="text-gray-700 mb-2 block">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="admin-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="pl-10 pr-10 h-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In as Admin"}
                </Button>
              </form>
            )}

            {/* Admin Features */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm font-semibold text-blue-900 mb-2">Admin Features:</p>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Full system access</li>
                <li>• User management</li>
                <li>• Upload & manage all resources</li>
                <li>• View analytics & reports</li>
                <li>• System settings control</li>
              </ul>
            </div>
          </div>

          {/* Student Login Card */}
          <div className={`bg-white rounded-2xl shadow-2xl p-8 transition-all ${
            loginType === 'student' ? 'ring-4 ring-white/50' : 'opacity-50'
          }`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center">
                <UserIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Student Access</h2>
                <p className="text-sm text-gray-600">Learn and contribute</p>
              </div>
            </div>

            {loginType === 'student' && (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email Field */}
                <div>
                  <Label htmlFor="student-email" className="text-gray-700 mb-2 block">
                    Student Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="student-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter student email"
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <Label htmlFor="student-password" className="text-gray-700 mb-2 block">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="student-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="pl-10 pr-10 h-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-12 text-base font-semibold bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In as Student"}
                </Button>
              </form>
            )}

            {/* Student Features */}
            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <p className="text-sm font-semibold text-green-900 mb-2">Student Features:</p>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• View admin resources</li>
                <li>• Read & download materials</li>
                <li>• Upload your resources</li>
                <li>• Manage your uploads</li>
                <li>• Rate & provide feedback</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-blue-100 text-sm mt-8">
          © 2026 EduLibrary - KL University | Developed by KUNAPARAJU S N MIDHUN VARMA
        </p>
      </div>
    </div>
  );
}
