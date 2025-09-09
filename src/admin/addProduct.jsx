import { useState } from "react";
import BackendURL from "../config/BackendURL";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProduct = () => {
  const [frmData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImages = (e) => {
    setImages(e.target.files); // FileList object
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    for (let key in frmData) {
      formData.append(key, frmData[key]);
    }

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    try {
      const api = `${BackendURL}admin/productsave`;
      const response = await axios.post(api, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);
      toast.success(" Product saved successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("file size cannot be greater than 50 Kb");
    }
  };

  return (
    <div className="form-container">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="form-title">Add New Product</h1>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label htmlFor="title" className="form-label">Product Title</label>
          <input
            type="text"
            id="title"
            name="name"
            value={frmData.name}
            onChange={handleChange}
            placeholder="Enter product title"
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            id="description"
            name="description"
            value={frmData.description}
            onChange={handleChange}
            placeholder="Enter product description"
            className="form-textarea"
            rows="4"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price" className="form-label">Price ($)</label>
          <input
            type="number"
            id="price"
            name="price"
            value={frmData.price}
            onChange={handleChange}
            placeholder="Enter price"
            className="form-input"
            min="0"
            step="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category" className="form-label">Category</label>
          <select
            id="category"
            name="category"
            value={frmData.category}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">Select a category</option>
            <option value="mens">Mens</option>
            <option value="womens">Womens</option>
            <option value="kids">Kids</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="image" className="form-label">Upload Images</label>
          <input
            type="file"
            id="image"
            name="images"
            multiple
            accept="image/*"
            onChange={handleImages}
            className="form-input"
          />
        </div>

        <button type="submit" className="form-submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
