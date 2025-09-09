import { useState, useEffect } from "react";
import axios from "axios";
import BackendURL from "../config/BackendURL";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OurOrder = () => {
  const [myData, setMydata] = useState([]);
  const [loadingStatusId, setLoadingStatusId] = useState(null);
  const [reviews, setReviews] = useState({}); // local review inputs state
  const [savedReviews, setSavedReviews] = useState([]); // fetched reviews from backend
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Load orders from backend
  const loadData = async () => {
    try {
      const api = `${BackendURL}user/order/?token=${token}`;
      const response = await axios.get(api);
      console.log(response.data)
      // setMydata(response.data);
    } catch (err) {
      toast.error("Failed to fetch order data");
      console.error("Failed to fetch order data", err);
    }
  };

  // Authentication check
  const auth = () => {
   
    if (!token) {
      navigate("/login");
      toast.error("Login First");
    }
  };

  useEffect(() => {
    auth();
    loadData();
  }, []);

  // Delay helper
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  // Change order status API call
  const changeStatus = async (id) => {
    setLoadingStatusId(id);
    try {
      const api = `${BackendURL}user/return/?id=${id}`;
      await axios.get(api);
      await delay(6000);
      await loadData();
      toast.success("Order status updated!");
    } catch (error) {
      toast.error("Status update failed");
      console.error("Status update failed", error);
    } finally {
      setLoadingStatusId(null);
    }
  };

  // Invoice generator
  const generateInvoice = (order) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Invoice", 105, 20, null, null, "center");
    doc.setFontSize(12);
    doc.text(`Order ID: ${order._id}`, 14, 40);
    doc.text(`Name: ${order.name}`, 14, 50);
    doc.text(`Email: ${order.email}`, 14, 60);
    doc.text(`Contact: ${order.contact}`, 14, 70);
    doc.text(`City: ${order.city}`, 14, 80);
    doc.text(`Address: ${order.address}`, 14, 90);
    doc.text(`Pincode: ${order.pincode}`, 14, 100);
    doc.text(`Age: ${order.age}`, 14, 110);
    doc.text("Products:", 14, 120);

    const productsList = Array.isArray(order.products)
      ? order.products
          .map((p, idx) => {
            if (typeof p === "string") return `${idx + 1}. ${p}`;
            else if (p.name) return `${idx + 1}. ${p.name} (Qty: ${p.quantity || 1})`;
            else return `${idx + 1}. Product`;
          })
          .join("\n")
      : order.products || "";

    doc.setFontSize(10);
    const lines = productsList.split("\n");
    lines.forEach((line, i) => {
      doc.text(line, 14, 130 + i * 10);
    });

    doc.setFontSize(12);
    const amountNumber = Number(order.amount) || 0;
    doc.text(`Total Amount: ₹${amountNumber.toFixed(2)}`, 14, 130 + lines.length * 10 + 10);

    doc.save(`invoice_${order._id}.pdf`);
    toast.success("Invoice downloaded!");
  };

  // Update local inputs on change
  const handleInput = (e, orderId) => {
    const { name, value } = e.target;
    setReviews((prev) => ({
      ...prev,
      [orderId]: {
        ...prev[orderId],
        [name]: value,
      },
    }));
  };

  let user = localStorage.getItem("name");

  // Submit review - POST to backend
  const reviewSubmit = async (orderId, productId) => {
    if (!reviews[orderId]?.review || !reviews[orderId]?.rating) {
      toast.error("Please enter both review and rating");
      return;
    }

    try {
      const payload = {
        orderId,
        productid: productId,
        review: reviews[orderId].review,
        rating: reviews[orderId].rating,
        userName: user,
      };
      await axios.post(`${BackendURL}user/review`, payload);
      toast.success("Review Submitted");
      setReviews((prev) => ({
        ...prev,
        [orderId]: { review: "", rating: "" },
      }));
    } catch (error) {
      toast.error("Failed to submit review");
      console.error("Failed to submit review", error);
    }
  };

  return (
    <>
      <h1 className="orders-title">Our Orders</h1>
      <div className="order-wrapper">
        {myData.map((order) => {
          const isLoading = loadingStatusId === order._id;
          const isDelivered = order.taskstatus;

          // Filter savedReviews relevant to this order
          const orderReviews = savedReviews.filter(
            (r) => String(r.orderId) === String(order._id)
          );

          return (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <h3>{order.name}</h3>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Button
                    variant={isDelivered ? "success" : "danger"}
                    onClick={() => changeStatus(order._id)}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>{" "}
                        Updating...
                      </>
                    ) : isDelivered ? (
                      "Delivered"
                    ) : (
                      "Pending"
                    )}
                  </Button>

                  <Button
                    variant="primary"
                    onClick={() => generateInvoice(order)}
                    disabled={!isDelivered}
                    title={!isDelivered ? "Invoice available after delivery" : "Get Invoice"}
                  >
                    Get Invoice
                  </Button>
                </div>
              </div>

              <div className="order-details">
                <img src={order.defaultimage} alt="" />
                <p>
                  <strong>Email:</strong> {order.email}
                </p>
                <p>
                  <strong>Contact:</strong> {order.contact}
                </p>
                <p>
                  <strong>City:</strong> {order.city}, {order.pincode}
                </p>
                <p>
                  <strong>Address:</strong> {order.address}
                </p>
                <p>
                  <strong>Age:</strong> {order.age}
                </p>
                <p>
                  <strong>Products:</strong>{" "}
                  {Array.isArray(order.products) ? order.products.join(", ") : order.products}
                </p>
                <p>
                  <strong>Total Amount:</strong> ₹{order.amount}
                </p>
              </div>

              {/* Reviews display */}
              <div className="reviews-display" style={{ marginTop: "10px" }}>
                <h5>Reviews:</h5>
                {orderReviews.length === 0 ? (
                  <p>No reviews yet.</p>
                ) : (
                  orderReviews.map((r, idx) => (
                    <div key={idx} style={{ borderBottom: "1px solid #ccc", marginBottom: "6px" }}>
                      <strong>{r.userName}</strong> ⭐ {r.rating}
                      <p>{r.review}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Review Input - only if delivered */}
              {isDelivered && (
                <div className="review-section" style={{ marginTop: "10px" }}>
                  <input
                    name="review"
                    placeholder="Write your review"
                    value={reviews[order._id]?.review || ""}
                    onChange={(e) => handleInput(e, order._id)}
                  />
                  <input
                    name="rating"
                    placeholder="Rating (1-5)"
                    type="number"
                    min={1}
                    max={5}
                    value={reviews[order._id]?.rating || ""}
                    onChange={(e) => handleInput(e, order._id)}
                  />
                  <Button
                    style={{ marginTop: "5px" }}
                    variant="secondary"
                    onClick={() => reviewSubmit(order._id, order.productID)}
                  >
                    Submit Review
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default OurOrder;
