import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./component/HomePage";
import Login from "./component/gate/Login";
import Register from "./component/gate/Register";
import ForgotPassword from "./component/gate/ForgetPassword";
import PrivateRoute from "./protection/PrivateRoute";
import AdminRoute from "./protection/AdminRoute";
import AdminDashboard from "./component/user/admin/AdminDashboard";
import AdminLayout from "./component/layout/AdminLayout";
import UserLayout from "./component/layout/UserLayout";
import Dashboard from "./component/user/general/Dashboard";
import NotFoundPage from "./component/404";
import CategoryForm from "./component/user/admin/CategoryForm";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected User Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <UserLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
        </Route>

        {/* Protected Admin Routes */}
        <Route
          path="/admin-dashboard"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route path="create-category" element={<CategoryForm/>} />
          <Route index element={<AdminDashboard />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
