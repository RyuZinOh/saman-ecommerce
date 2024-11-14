import React from "react";
import Footer from "./Footer.js";
import Header from "./Header.js";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";

const Layout = ({
  children,
  title,
  description,
  author,
  keywords,
  viewport,
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Helmet>
        <title>{title || "Default Title"}</title>
        <meta name="description" content={description || "Default description"} />
        <meta name="author" content={author || "Default Author"} />
        <meta name="keywords" content={keywords || "Default, Keywords"} />
        <meta name="viewport" content={viewport || "width=device-width, initial-scale=1.0"} />
      </Helmet>
      <Header />
      <main style={{ flex: 1 }}>
        <Toaster />
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
