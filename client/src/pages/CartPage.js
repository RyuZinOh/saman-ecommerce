import React, { useState, useEffect, useMemo } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { Button, Pagination, Spin } from "antd";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";

const CartPage = () => {
  const { cart, setCart } = useCart();
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [instance, setInstance] = useState("");
  const [clientToken, setClientToken] = useState("");
  const pageSize = 4;

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

  const handlePageChange = (page) => setCurrentPage(page);

  useEffect(() => {
    const fetchClientToken = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/product/braintree/token`
        );
        setClientToken(data.clientToken);
      } catch (error) {
        console.error("Error fetching client token:", error);
      }
    };
    if (auth?.token) fetchClientToken();
  }, [auth]);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/product/braintree/payment`,
        { nonce, cart },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully");
    } catch (error) {
      setLoading(false);
      console.error("Error processing payment:", error);
    }
  };

  return (
    <Layout
      title="Saman - Cart "
      description="Review and manage the items in your shopping cart."
      author="safal lama"
      keywords="cart, shopping, payment, products"
    >
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
                <div id="dropin-container" className="mt-3">
                  {!clientToken || !cart?.length ? (
                    ""
                  ) : (
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: { flow: "vault" },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />
                  )}
                </div>
                <button
                  className="btn btn-primary w-100 mt-3"
                  onClick={handlePayment}
                  disabled={loading || !instance || !auth?.user?.address}
                  style={{ padding: "12px", borderRadius: "5px" }}
                >
                  {loading ? "Processing ...." : "Make Payment"}
                </button>
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
