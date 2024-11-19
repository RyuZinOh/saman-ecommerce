import React, { useState, useEffect, useCallback } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/auth";

const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { auth } = useAuth();

  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    shipping: "",
    photo: "",
  });
  const [loadingUpdate, setLoadingUpdate] = useState(false); // Separate loading for update
  const [loadingDelete, setLoadingDelete] = useState(false); // Separate loading for delete
  const [id, setId] = useState("");

  const getSingleProduct = useCallback(async () => {
    setLoadingUpdate(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/product/get-product/${slug}`
      );
      const { product: prod } = data;
      setProduct({
        name: prod.name,
        description: prod.description,
        price: prod.price,
        category: prod.category._id,
        quantity: prod.quantity,
        shipping: prod.shipping,
        photo: "",
      });
      setId(prod._id);
    } catch (error) {
      toast.error("Failed to fetch product details");
    } finally {
      setLoadingUpdate(false);
    }
  }, [slug]);

  const getAllCategory = async () => {
    setLoadingUpdate(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/category/get-category`
      );
      if (data?.success) setCategories(data?.category);
    } catch (error) {
      toast.error("Failed to fetch categories");
    } finally {
      setLoadingUpdate(false);
    }
  };

  useEffect(() => {
    getSingleProduct();
    getAllCategory();
  }, [getSingleProduct]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { name, description, price, quantity, category } = product;

    if (!name || !description || !price || !quantity || !category) {
      toast.error("Please fill out all required fields");
      return;
    }

    const token = auth?.token;
    if (!token) {
      toast.error("You are not authenticated");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const productData = new FormData();
      Object.entries(product).forEach(([key, value]) => {
        if (value) productData.append(key, value);
      });

      setLoadingUpdate(true); // Set loading to true for update
      const { data } = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/v1/product/update-product/${id}`,
        productData,
        config
      );

      if (data?.success) {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message || "Update failed");
      }
    } catch (error) {
      toast.error("Failed to update product");
    } finally {
      setLoadingUpdate(false); // Reset loading after update
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    const token = auth?.token;
    if (!token) {
      toast.error("You are not authenticated");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      setLoadingDelete(true); // Set loading to true for delete
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/v1/product/product-delete/${id}`,
        config
      );
      toast.success("Product Deleted Successfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      toast.error("Failed to delete product");
    } finally {
      setLoadingDelete(false); // Reset loading after delete
    }
  };

  const { name, description, price, quantity, category, shipping, photo } =
    product;

  return (
    <Layout title="Dashboard - Update Product">
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) =>
                  setProduct((prev) => ({ ...prev, category: value }))
                }
                value={category}
              >
                {categories.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>

              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={handleChange}
                    hidden
                  />
                </label>
              </div>

              <div className="mb-3 text-center">
                <img
                  src={
                    photo
                      ? URL.createObjectURL(photo)
                      : `${process.env.REACT_APP_API_URL}/api/v1/product/product-photo/${id}`
                  }
                  alt="Product"
                  height="200"
                  className="img img-responsive"
                />
              </div>

              {[
                { name: "name", value: name, placeholder: "Write a name" },
                {
                  name: "description",
                  value: description,
                  placeholder: "Write a description",
                  type: "textarea",
                },
                { name: "price", value: price, placeholder: "Write a price" },
                {
                  name: "quantity",
                  value: quantity,
                  placeholder: "Write a quantity",
                },
              ].map(({ name, value, placeholder, type = "text" }) => (
                <div className="mb-3" key={name}>
                  {type === "textarea" ? (
                    <textarea
                      name={name}
                      value={value}
                      placeholder={placeholder}
                      className="form-control"
                      onChange={handleChange}
                    />
                  ) : (
                    <input
                      type={type}
                      name={name}
                      value={value}
                      placeholder={placeholder}
                      className="form-control"
                      onChange={handleChange}
                    />
                  )}
                </div>
              ))}

              <Select
                bordered={false}
                placeholder="Select Shipping"
                size="large"
                className="form-select mb-3"
                onChange={(value) =>
                  setProduct((prev) => ({ ...prev, shipping: value }))
                }
                value={shipping ? "1" : "0"}
              >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>

              <div className="mb-3">
                <button
                  className="btn btn-custom"
                  onClick={handleUpdate}
                  disabled={loadingUpdate}
                >
                  {loadingUpdate ? "Updating..." : "UPDATE PRODUCT"}
                </button>
              </div>
              <div className="mb-3">
                <button
                  className="btn btn-custom category-button-custom-delete"
                  onClick={handleDelete}
                  disabled={loadingDelete}
                >
                  {loadingDelete ? "Deleting..." : "DELETE PRODUCT"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
