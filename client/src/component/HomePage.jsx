import { useAuth } from "../manager/contexts/auth/useAuth";
import Layout from "./layout/Layout";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { user, token } = useAuth();

  return (
    <Layout
      title="Saman by Safal Lama - Authentic Handmade Crafts & Gifts"
      description="Discover Nepal's finest handmade products at Saman by Safal Lama. Ethically crafted home decor, fashion accessories, and unique gifts supporting local artisans."
      keywords="Nepali handicrafts, handmade gifts, ethical shopping, Safal Lama products, traditional Nepali crafts, fair trade Nepal"
      canonicalUrl="/"
    >
      <div className="bg-white pt-12 md:pt-16 pl-4 sm:pl-6 lg:pl-8">
        <div className="text-left">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Welcome to <span className="text-indigo-600">Saman</span>
          </h1>
          <p className="mt-3 text-base text-gray-500 sm:text-lg md:mt-4 md:text-xl max-w-2xl">
            Authentic handcrafted treasures from Nepal, ethically made with care
            and tradition.
          </p>

          {/* Show user info if logged in */}
          {user && (
            <div className="mt-6 bg-gray-50 p-4 rounded shadow-md max-w-md">
              <h2 className="text-xl font-semibold mb-2">Your Info:</h2>
              <p>
                <strong>ID:</strong> {user._id}
              </p>
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Address:</strong> {user.address}
              </p>
              <p>
                <strong>Phone:</strong> {user.phone}
              </p>
              <p>
                <strong>Role:</strong> {user.role}
              </p>
              <p>
                <strong>Token:</strong> {token}
              </p>
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              to="/shop"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              Start Shopping
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
