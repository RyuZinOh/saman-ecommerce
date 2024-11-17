import React, { useState, useEffect, useCallback } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPrductsByCat = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [params.slug]);

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug, getPrductsByCat]);

  if (loading) {
    return <div className="text-center mt-5">Loading products...</div>;
  }

  return (
    <>
      <Layout>
        <Helmet>
          <title>{category?.name} - My E-Commerce</title>
          <meta
            name="description"
            content={`Browse the best products in the ${category?.name} category. Find amazing deals and offers.`}
          />
          <meta name="author" content="My E-Commerce Team" />
          <meta
            name="keywords"
            content={`${category?.name}, products, buy online, best deals`}
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Helmet>
        <div className="container mt-3">
          <h4 className="text-center mb-4">Category - {category?.name}</h4>
          <h6 className="text-center mb-4">
            {products?.length} result(s) found
          </h6>
          <div className="row">
            <div className="col-md-9 offset-1">
              <div className="row">
                {products?.length > 0 ? (
                  products.map((p) => (
                    <div className="col-md-4 mb-4" key={p._id}>
                      <div
                        className="card shadow-sm h-100 border-0 hover-card"
                        style={{ borderRadius: "10px" }}
                      >
                        <img
                          src={`${process.env.REACT_APP_API_URL}/api/v1/product/product-photo/${p._id}`}
                          className="card-img-top"
                          alt={p.name}
                          style={{
                            height: "200px",
                            objectFit: "cover",
                            borderRadius: "10px 10px 0 0",
                          }}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{p.name}</h5>
                          <p className="card-text">
                            {p.description.length > 30
                              ? `${p.description.substring(0, 30)}...`
                              : p.description}
                          </p>
                          <p className="card-text font-weight-bold">
                            $ {p.price}
                          </p>
                          <div className="d-flex justify-content-between">
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() => navigate(`/product/${p.slug}`)}
                            >
                              More Details
                            </button>
                            <button className="btn btn-secondary btn-sm">
                              ADD TO CART
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-12 text-center">
                    No products found in this category.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CategoryProduct;
