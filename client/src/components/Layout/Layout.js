import React from "react";
import Footer from "./Footer.js";
import Header from "./Header.js";
const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main style={{ minHeight: "85vh" }}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
