import Carousel from 'react-bootstrap/Carousel';
import ban1 from "../images/banner-1-img/banner-1_1.jpeg";
import ban2 from "../images/banner-1-img/banner-1_2.jpeg";
import ban3 from "../images/banner-1-img/banner-1_3.jpeg";
import { FaCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import img1 from "../images/Hero-section-img/hero-section-img_1.jpeg";
import img2 from "../images/Hero-section-img/hero-section-img_2.jpeg";
import { useState, useEffect } from 'react';
import BackendURL from '../config/BackendURL';
import { FaIndianRupeeSign } from "react-icons/fa6";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { addToCart } from '../cartSlice';

const Home = () => {
  const dispatch = useDispatch();
  const [myData, setMydata] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortOrder, setSortOrder] = useState("default");
  const [reviews, setReviews] = useState([]);  // All reviews
  const navigate = useNavigate();

  // Load products
  const loadData = async () => {
    try {
      const api = `${BackendURL}product/homepage`;
      const response = await axios.get(api);
      setMydata(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Load reviews
  const loadReviews = async () => {
    try {
      const response = await axios.get(`${BackendURL}user/getreviews`);
      setReviews(response.data.review || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
    loadReviews();
  }, []);

  useEffect(() => {
    let data = [...myData];

    if (selectedCategory !== "All") {
      data = data.filter((item) => item.category === selectedCategory);
    }

    data = data.filter(
      (item) => item.price >= priceRange[0] && item.price <= priceRange[1]
    );

    if (sortOrder === "asc") {
      data.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === "desc") {
      data.sort((a, b) => b.name.localeCompare(a.name));
    }

    setFilteredData(data);
  }, [myData, selectedCategory, priceRange, sortOrder]);

  const categories = ["All", ...new Set(myData.map((item) => item.category))];

  const proClick = (id) => {
    navigate(`/prodetail/${id}`);
  };

  // Function to render reviews for each product inside product card
  const renderReviewsForProduct = (productId) => {
    const productReviews = reviews.filter(r => String(r.productid) === String(productId));
    if (productReviews.length === 0) {
      return <p style={{ fontStyle: "italic", color: "#999", marginTop: "8px" }}>No reviews yet for this product.</p>;
    }
    return productReviews.map((review) => (
      <div
        key={review._id}
        style={{
          borderTop: "1px solid #ddd",
          paddingTop: "8px",
          marginTop: "8px",
          backgroundColor: "#fafafa",
          borderRadius: "6px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.1)"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
          <strong style={{ color: "#333" }}>{review.userName}</strong>
          <span style={{ color: "#e07a5f", fontWeight: "600" }}>Rating: {review.rating} / 5</span>
        </div>
        <p style={{ color: "#555", fontSize: "0.9rem" }}>{review.review}</p>
      </div>
    ));
  };

  return (
    <>
      <Carousel>
        <Carousel.Item>
          <img src={ban1} alt="" style={{ width: "100%", height: "500px" }} />
        </Carousel.Item>
        <Carousel.Item>
          <img src={ban3} alt="" style={{ width: "100%", height: "500px" }} />
        </Carousel.Item>
        <Carousel.Item>
          <img src={ban2} alt="" style={{ width: "100%", height: "500px" }} />
        </Carousel.Item>
      </Carousel>

      <section className="hero-section">
        <div className="hero-sec">
          <div className="hero-images">
            <img src={img1} alt="Hero 1" />
          </div>
          <div className="buttons">
            <ul>
              {[...Array(5)].map((_, i) => (
                <li key={`circle1-${i}`}><Link to="#"><FaCircle /></Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hero-sec">
          <div className="hero-images">
            <img src={img2} alt="Hero 2" />
          </div>
          <div className="buttons">
            <ul>
              {[...Array(5)].map((_, i) => (
                <li key={`circle2-${i}`}><Link to="#"><FaCircle /></Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hero-sec sec">
          <div className="hero-images A">
            <button><Link to="/men" className="a">MENS FOOTWEAR</Link></button>
            <button><Link to="/women" className="a">WOMENS FOOTWEAR</Link></button>
          </div>
          <div className="buttons">
            <ul>
              {[...Array(2)].map((_, i) => (
                <li key={`circle3-${i}`}><Link to="#"><FaCircle /></Link></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FILTER SECTION */}
      <div className="filter-container">
        <div className="filter-group">
          <label>Sort By Name:</label>
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="default">Default</option>
            <option value="asc">A to Z</option>
            <option value="desc">Z to A</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Category:</label>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Price Range:</label>
          <input
            type="range"
            min="0"
            max="5000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, Number(e.target.value)])}
          />
          <span>₹0 - ₹{priceRange[1]}</span>
        </div>
      </div>

      <section className="product-section">
        <div className="product-section-tittle">BUY FROM POPULAR CATALOGUE</div>
        <div className="product-context">
          {filteredData.map((product) => (
            <div className="product-card" key={product._id}>
              <a href="#" className="product-image">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  onClick={() => proClick(product._id)}
                  onMouseOver={(e) => {
                    if (product.images[1]) e.target.src = product.images[1];
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.src = product.images[0];
                  }}
                />
              </a>
              <div className="context-details">
                <a href="#" className="product-name">{product.name}</a>
                <a href="#" className="product-desc">{product.description}</a>
                <a href="#" className="product-cat">{product.category}</a>
                <div className="price-section">
                  <span className="rs current-price">
                    <FaIndianRupeeSign />{product.price}
                  </span>
                  <div className="context-discount">
                    <span className="mrp">MRP</span>
                    <span className="line-through">
                      <FaIndianRupeeSign />{(product.price * 2) + 1}
                    </span>
                    <span className="discount">-50%</span>
                  </div>
                </div>

                {/* Insert review section here */}
                {renderReviewsForProduct(product._id)}

                <button
                  className="add-to-cart-btn"
                  onClick={() => {
                    dispatch(addToCart({
                      id: product._id,
                      name: product.name,
                      description: product.description,
                      price: product.price,
                      category: product.category,
                      images: product.images,
                      defaultimage: product.defaultimage,
                      qnty: 1
                    }));
                  }}
                >
                  🛒 Add to Cart
                </button>

              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
