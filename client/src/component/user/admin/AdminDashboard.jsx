import Layout from "../../layout/Layout";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <Layout
      title="Admin Dashboard | Saman by Safal Lama"
      description="Your administrative dashboard at Saman by Safal Lama. Manage users, products, and orders."
      keywords="admin account, management, dashboard, Safal Lama admin"
      canonicalUrl="/admin-dashboard"
    >
      {/* Admin Dashboard Content */}
      <div className="bg-white pt-12 md:pt-16 pl-4 sm:pl-6 lg:pl-8">
        <div className="text-left">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Admin <span className="text-indigo-600">Dashboard</span>
          </h1>
          <p className="mt-3 text-gray-500 sm:mt-4 sm:text-lg md:text-xl">
            Manage users, view analytics, and oversee orders.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
