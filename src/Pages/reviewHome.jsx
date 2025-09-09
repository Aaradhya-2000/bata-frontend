import { useEffect, useState } from "react";
import axios from "axios";
import BackendURL from "../config/BackendURL";

const ReviewSection = ({ productId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const response = await axios.get(`${BackendURL}user/getreviews`);
        const allReviews = response.data.review || [];
        const filteredReviews = allReviews.filter(
          (r) => String(r.productid) === String(productId)
        );
        setReviews(filteredReviews);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };

    loadReviews();
  }, [productId]);

  return (
    <div>
      <h2>Reviews for product {productId}</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet for this product.</p>
      ) : (
        reviews.map((review) => (
          <div key={review._id}>
            <p><strong>{review.userName}</strong></p>
            <p>Rating: {review.rating} / 5</p>
            <p>{review.review}</p>
            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewSection;
