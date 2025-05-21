import { Helmet } from "react-helmet";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({
  children,
  title = "Saman by Safal Lama - Premium Handmade Products",
  description = "Discover exquisite handmade products crafted with love by Safal Lama. Shop unique, authentic items for your home and lifestyle.",
  author = "Safal Lama",
  keywords = "handmade, ecommerce, Nepal, Safal Lama, traditional crafts, home decor, gifts",
  viewport = "width=device-width, initial-scale=1",
  canonicalUrl = "",
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="author" content={author} />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content={viewport} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />

        {/* Canonical URL */}
        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      </Helmet>

      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
