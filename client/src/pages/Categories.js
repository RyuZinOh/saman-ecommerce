import React from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/Layout/Layout";

const Categories = () => {
  const { categories } = useCategory();

  if (!categories?.length) {
    return (
      <Layout title={"All Categories"}>
        <div className="container">
          <h2 className="text-center mt-5">No Categories Found</h2>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title="All Categories"
      description="Browse all product categories available on our platform."
      author="Safal Lama"
      keywords="categories, products, browse, shop"
    >
      <div className="container">
        <h1 className="text-center my-4">All Categories</h1>
        <div className="row">
          {categories.map((category) => (
            <div className="col-md-6 mt-3 mb-3" key={category._id}>
              <Link
                to={`/category/${category.slug}`}
                className="btn btn-primary d-block"
              >
                {category.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
