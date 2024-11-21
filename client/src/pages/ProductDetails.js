import React, { useState, useEffect, useCallback } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProduct = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product || {});
      getRelatedProducts(data?.product?.category?.slug);
    } catch (err) {
      setError("Failed to fetch product details.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [params.slug]);

  const getRelatedProducts = async (categorySlug) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/product/product-category/${categorySlug}`
      );
      setRelatedProducts(data?.products || []);
    } catch (err) {
      setError("Failed to fetch related products.");
      console.error(err);
    }
  };

  useEffect(() => {
    if (params?.slug) {
      getProduct();
    }
  }, [params?.slug, getProduct]);

  if (loading) {
    return <div className="text-center mt-5">Loading product details...</div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-danger">{error}</div>;
  }

  return (
    <Layout>
      <Helmet>
        <title>{product.name} - Saman</title>
        <meta
          name="description"
          content={`Find out more about ${product.name} in the ${product.category?.name} category. Best price and amazing features.`}
        />
        <meta name="author" content="Safal lama" />
        <meta
          name="keywords"
          content={`${product.name}, ${product.category?.name}, buy online, best price, product details`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>

      <div className="container mt-3">
        <div className="row animate__animated animate__fadeIn">
          <div className="col-md-6 mb-4">
            <img
              src={`${process.env.REACT_APP_API_URL}/api/v1/product/product-photo/${product._id}`}
              alt={product.name}
              className="img-fluid rounded shadow"
            />
          </div>
          <div className="col-md-6">
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <h3 className="text-primary">Nrs.{product.price}</h3>
            <h5 className="text-muted">Category: {product?.category?.name}</h5>
            <button className="btn btn-primary mt-3 w-100">ADD TO CART</button>
          </div>
        </div>

        <hr />

        <div className="related-products">
          <h4>Similar Products</h4>
          {relatedProducts.length === 0 ? (
            <p className="text-center">No similar products found</p>
          ) : (
            <div className="d-flex flex-wrap justify-content-start animate__animated animate__fadeIn">
              {relatedProducts?.map((p) => (
                <div
                  key={p._id}
                  className="card m-2"
                  style={{ width: "18rem" }}
                >
                  <div className="card-body p-2">
                    <img
                      src={`${process.env.REACT_APP_API_URL}/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                    />
                    <h5 className="card-title mt-2">{p.name}</h5>
                    <p className="card-text">
                      {p.description.substring(0, 30)}...
                    </p>
                    <p className="card-text">₹{p.price}</p>
                    <button
                      className="btn btn-outline-primary btn-sm w-100"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
