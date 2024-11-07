import React from "react";
import Layout from "../components/Layout/Layout";
import { Helmet } from "react-helmet";

const Pagenotfound = () => {
  return (
    <Layout>
      <Helmet>
        <title>404 - Page Not Found</title>
        <meta
          name="description"
          content="Oops! The page you are looking for doesn't exist or has been moved. Please check the URL or return to the homepage."
        />
        <meta name="author" content="My Website Team" />
        <meta name="keywords" content="404, page not found, error page, website error, missing page" />
        <meta name="robots" content="noindex, nofollow" /> {/* To prevent this page from being indexed */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>

      <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-white">
        <h1 className="display-1 text-dark mb-3">404</h1>
        <h2 className="text-dark mb-4">Page Not Found</h2>
        <p className="text-secondary text-center">
          The page you are looking for doesn’t exist or has been moved.
        </p>
        <a href="/" className="btn btn-outline-dark mt-4">
          Go Back Home
        </a>
      </div>
    </Layout>
  );
};

export default Pagenotfound;
