import React, { useState, useMemo } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { Button, Pagination, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

const CartPage = () => {
  const { cart, setCart } = useCart();
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;
  const navigate = useNavigate();

  const calculateTotal = useMemo(
    () => cart?.reduce((total, item) => total + item.price, 0).toFixed(2),
    [cart]
  );

  const paginatedCart = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return cart.slice(start, start + pageSize);
  }, [cart, currentPage]);

  const handleRemoveFromCart = (product) => {
    const updatedCart = cart.filter((item) => item._id !== product._id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Removed from cart successfully!");
  };

  const handleProceedToCheckout = () => {
    if (!auth?.token) {
      toast.error("Please log in to proceed to checkout.");
      return;
    }
    navigate("/checkout");
  };

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <Layout>
      <Helmet>
        <title>Cart - My Website</title>
        <meta name="description" content="Your shopping cart." />
      </Helmet>
      <div className="container">
        <div className="row mt-4">
          <div className="col-md-9">
            <h1 className="text-center">Your Cart</h1>
            {loading ? (
              <div className="text-center">
                <Spin size="large" />
              </div>
            ) : cart.length > 0 ? (
              <div className="d-flex flex-wrap">
                {paginatedCart.map((product) => (
                  <div
                    key={product._id}
                    className="card m-3"
                    style={{
                      width: "18rem",
                      borderRadius: "8px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      className="image-container"
                      style={{ overflow: "hidden" }}
                    >
                      <img
                        src={`${process.env.REACT_APP_API_URL}/api/v1/product/product-photo/${product._id}`}
                        className="card-img-top zoom-img"
                        alt={product.name}
                        loading="lazy"
                      />
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">
                        {product.description.substring(0, 30)}...
                      </p>
                      <p className="card-text text-success">₹{product.price}</p>
                      <div className="d-flex justify-content-between">
                        <Button
                          type="primary"
                          size="small"
                          onClick={() => navigate(`/product/${product.slug}`)}
                          style={{ fontSize: "12px", padding: "5px 10px" }}
                        >
                          More Details
                        </Button>
                        <Button
                          type="danger"
                          size="small"
                          onClick={() => handleRemoveFromCart(product)}
                          style={{ fontSize: "12px", padding: "5px 10px" }}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center w-100">
                <h4>Your cart is empty.</h4>
              </div>
            )}
          </div>

          <div className="col-md-3">
            {cart.length > 0 && (
              <div
                className="border p-3"
                style={{
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
              >
                <h4>Cart Summary</h4>
                <p>Total Items: {cart.length}</p>
                <p>Total Price: ₹{calculateTotal}</p>
                <Button
                  type="primary"
                  block
                  size="large"
                  onClick={handleProceedToCheckout}
                  style={{ borderRadius: "5px", padding: "12px" }}
                >
                  {auth?.token ? "Proceed to Checkout" : "Login to Checkout"}
                </Button>
              </div>
            )}
          </div>
        </div>

        {cart.length > 0 && (
          <div className="d-flex justify-content-center mt-4">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={cart.length}
              onChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
