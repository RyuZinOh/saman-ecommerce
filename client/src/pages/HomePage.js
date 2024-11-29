import React, { useState, useEffect, useCallback, useMemo } from "react";
import Layout from "../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import imagehome from "../assets/_saman.png";
import imagehome1 from "../assets/_saman_1.png";
import { Checkbox, Slider, Input, Button, Pagination, Spin } from "antd";
import { SearchOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";

const HomePage = () => {
  const { cart, setCart } = useCart();
  const { auth } = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 9999999]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);
  const [loading, setLoading] = useState(false);
  const [bannerImages] = useState([imagehome, imagehome1]);
  const navigate = useNavigate();

  const getAllProducts = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/product/get-product`
      );
      setProducts(data.products || []);
    } finally {
      setLoading(false);
    }
  }, []);

  const getAllCategories = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/category/get-category`
      );
      setCategories(data.category || []);
    } catch {}
  }, []);

  const filterProducts = useMemo(() => {
    let filtered = products;
    if (checked.length)
      filtered = filtered.filter((p) => checked.includes(p.category._id));
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );
    if (searchQuery.trim())
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return filtered;
  }, [products, checked, priceRange, searchQuery]);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filterProducts.slice(start, start + pageSize);
  }, [filterProducts, currentPage, pageSize]);

  const handleFilterChange = (value, id) =>
    setChecked((prev) =>
      value ? [...prev, id] : prev.filter((c) => c !== id)
    );
  const handlePriceChange = (value) => setPriceRange(value);
  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleResetFilters = () => {
    setChecked([]);
    setPriceRange([0, 9999999]);
    setSearchQuery("");
    setCurrentPage(1);
  };
  const handlePageChange = (page) => setCurrentPage(page);
  const handlePriceIncrement = () =>
    setPriceRange(([min, max]) => [min, Math.min(max + 1000, 9999999)]);
  const handlePriceDecrement = () =>
    setPriceRange(([min, max]) => [min, Math.max(max - 1000, 0)]);

  useEffect(() => {
    getAllProducts();
    getAllCategories();
  }, [getAllProducts, getAllCategories]);

  useEffect(() => {
    if (currentPage > Math.ceil(filterProducts.length / pageSize))
      setCurrentPage(1);
  }, [filterProducts, pageSize, currentPage]);

  return (
    <Layout
      title="Saman - Home"
      description="Discover the best products at affordable prices. Shop categories, filter by price, and find exactly what you need."
      keywords="products, shopping, affordable prices, categories, filters"
      author="safal lama"
    >
      <div
        id="carouselExampleCaptions"
        className="carousel slide mb-4 shadow-lg"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {bannerImages.map((image, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <img
                src={image}
                className="d-block w-100"
                alt={`banner-${index}`}
                style={{ maxHeight: "80vh", objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <FaChevronLeft style={{ color: "black", fontSize: "2rem" }} />
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <FaChevronRight style={{ color: "black", fontSize: "2rem" }} />
        </button>
      </div>

      <div className="row mt-2">
        <div className="col-md-3">
          <Input
            placeholder="Search products"
            onChange={handleSearchChange}
            value={searchQuery}
            className="mb-3"
            prefix={<SearchOutlined />}
            style={{ borderRadius: "25px", paddingLeft: "30px", width: "100%" }}
          />
          <h4 className="text-center">Filter by Category</h4>
          <div className="d-flex flex-column-reverse">
            {categories.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilterChange(e.target.checked, c._id)}
                checked={checked.includes(c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          <h4 className="text-center mt-4">Filter by Price</h4>
          <div className="d-flex justify-content-between align-items-center">
            <MinusOutlined onClick={handlePriceDecrement} />
            <Slider
              range
              min={0}
              max={9999999}
              value={priceRange}
              onChange={handlePriceChange}
              style={{ width: "70%" }}
            />
            <PlusOutlined onClick={handlePriceIncrement} />
          </div>
          <div className="text-center mb-3">
            <span>
              ₹{priceRange[0]} - ₹{priceRange[1]}
            </span>
          </div>
          <Button type="primary" block onClick={handleResetFilters}>
            Reset Filters
          </Button>
        </div>
        <div className="col-md-9">
          {loading ? (
            <div className="text-center">
              <Spin size="large" />
            </div>
          ) : (
            <div className="d-flex flex-wrap">
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((product) => (
                  <div key={product._id} className="col-md-4 mb-4">
                    <div className="card h-100">
                      <img
                        src={`${process.env.REACT_APP_API_URL}/api/v1/product/product-photo/${product._id}`}
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
                            onClick={() => {
                              if (!auth?.token) {
                                toast.error(
                                  "Please log in to add items to the cart."
                                );
                                return;
                              }
                              const updatedCart = [...cart, product];
                              setCart(updatedCart);
                              localStorage.setItem(
                                "cart",
                                JSON.stringify(updatedCart)
                              );
                              toast.success("Added to cart successfully!");
                            }}
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
                  <h4>No products match the selected filters.</h4>
                </div>
              )}
            </div>
          )}
          <div className="d-flex justify-content-center mt-4">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={filterProducts.length}
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
