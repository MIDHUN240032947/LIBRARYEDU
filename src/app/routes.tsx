import { createBrowserRouter } from "react-router";
import RootLayout from "./layouts/RootLayout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Library from "./pages/Library";
import ResourceDetail from "./pages/ResourceDetail";
import AdminDashboard from "./pages/AdminDashboard";
import Analytics from "./pages/Analytics";
import MyResources from "./pages/MyResources";
import Upload from "./pages/Upload";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { RoleGuard } from "./components/RoleGuard";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <RootLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, Component: Home },
      { path: "library", Component: Library },
      { path: "resource/:id", Component: ResourceDetail },
      { path: "my-resources", Component: MyResources },
      { path: "upload", Component: Upload },
      { 
        path: "admin", 
        element: (
          <RoleGuard allowedRoles={['admin']}>
            <AdminDashboard />
          </RoleGuard>
        )
      },
      { 
        path: "analytics", 
        element: (
          <RoleGuard allowedRoles={['admin']}>
            <Analytics />
          </RoleGuard>
        )
      },
      { 
        path: "users", 
        element: (
          <RoleGuard allowedRoles={['admin']}>
            <Users />
          </RoleGuard>
        )
      },
      { 
        path: "settings", 
        element: (
          <RoleGuard allowedRoles={['admin']}>
            <Settings />
          </RoleGuard>
        )
      },
      { path: "*", Component: NotFound },
    ],
  },
]);