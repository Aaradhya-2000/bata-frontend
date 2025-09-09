import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ThanksForShopping = () => {
  const [loading, setLoading] = useState(true);

  // Simulate loading (e.g., order processing) for 2.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="thanks-section">
      <div className={`thanks-container ${loading ? "loading" : "loaded"}`}>
        {loading ? (
          <div className="loader-wrapper" aria-label="Loading order confirmation">
            <div className="loader"></div>
            <p className="loading-text">Processing your order...</p>
          </div>
        ) : (
          <>
            <h1 className="thanks-title">Thank You for Shopping With Us!</h1>
            <p className="thanks-message">
              Your order has been successfully placed. We appreciate your trust and look forward to serving you again.
            </p>
            <Link to="/" className="btn-primary">
              Continue Shopping
            </Link>
          </>
        )}
      </div>
    </section>
  );
};

export default ThanksForShopping;
