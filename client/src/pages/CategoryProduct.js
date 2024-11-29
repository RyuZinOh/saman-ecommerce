import React, { useState, useEffect, useCallback } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Spin } from "antd";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";

const CategoryProduct = () => {
  const { cart, setCart } = useCart();
  const { auth } = useAuth();
  const params = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPrductsByCat = useCallback(async () => {
    const cachedProducts = localStorage.getItem(`products_${params.slug}`);
    if (cachedProducts) {
      setProducts(JSON.parse(cachedProducts));
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products || []);
      localStorage.setItem(
        `products_${params.slug}`,
        JSON.stringify(data?.products || [])
      );
    } finally {
      setLoading(false);
    }
  }, [params.slug]);

  useEffect(() => {
    getPrductsByCat();
  }, [getPrductsByCat]);

  const addToCart = useCallback(
    (product) => {
      if (!auth?.token) {
        toast.error("Please log in to add items to the cart.");
        return;
      }
      const updatedCart = [...cart, product];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      toast.success("Added to cart successfully!");
    },
    [auth, cart, setCart]
  );

  return (
    <Layout
      title="Category - Saman"
      description="Browse products by category"
      keywords="products, categories, shopping"
      author="safal lama"
    >
      <div className="row mt-2">
        <div className="col-md-12">
          {loading ? (
            <div className="text-center">
              <Spin size="large" />
            </div>
          ) : (
            <div className="d-flex flex-wrap">
              {products.length > 0 ? (
                products.map((product) => (
                  <div key={product._id} className="col-md-4 mb-4">
                    <div className="card h-100">
                      <img
                        src={`${process.env.REACT_APP_API_URL}/api/v1/product/product-photo/${product._id}?format=webp`}
                        className="card-img-top"
                        alt={product.name}
                        loading="lazy"
                      />
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">
                          {product.description.substring(0, 30)}...
                        </p>
                        <p className="card-text text-success">
                          ₹{product.price}
                        </p>
                        <div className="d-flex justify-content-between mt-auto">
                          <Button
                            type="primary"
                            size="small"
                            onClick={() => navigate(`/product/${product.slug}`)}
                          >
                            More Details
                          </Button>
                          <Button
                            type="secondary"
                            size="small"
                            onClick={() => addToCart(product)}
                          >
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center">
                  <h4>No products available in this category.</h4>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
