import Layout from "../../layout/Layout";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <Layout
      title="User Dashboard | Saman by Safal Lama"
      description="Your personal dashboard at Saman by Safal Lama. View your orders, account details, and preferences."
      keywords="user account, order history, dashboard, Safal Lama account"
      canonicalUrl="/dashboard"
    >
      {/* Dashboard Content */}
      <div className="bg-white pt-12 md:pt-16 pl-4 sm:pl-6 lg:pl-8">
        <div className="text-left">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            User <span className="text-indigo-600">Dashboard</span>
          </h1>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
