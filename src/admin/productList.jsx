import { useState, useEffect } from "react";
import BackendURL from "../config/BackendURL";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { IoTrashBin } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Pagination from "react-bootstrap/Pagination";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductList = () => {
  const [myData, setMyData] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const loadData = async () => {
    setLoading(true);
    try {
      const api = `${BackendURL}admin/allpro`;
      const response = await axios.get(api);
      setMyData(response.data);
    } catch {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const deletePro = async (id) => {
    const api = `${BackendURL}admin/deletepro/?id=${id}`;
    try {
      const res = await axios.delete(api);
      toast.success(res.data.msg || "Product deleted successfully");
      loadData();
    } catch {
      toast.error("Error deleting product");
    }
  };

  const handleEditClick = (product) => {
    setEditProduct({ ...product });
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const api = `${BackendURL}admin/updatepro/?id=${editProduct._id}`;
      const res = await axios.put(api, editProduct);
      toast.success(res.data.msg || "Product updated successfully");
      setShowModal(false);
      loadData();
    } catch {
      toast.error("Error updating product");
    }
  };

  // Pagination
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = myData.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(myData.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="product-list-wrapper">
      <Card className="shadow-sm p-4">
        <h3 className="text-center mb-4 product-list-title">📦 Product List</h3>

        {loading ? (
          <div className="text-center my-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Loading products...</p>
          </div>
        ) : (
          <>
            <Table responsive bordered hover className="align-middle product-table">
              <thead className="table-header">
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th colSpan={2} className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((product, index) => (
                  <tr key={product._id}>
                    <td>{indexOfFirst + index + 1}</td>
                    <td>
                      <img
                        src={product.defaultimage}
                        className="product-img"
                        alt={product.name}
                        style={{ width: "50px", height: "50px", objectFit: "cover" }}
                      />
                    </td>
                    <td className="fw-semibold">{product.name}</td>
                    <td className="text-muted">{product.description}</td>
                    <td>
                      <span className="badge bg-secondary">{product.category}</span>
                    </td>
                    <td className="fw-bold text-success">${product.price}</td>
                    <td className="text-center">
                      <IoTrashBin
                        size={22}
                        className="action-icon delete"
                        onClick={() => deletePro(product._id)}
                        style={{ cursor: "pointer", color: "red" }}
                      />
                    </td>
                    <td className="text-center">
                      <MdEdit
                        size={22}
                        className="action-icon edit"
                        onClick={() => handleEditClick(product)}
                        style={{ cursor: "pointer", color: "blue" }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <div className="d-flex justify-content-center mt-3">
              <Pagination>
                <Pagination.Prev
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                />
                {[...Array(totalPages)].map((_, idx) => (
                  <Pagination.Item
                    key={idx + 1}
                    active={currentPage === idx + 1}
                    onClick={() => paginate(idx + 1)}
                  >
                    {idx + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                />
              </Pagination>
            </div>
          </>
        )}
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                value={editProduct?.name || ""}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                value={editProduct?.description || ""}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                name="category"
                value={editProduct?.category || ""}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                name="price"
                type="number"
                value={editProduct?.price || ""}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toastify Container */}
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
    </div>
  );
};

export default ProductList;
