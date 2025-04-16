import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./component/HomePage";
import Login from "./component/gate/Login";
import Register from "./component/gate/Register";
import ForgotPassword from "./component/gate/ForgetPassword";
import Dashboard from "./component/user/general/Dashboard";
import PrivateRoute from "./protection/PrivateRoute";
import AdminRoute from "./protection/Adminroute";
import AdminDashboard from "./component/user/admin/AdminDashboard";
import AdminLayout from "./component/layout/AdminLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Route user */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        {/* Protected Route admin */}
        <Route path="/admin-dashboard" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
