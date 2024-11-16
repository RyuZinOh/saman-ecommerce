import React, { useState, useEffect, useMemo } from "react";
import Layout from "../components/Layout/Layout";
import { Helmet } from "react-helmet";
import axios from "axios";
import { Link } from "react-router-dom";
import { Checkbox, Slider, Pagination, Button, Input } from "antd";
import { SearchOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/product/get-product`
      );
      setProducts(data.products);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/category/get-category`
      );
      if (data.success) setCategories(data.category);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const filterProducts = useMemo(() => {
    let filtered = products;

    if (checked.length > 0) {
      filtered = filtered.filter((product) =>
        checked.includes(product.category._id)
      );
    }

    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    if (searchQuery.trim()) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [products, checked, priceRange, searchQuery]);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return filterProducts.slice(start, end);
  }, [filterProducts, currentPage, pageSize]);

  const handleFilterChange = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    setChecked(updatedChecked);
  };

  const handlePriceChange = (value) => {
    setPriceRange(value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter") {
      setSearchQuery(e.target.value);
    }
  };

  const handleResetFilters = () => {
    setChecked([]);
    setPriceRange([0, 50000]);
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePriceIncrement = () => {
    const newPriceRange = [
      priceRange[0],
      Math.min(priceRange[1] + 1000, 50000), 
    ];
    setPriceRange(newPriceRange);
  };

  const handlePriceDecrement = () => {
    const newPriceRange = [
      priceRange[0],
      Math.max(priceRange[1] - 1000, 0), 
    ];
    setPriceRange(newPriceRange);
  };

  useEffect(() => {
    getAllProducts();
    getAllCategories();
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Home - My Website</title>
        <meta name="description" content="Welcome to My Website." />
        <meta name="author" content="My Website Team" />
        <meta name="keywords" content="homepage, services, blog, contact" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>

      <div className="row mt-3">
        <div className="col-md-2">
          <h4 className="text-center">Search</h4>
          <Input
            placeholder="Search products"
            onChange={handleSearchChange}
            onKeyDown={handleSearchSubmit}
            value={searchQuery}
            className="mb-3"
            prefix={<SearchOutlined />}
            style={{
              borderRadius: "25px",
              paddingLeft: "30px",
              width: "100%",
            }}
          />
          <h4 className="text-center">Filter by Category</h4>
          <div className="d-flex flex-column-reverse">
            {categories.map((category) => (
              <Checkbox
                key={category._id}
                onChange={(e) =>
                  handleFilterChange(e.target.checked, category._id)
                }
                checked={checked.includes(category._id)}
              >
                {category.name}
              </Checkbox>
            ))}
          </div>
          <h4 className="text-center mt-4">Filter by Price</h4>
          <div className="d-flex justify-content-between align-items-center">
            <MinusOutlined onClick={handlePriceDecrement} />
            <Slider
              range
              defaultValue={[0, 50000]}
              min={0}
              max={50000}
              onChange={handlePriceChange}
              value={priceRange}
              style={{ width: "70%" }}
            />
            <PlusOutlined onClick={handlePriceIncrement} />
          </div>
          <div className="text-center mb-3">
            <span>
              Price: ₹{priceRange[0]} - ₹{priceRange[1]}
            </span>
          </div>
          <Button type="primary" block onClick={handleResetFilters}>
            Reset Filters
          </Button>
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map((product) => (
                <Link
                  key={product._id}
                  to={`/dashboard/admin/product/${product.slug}`}
                  className="tanjiro-product-link"
                >
                  <div className="card m-3 saitama-card">
                    <img
                      src={`${process.env.REACT_APP_API_URL}/api/v1/product/product-photo/${product._id}`}
                      className="card-img-top gojo-img"
                      alt={product.name}
                      loading="lazy"
                    />
                    <div className="card-body levi-body">
                      <h5 className="card-title eren-title">{product.name}</h5>
                      <p className="card-text mikasa-text">
                        {product.description}
                      </p>
                      <p className="card-text text-success">
                        Price: ₹{product.price}
                      </p>
                      <button className="btn btn-primary ms-1">
                        See Details
                      </button>
                      <button className="btn btn-secondary ms-1">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center w-100">
                <h4>No products match the selected filters.</h4>
              </div>
            )}
          </div>
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
