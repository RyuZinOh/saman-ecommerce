import Layout from "./layout/Layout";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <Layout
      title="Page Not Found - Saman by Safal Lama"
      description="The page you're looking for doesn't exist. Discover Nepal's finest handmade products at Saman by Safal Lama."
      keywords="404, page not found, Nepali handicrafts, handmade gifts"
      canonicalUrl="/404"
      noIndex={true}
    >
      <div className="bg-white min-h-screen pt-12 md:pt-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <div className="text-center max-w-2xl">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            404
          </h1>
          <h2 className="mt-4 text-2xl font-semibold text-indigo-600">
            Page Not Found
          </h2>
          <p className="mt-4 text-base text-gray-500">
            We couldn't find the page you're looking for. It might have been
            moved or doesn't exist anymore.
          </p>
          <div className="mt-8">
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
