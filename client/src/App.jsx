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
import CategoryManager from "./component/user/admin/CategoryManager";
import ProductManager from "./component/user/admin/ProductManager";
import Products from "./component/user/admin/Products";
import ViewProduct from "./component/user/admin/ViewProduct";
import PublicProductDetails from "./component/PublicProductDetails";
import CategoryProducts from "./component/pages/CategoryProducts";
import UserManager from "./component/user/admin/UserManager";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/product/:slug" element={<PublicProductDetails />} />
        <Route path="/category/:slug" element={<CategoryProducts />} />


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
          <Route path="create-category" element={<CategoryManager />} />
          <Route path="create-product" element={<ProductManager />} />
          <Route path="manage-users" element={<UserManager />} />

          <Route path="products" element={<Products />} />

          <Route path="product/:slug" element={<ViewProduct />} />
          <Route index element={<AdminDashboard />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
