import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select, Spin, InputNumber } from "antd";
import { useNavigate } from "react-router-dom";

import "../css/custom.css";
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    shipping: "0", 
    photo: null,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const { data } = await axios.get(
          `${apiUrl}/api/v1/category/get-category`
        );
        if (data?.success) {
          setCategories(data?.category);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch categories");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      photo: file,
    }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const formData = new FormData();
      Object.entries(productDetails).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const { data } = await axios.post(
        `${apiUrl}/api/v1/product/create-product`,
        formData
      );
      if (data?.success) {
        toast.success("Product created successfully!");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message || "Error creating product");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while creating the product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Dashboard - Create Product">
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card shadow-lg p-4">
              <h2 className="card-title mb-4">Create New Product</h2>
              <form className="form-container" onSubmit={handleCreate}>
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">Category</label>
                  {loading ? (
                    <Spin size="small" />
                  ) : (
                    <Select
                      id="category"
                      bordered={false}
                      placeholder="Select a category"
                      size="large"
                      onChange={(value) =>
                        setProductDetails({
                          ...productDetails,
                          category: value,
                        })
                      }
                      value={productDetails.category}
                      className="form-select"
                    >
                      {categories.map((c) => (
                        <Option key={c._id} value={c._id}>{c.name}</Option>
                      ))}
                    </Select>
                  )}
                </div>

                <div className="mb-3">
                  <label className="btn btn-outline-secondary col-md-12 custom-file-upload">
                    {productDetails.photo ? productDetails.photo.name : "Upload Photo"}
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={handleFileChange}
                      hidden
                    />
                  </label>
                </div>
                {productDetails.photo && (
                  <div className="text-center mb-3">
                    <img
                      src={URL.createObjectURL(productDetails.photo)}
                      alt="product_preview"
                      height="100px"
                      width= "250px"
                      className="img-fluid rounded"
                    />
                  </div>
                )}

                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Product Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={productDetails.name}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Enter product name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={productDetails.description}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Enter product description"
                    rows="4"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">Price</label>
                  <InputNumber
                    id="price"
                    name="price"
                    value={productDetails.price}
                    onChange={(value) =>
                      setProductDetails({ ...productDetails, price: value })
                    }
                    className="form-control"
                    placeholder="Enter product price"
                    min={0}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="quantity" className="form-label">Quantity</label>
                  <InputNumber
                    id="quantity"
                    name="quantity"
                    value={productDetails.quantity}
                    onChange={(value) =>
                      setProductDetails({ ...productDetails, quantity: value })
                    }
                    className="form-control"
                    placeholder="Enter product quantity"
                    min={1}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="shipping" className="form-label">Shipping</label>
                  <Select
                    id="shipping"
                    bordered={false}
                    placeholder="Select Shipping"
                    size="large"
                    onChange={(value) =>
                      setProductDetails({ ...productDetails, shipping: value })
                    }
                    value={productDetails.shipping}
                    className="form-select"
                  >
                    <Option value="0">No</Option>
                    <Option value="1">Yes</Option>
                  </Select>
                </div>

                <div className="mb-3 text-center">
                  <button
                    type="submit"
                    className="btn btn-custom btn-lg"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Product"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
