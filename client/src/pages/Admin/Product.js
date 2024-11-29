import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Pagination } from "antd";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/product/get-product`
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Error getting products");
    }
  };

  const paginate = (products) => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return products.slice(start, end);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const paginatedProducts = paginate(products);

  return (
    <Layout title="Dashboard - All Products">
      <div className="row goku-row">
        <div className="col-md-3 naruto-menu">
          <AdminMenu />
        </div>
        <div className="col-md-9 luffy-content">
          <h1 className="text-center ichigo-header mb-4">All Products List</h1>
          <div className="row g-3 justify-content-center">
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map((p) => (
                <div className="col-md-4 col-sm-6 col-xs-12" key={p._id}>
                  <Link
                    to={`/dashboard/admin/product/${p.slug}`}
                    className="tanjiro-product-link"
                  >
                    <div className="card h-100">
                      <img
                        src={`${process.env.REACT_APP_API_URL}/api/v1/product/product-photo/${p._id}`}
                        className="card-img-top img-fluid"
                        alt={p.name}
                      />
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title eren-title">{p.name}</h5>
                        <p className="card-text mikasa-text">{p.description}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div className="text-center col-12">
                <h4>No products available.</h4>
              </div>
            )}
          </div>
          <div className="d-flex justify-content-center mt-4">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={products.length}
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
