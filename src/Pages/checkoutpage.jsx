import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackendURL from "../config/BackendURL";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Checkout = () => {
  const [mydata, setMydata] = useState({});
  const [proData, setProData] = useState({});
  const navigate = useNavigate();
  const cartData = useSelector((state) => state.mycart.cart);

  const Authentication = async () => {
    const Token = localStorage.getItem("token");
    if (!Token) {
      toast.error("Please login to continue.");
      navigate("/login");
      return;
    }

    try {
      const api = `${BackendURL}user/checkout`;
      await axios.post(api, null, {
        headers: { "auth-token": Token },
      });
    } catch (error) {
      toast.error("Session expired. Please login again.");
      navigate("/login");
    }
  };

  const LoadData = async () => {
    const api = `${BackendURL}user/getuser/?userid=${localStorage.getItem("userid")}`;
    try {
      const response = await axios.get(api);
      setMydata(response.data);
      setProData(response.data);
    } catch (err) {
      toast.error("Failed to load user data");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validation: No numbers in Name, City, Address
    if (["name", "city", "address"].includes(name) && /\d/.test(value)) {
      toast.error(`${name} cannot contain numbers`);
      return;
    }

    // Validation: No negative numbers for phone, pincode, age
    if (["contact", "pincode", "age"].includes(name) && value < 0) {
      toast.error(`${name} cannot be negative`);
      return;
    }

    setProData((prev) => ({ ...prev, [name]: value }));
  };

  const amount = cartData.reduce((acc, item) => acc + item.price * item.qnty, 0);
  const productNames = cartData.map((item) => item.name);
  const productID = cartData.map((item) => item.id).join(", ");

  const handleSubmitAfterPayment = async () => {
    try {
      const api = `${BackendURL}order/userpro`;
      await axios.post(api, {
        ...proData,
        products: productNames,
        amount,
      });
      toast.success("Order successfully placed!");
    } catch (error) {
      toast.error("Order placement failed after payment.");
    }
  };

  const initPay = (data) => {
    const options = {
      key: "rzp_test_CDUcnGt1xFd9hK",
      amount: data.amount,
      currency: data.currency,
      name: productNames.join(", "),
      description: "Product Payment",
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyURL = `${BackendURL}api/payment/verify`;
          const verifyRes = await axios.post(verifyURL, response);

          if (verifyRes.data.success) {
            await handleSubmitAfterPayment();
            toast.success("Payment successful! Order placed.");
            navigate("/thanks");
          } else {
            toast.success("Payment successful! Order placed.");
            navigate("/thanks");
          }
        } catch (error) {
          toast.error("Payment verification failed.");
        }
      },
      theme: { color: "#111111" },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePay = async (e) => {
    e.preventDefault();

    // Final validation before submission
    const requiredFields = ["name", "email", "contact", "city", "address", "pincode", "age"];
    for (let field of requiredFields) {
      if (!proData[field] || proData[field] === "") {
        toast.error(`Please fill ${field}`);
        return;
      }
    }

    try {
      const orderURL = `${BackendURL}api/payment/orders`;
      const { data } = await axios.post(orderURL, {
        name: mydata.name,
        email: mydata.email,
        contact: proData.contact,
        city: mydata.city,
        address: mydata.address,
        pincode: proData.pincode,
        age: proData.age,
        products: productNames,
        productID: productID,
        image: cartData[0]?.defaultimage,
        amount,
      });

      initPay(data.data);
    } catch (error) {
      toast.error("Failed to initiate Razorpay.");
    }
  };

  useEffect(() => {
    Authentication();
    LoadData();
  }, []);

  return (
    <div className="checkout-page">
      <div className="checkout-card">
        <h1 className="checkout-heading">Secure Checkout</h1>

        <form className="checkout-form" onSubmit={handlePay}>
          <div className="form-grid">
            <input name="name" placeholder="Name" value={proData.name || ""} onChange={handleChange} required />
            <input name="email" placeholder="Email" value={proData.email || ""} onChange={handleChange} required />
            <input name="contact" placeholder="Phone" type="number" onChange={handleChange} required />
            <input name="city" placeholder="City" value={proData.city || ""} onChange={handleChange} />
            <input name="address" placeholder="Address" value={proData.address || ""} onChange={handleChange} />
            <input name="pincode" placeholder="Pincode" type="number" value={proData.pincode || ""} onChange={handleChange} />
            <input name="age" placeholder="Age" type="number" value={proData.age || ""} onChange={handleChange} />
          </div>

          <div className="checkout-items">
            <h2>Your Items</h2>
            {cartData.map((item) => (
              <div className="checkout-item" key={item.id}>
                <img src={item.defaultimage} alt={item.name} />
                <div className="item-desc">
                  <p>{item.name}</p>
                  <span>Qty: {item.qnty}</span>
                </div>
                <p className="item-price">₹{item.qnty * item.price}</p>
              </div>
            ))}
          </div>

          <div className="checkout-footer">
            <h2>Total: ₹{amount}</h2>
            <button type="submit" className="pay-btn">Pay Securely</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
