import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import axios from "axios";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { auth } = useAuth();

  const shippingStatusOptions = [
    "not processed",
    "processing",
    "shipped",
    "delivered",
    "cancel",
  ];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/auth/all-orders`,
          {
            headers: {
              Authorization: `Bearer ${auth?.token}`,
            },
          }
        );
        setOrders(data.orders || []);
      } catch {
        setError("Failed to fetch orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (auth?.token) fetchOrders();
  }, [auth?.token]);

  const handleShippingStatusChange = async (orderId, value) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/v1/auth/order-status/${orderId}`,
        { orderId, status: value },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: value } : order
        )
      );
    } catch {
      alert("Failed to update the shipping status. Please try again.");
    }
  };

  const formatOrder = (order) => {
    const shippingStatus = order.status;
    return {
      orderId: order._id,
      buyerName: order.buyer?.name || "Unknown",
      products: order.products.map((product) => product.name).join(", "),
      totalPrice: `₹${order.products
        .reduce((total, product) => total + product.price, 0)
        .toFixed(2)}`,
      paymentStatus: shippingStatus === "not processed" ? "Pending" : "Success", // Check shippingStatus
      shippingStatus: shippingStatus,
      orderDate: new Date(order.createdAt).toLocaleDateString(),
    };
  };

  if (loading) {
    return (
      <Layout title="Admin Orders">
        <div className="text-center">
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="Admin Orders">
        <div className="text-center">
          <p className="text-danger">{error}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Admin Orders">
      <div className="row">
        <div className="col-md-4">
          <AdminMenu />
        </div>
        <div className="col-md-8">
          <h1 className="text-center">All Orders</h1>
          <div className="table-container">
            <table className="table table-striped table-hover">
              <thead>
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
                  const {
                    orderId,
                    buyerName,
                    products,
                    totalPrice,
                    paymentStatus,
                    shippingStatus,
                    orderDate,
                  } = formatOrder(order);

                  return (
                    <tr key={orderId}>
                      <td>{orderId}</td>
                      <td>{buyerName}</td>
                      <td>{products}</td>
                      <td>{totalPrice}</td>
                      <td>{paymentStatus}</td>
                      <td>
                        <select
                          className="form-select"
                          value={shippingStatus}
                          onChange={(e) =>
                            handleShippingStatusChange(orderId, e.target.value)
                          }
                        >
                          {shippingStatusOptions.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>{orderDate}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
