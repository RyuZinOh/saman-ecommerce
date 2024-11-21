import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";
import { useAuth } from "../../context/auth";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const { auth } = useAuth();

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/category/get-category`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`, //token i header
          },
        }
      );
      if (data.success) setCategories(data.category);
    } catch (error) {
      console.error(error);
      toast.error("Error retrieving categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, [auth?.token]); // Rerunning token if necesary

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/category/create-category`,
        { name },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error creating category");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/v1/category/update-category/${selected._id}`,
        { name: updatedName },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      if (data.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setIsModalOpen(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error updating category");
    }
  };

  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/v1/category/delete-category/${pId}`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      if (data.success) {
        toast.success("Category deleted");
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error deleting category");
    }
  };

  return (
    <Layout
      title="Dashboard - Manage Category - Saman"
      description="View and manage product categories in the admin dashboard."
      author="safal lama"
      keywords="Manage categories, product categories, admin dashboard"
    >
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-3 w-50">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <tr key={c._id}>
                      <td>{c.name}</td>
                      <td>
                        <button
                          className="category-button-custom category-button-custom-edit ms-2"
                          onClick={() => {
                            setIsModalOpen(true);
                            setUpdatedName(c.name);
                            setSelected(c);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="category-button-custom category-button-custom-delete ms-2"
                          onClick={() => handleDelete(c._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setIsModalOpen(false)}
              footer={null}
              open={isModalOpen}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
