import { useState, useEffect } from "react";
import BackendURL from "../config/BackendURL";
import axios from "axios";
import Button from "react-bootstrap/Button";
import a2 from "../images/Logo/delivered.png";
import a1 from "../images/Logo/dispatch.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OurProducts = () => {
  const [mydata, setMyData] = useState([]);
  const [loadingStatusId, setLoadingStatusId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const loadData = async () => {
    try {
      const api = `${BackendURL}admin/ourpro`;
      const res = await axios.get(api);
      setMyData(res.data);
    } catch (err) {
      console.error("Failed to fetch data", err);
      toast.error("Error fetching data");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const changeTaskStatus = async (id) => {
    setLoadingStatusId(id);
  
    // show loader immediately, simulate a 6-second wait
    setTimeout(async () => {
      try {
        const api = `${BackendURL}admin/changetaskstatus/?id=${id}`;
        await axios.get(api);
        toast.success("Order Dispatched Successfully");
      } catch (error) {
        toast.error("Failed to Dispatch");
        console.log(error);
      } finally {
        setLoadingStatusId(null);
        loadData(); // reload data to reflect changes
      }
    }, 6000);
  };
  

  const totalPages = Math.ceil(mydata.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedData = mydata.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="order-table-container">
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
      <h2>Your Orders</h2>
      <table className="order-table">
        <thead>
          <tr>
            <th></th>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>City</th>
            <th>Address</th>
            <th>Pincode</th>
            <th>Age</th>
            <th>Contact</th>
            <th>Products</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {selectedData.map((key, index) => {
            const isLoading = loadingStatusId === key._id;
            return (
              <tr key={key._id || index}>
                <td>
                  <img
                    src={key.taskstatus ? a2 : a1}
                    style={{ height: "50px", width: "50px" }}
                    alt={key.taskstatus ? "Delivered" : "Dispatch"}
                  />
                </td>
                <td>{startIndex + index + 1}</td>
                <td>{key.name}</td>
                <td>{key.email}</td>
                <td>{key.city}</td>
                <td>{key.address}</td>
                <td>{key.pincode}</td>
                <td>{key.age}</td>
                <td>{key.contact}</td>
                <td>{key.products.join(", ")}</td>
                <td>₹{key.amount}</td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Button
                      variant={key.taskstatus ? "success" : "danger"}
                      size="sm"
                      disabled={key.taskstatus || isLoading}
                      onClick={() => changeTaskStatus(key._id)}
                    >
                      {key.taskstatus ? "Delivered" : "Dispatch"}
                    </Button>
                    {isLoading && (
                      <div className="spinner-border spinner-border-sm text-primary" role="status" />
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination */}
      <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "10px" }}>
        <Button onClick={handlePrev} disabled={currentPage === 1}>
          Previous
        </Button>
        <span style={{ paddingTop: "5px" }}>
          Page {currentPage} of {totalPages}
        </span>
        <Button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default OurProducts;
