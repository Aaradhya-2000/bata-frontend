import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, proIncrement, proDecrement } from "../cartSlice";
import BackendURL from "../config/BackendURL";

import { FaHeart, FaMinus, FaPlus } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import { BsBagFill } from "react-icons/bs";

// import "../css/ProductDetail.css"; // ✅ custom CSS

const ProDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [pro, setPro] = useState({});
  const [myImage, setMyImage] = useState("");

  const cartItems = useSelector((state) => state.mycart.cart);
  const currentItem = cartItems.find((item) => item.id === pro.id);

  const loadData = async () => {
    try {
      const api = `${BackendURL}product/prodetails/?id=${id}`;
      const response = await axios.get(api);
      setPro(response.data);
      setMyImage(response.data.defaultimage);
    } catch (error) {
      console.error("Failed to load product details:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  return (
    <section className="product-details">
      <div className="product-img">
        <div className="zoom-container">
          <img src={myImage} alt="product" className="zoom-image" />
        </div>

        <div className="product-more-imgs">
          {pro.images?.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`product-${index}`}
              className="thumbnail-img"
              onMouseEnter={() => setMyImage(img)}
            />
          ))}
        </div>
      </div>

      <div className="product-img-content">
        <div className="product-content">
          <h1>{pro.name}</h1>

          <div className="product-info">
            <span className="product-order">
              <BsBagFill /> 154 Orders
            </span>
            <span className="stock-text">In Stock</span>
          </div>

          <div className="price">
            <span className="price-amount">₹{pro.price}</span>
            <span className="price-unit"> / per item</span>
          </div>

          <p className="details">{pro.description}</p>
          <p className="details">Category: {pro.category}</p>

          {/* Quantity Section */}
          {currentItem && (
            <div className="quantity-control">
              <label>Quantity</label>
              <div className="quantity-buttons">
                <button
                  className="qty-btn"
                  onClick={() => dispatch(proDecrement({ id: pro.id }))}
                >
                  <FaMinus />
                </button>
                <input type="text" value={currentItem.qnty} readOnly />
                <button
                  className="qty-btn"
                  onClick={() => dispatch(proIncrement({ id: pro.id }))}
                >
                  <FaPlus />
                </button>
              </div>
            </div>
          )}

          <hr />

          <div className="action-btns">
            <button className="buy-now">Buy Now</button>

            {!currentItem && (
              <button
                className="add-to-cart"
                onClick={() =>
                  dispatch(
                    addToCart({
                      id: pro.id,
                      name: pro.name,
                      desc: pro.description,
                      category: pro.category,
                      price: pro.price,
                      images: pro.images,
                      qnty: 1,
                      defaultimage: pro.defaultimage,
                    })
                  )
                }
              >
                <FaBagShopping /> Add to Cart
              </button>
            )}

            <button className="save">
              <FaHeart /> Save
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProDetail;
