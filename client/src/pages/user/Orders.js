import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import axios from "axios";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaShippingFast,
  FaSpinner,
} from "react-icons/fa";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { auth } = useAuth();

  const getOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/auth/orders`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      setOrders(data);
    } catch (error) {
      setError("Failed to fetch orders. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const formatOrderData = (order) => {
    const totalPrice = order.products.reduce(
      (total, product) => total + product.price,
      0
    );

    let paymentStatus;
    let shippingStatus;

    if (order.status === "not processed") {
      shippingStatus = "Processing";
      paymentStatus = "Pending";
    } else if (order.status === "shipped") {
      shippingStatus = "Shipped";
      paymentStatus = "Completed";
    } else {
      shippingStatus = "Cancelled";
      paymentStatus = "Failed";
    }

    return {
      orderId: order._id,
      buyerName: order.buyer.name,
      products: order.products.map((product) => `${product.name}`).join(", "),
      totalPrice: `₹${totalPrice.toFixed(2)}`,
      paymentStatus,
      shippingStatus,
      orderDate: new Date(order.createdAt).toLocaleDateString(),
    };
  };

  return (
    <Layout
      title={`Your Orders - ${auth?.user?.name}`}
      description="View and manage all your orders in the Ecommerce App. Track order status, details, and history."
      author="Safal Lama"
      keywords="User orders, view orders, order history, order management, ecommerce orders"
    >
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card p-4 shadow-lg">
              <h4 className="mb-4 text-center text-primary">Your Orders</h4>

              {loading ? (
                <div className="alert alert-info text-center">
                  <FaSpinner className="spin" /> Loading Orders...
                </div>
              ) : error ? (
                <div className="alert alert-danger text-center">{error}</div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-bordered table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>Order ID</th>
                        <th>Buyer Name</th>
                        <th>Products</th>
                        <th>Total Price</th>
                        <th>Payment Status</th>
                        <th>Shipping Status</th>
                        <th>Order Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => {
                        const formattedOrder = formatOrderData(order);
                        return (
                          <tr key={formattedOrder.orderId}>
                            <td>{formattedOrder.orderId}</td>
                            <td>{formattedOrder.buyerName}</td>
                            <td>{formattedOrder.products}</td>
                            <td>{formattedOrder.totalPrice}</td>
                            <td>
                              {formattedOrder.paymentStatus === "Completed" ? (
                                <span className="text-success">
                                  <FaCheckCircle /> Completed
                                </span>
                              ) : formattedOrder.paymentStatus === "Pending" ? (
                                <span className="text-warning">
                                  <FaSpinner className="spin" /> Pending
                                </span>
                              ) : (
                                <span className="text-danger">
                                  <FaTimesCircle /> Failed
                                </span>
                              )}
                            </td>
                            <td>
                              {formattedOrder.shippingStatus === "Shipped" ? (
                                <span className="text-primary">
                                  <FaShippingFast /> Shipped
                                </span>
                              ) : formattedOrder.shippingStatus ===
                                "Processing" ? (
                                <span className="text-warning">
                                  <FaTimesCircle /> Processing
                                </span>
                              ) : (
                                <span className="text-danger">
                                  <FaTimesCircle /> Cancelled
                                </span>
                              )}
                            </td>
                            <td>{formattedOrder.orderDate}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
