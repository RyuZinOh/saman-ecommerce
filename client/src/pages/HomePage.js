import React from "react";
import Layout from "../components/Layout/Layout";
import { Helmet } from "react-helmet";

const HomePage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Home - My Website</title>
        <meta
          name="description"
          content="Welcome to My Website. Explore our services, read our latest blog posts, and get in touch with us today."
        />
        <meta name="author" content="My Website Team" />
        <meta
          name="keywords"
          content="homepage, services, blog, about us, contact, website"
        />
        <meta name="robots" content="index, follow" />{" "}
        {/* Allow indexing of this page */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>

      <div className="container my-5">
        <h1 className="text-center mb-4">Welcome to My Website</h1>
        <p className="text-center">
          Explore our range of services, learn more about what we do, and
          connect with us.
        </p>
        {/* You can add more content like service links, blog highlights, etc. */}
      </div>
    </Layout>
  );
};

export default HomePage;
