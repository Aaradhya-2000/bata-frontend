import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/Logo/logo_1.jpeg";

import { IoMdHome } from "react-icons/io";
import { FaUserAlt, FaShoppingCart, FaBars, FaRupeeSign } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { IoMdSearch } from "react-icons/io";

import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const navigate = useNavigate();
  const cartData = useSelector((state) => state.mycart.cart);
  const cartLength = cartData.length;
  const Token = localStorage.getItem("token");

  const [topMenuOpen, setTopMenuOpen] = useState(false);
  const [bottomMenuOpen, setBottomMenuOpen] = useState(false);

  const toggleTopMenu = () => setTopMenuOpen((prev) => !prev);
  const toggleBottomMenu = () => setBottomMenuOpen((prev) => !prev);

  // Close menus on link click
  const closeMenus = () => {
    setTopMenuOpen(false);
    setBottomMenuOpen(false);
  };

  return (
    <header className="hero">
      <nav>
        {/* Navbar-1 */}
        <div className="navbar-1">
          <img src={logo} alt="Logo" className="logo" />

          {/* Hamburger for navbar-1 */}
          <button
            className={`hamburger top-hamburger ${topMenuOpen ? "open" : ""}`}
            onClick={toggleTopMenu}
            aria-label="Toggle top menu"
          >
            <FaBars />
          </button>

          <ul className={`top-menu ${topMenuOpen ? "open" : ""}`}>
            <li>
              <div className="nav-icons">
                <IoMdHome style={{ fontSize: "25px" }} />
                <Link to="home" className="a" onClick={closeMenus}>
                  Home
                </Link>
              </div>
            </li>

            <li>
              <div className="nav-icons">
                <IoMdSearch style={{ fontSize: "25px" }} />
                <Link className="a" to="search" onClick={closeMenus}>
                  Search
                </Link>
              </div>
            </li>

            <li>
              <div className="nav-icons">
                <CiHeart style={{ fontSize: "25px" }} />
                <Link to="/orders" className="a" onClick={closeMenus}>
                  Orders
                </Link>
              </div>
            </li>
            <li>
              <div className="nav-icons">
                {/* <CiHeart style={{ fontSize: "25px" }} /> */}
                <Link to="/adminlogin" className="a" onClick={closeMenus}>
                  Admin Login
                </Link>
              </div>
            </li>

            <li className="cart-menu-item">
              <div className="nav-icons">
                <FaShoppingCart
                  style={{ fontSize: "25px", cursor: "pointer" }}
                  onClick={() => {
                    navigate("/cartdata");
                    closeMenus();
                  }}
                />
                <p>{cartLength}</p>
                <Link
                  className="a"
                  onClick={() => {
                    if (!Token) {
                      toast.warning("You need To Login First");
                    } else {
                      navigate("/cartdata");
                    }
                    closeMenus();
                  }}
                >
                  {localStorage.getItem("name")} Cart
                </Link>
              </div>
            </li>

            <li>
              <div className="nav-icons">
                {Token ? (
                  <>
                    <IoIosLogOut
                      style={{ fontSize: "25px", cursor: "pointer" }}
                      onClick={() => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("name");
                        localStorage.removeItem("pincode");
                        localStorage.removeItem("email");
                        toast.success("Logged out successfully");
                        navigate("/login");
                        closeMenus();
                      }}
                    />
                    <Link
                      onClick={() => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("name")
                        toast.success("Logged out successfully");
                        navigate("/login");
                        closeMenus();
                      }}
                    >
                      Logout
                    </Link>
                  </>
                ) : (
                  <>
                    <FaUserAlt style={{ fontSize: "25px" }} />
                    <Link className="a" to="/login" onClick={closeMenus}>
                      Login
                    </Link>
                  </>
                )}
              </div>
            </li>
          </ul>
        </div>

        {/* Navbar-2 */}
        <div className="navbar-2">
          {/* Hamburger for navbar-2 */}
          <button
            className={`hamburger bottom-hamburger ${bottomMenuOpen ? "open" : ""}`}
            onClick={toggleBottomMenu}
            aria-label="Toggle bottom menu"
          >
            <FaBars />
          </button>

          <ul className={`bottom-menu ${bottomMenuOpen ? "open" : ""}`}>
            <li>
              <Link to="/" className="a" onClick={closeMenus}>
                SNEAKER STUDIO
              </Link>
            </li>
            <li>
              <Link to="/men" className="a" onClick={closeMenus}>
                MEN
              </Link>
            </li>
            <li>
              <Link to="/women" className="a" onClick={closeMenus}>
                WOMEN
              </Link>
            </li>
            <li>
              <Link to="/kids" className="a" onClick={closeMenus}>
                KIDS
              </Link>
            </li>
            <li>
              <Link to="/apparels" className="a" onClick={closeMenus}>
                APPARELS
              </Link>
            </li>
            <li>
              <Link to="/collections" className="a" onClick={closeMenus}>
                COLLECTIONS
              </Link>
            </li>
            <li>
              <Link to="/sale" className="a" onClick={closeMenus}>
                SALE
              </Link>
            </li>
            <li>
              <Link to="/brands" className="a" onClick={closeMenus}>
                BRANDS
              </Link>
            </li>
          </ul>
        </div>

        {/* Slider/Promo Message */}
        <div className="slider">
          <span>
            Free Home Delivery On Order Worth <FaRupeeSign style={{ fontSize: "17px" }} />
            699
          </span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
