import { useSelector, useDispatch } from "react-redux";
import { proIncrement, proDecrement, itemRemove } from "../cartSlice";
import { useNavigate } from "react-router-dom";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { RiDeleteBin3Fill } from "react-icons/ri";
// import "../css/CartData.css";

const CartData = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.mycart.cart);

  let tPrice = 0;

  return (
    <div className="cart-wrapper">
      <h1 className="cart-title">🛒 Your Shopping Cart</h1>

      <div className="cart-items">
        {cartData.length === 0 ? (
          <p className="empty-cart">Your cart is empty.</p>
        ) : (
          cartData.map((item) => {
            const itemTotal = item.price * item.qnty;
            tPrice += itemTotal;

            return (
              <div key={item.id} className="cart-card">
                <img
                  src={item.defaultimage}
                  alt={item.name}
                  className="cart-img"
                />
                <div className="cart-info">
                  <h3>{item.name}</h3>
                  <p className="desc">{item.description}</p>
                  <span className="category">{item.category}</span>
                  <p className="price">₹{item.price}</p>

                  <div className="quantity-controls">
                    <CiCircleMinus
                      size={32}
                      className="quantity-icon minus"
                      onClick={() => dispatch(proDecrement({ id: item.id }))}
                    />
                    <span className="qnty">{item.qnty}</span>
                    <CiCirclePlus
                      size={32}
                      className="quantity-icon plus"
                      onClick={() => dispatch(proIncrement({ id: item.id }))}
                    />
                  </div>

                  <p className="total">Total: ₹{itemTotal}</p>
                </div>

                <RiDeleteBin3Fill
                  size={28}
                  className="delete-icon"
                  onClick={() => dispatch(itemRemove({ id: item.id }))}
                />
              </div>
            );
          })
        )}
      </div>

      {cartData.length > 0 && (
        <div className="cart-summary">
          <h3>Grand Total: ₹{tPrice}</h3>
          <button
            className="checkout-btn"
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartData;
