

import React from "react";
// import "./Footer.css"; // Add or adjust the path based on your project
import payment2 from "../images/Footer-img/payment_2.jpeg";
import payment3 from "../images/Footer-img/payment_3.jpeg";
import { Link } from "react-router-dom";
import { FaTruck, FaBox, FaRotate, FaRupeeSign } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";

import {
    FaInstagram,
    FaFacebook,
    FaYoutube,
    FaPinterest,
    FaLinkedin,
    FaTwitter,
    FaRegCopyright
  } from "react-icons/fa";
const Footer = () => {
  return (
    <>

<section className="above-footer">
      <div className="conatinar">
        <ul>
          <li>
            <div className="order">
              <FaTruck />
              <Link to="#" className="a">
                Free shipping on <br />
                orders <FaRupeeSign id="rupee" />699 and above
              </Link>
            </div>
          </li>
          <li>
            <div className="order">
              <FaBox />
              <Link to="#" className="a">
                Active Store <br />
                orders near you
              </Link>
            </div>
          </li>
          <li>
            <div className="order">
              <FaRotate />
              <Link to="#" className="a">
                No Questions <br />
                Asked Returns
              </Link>
            </div>
          </li>
          <li>
            <div className="order">
              <FaHeart />
              <Link to="#" className="a">
                Bata Club <br />
                Benefit
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </section>
    <footer className="footer-section">
      <div className="footer-top">
        {/* LET US HELP YOU */}
        <div className="help">
          <h3>LET US HELP YOU</h3>
          <ul>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Check/Return Order</a></li>
          </ul>
        </div>

        {/* USEFUL LINK */}
        <div className="help">
          <h3>USEFUL LINK</h3>
          <ul>
            <li><a href="#">Terms and Conditions</a></li>
            <li><a href="#">Connect Us On Wifi</a></li>
            <li><a href="#">Invite Bata Store On Wheels</a></li>
            <li><a href="#">Become Our Partner</a></li>
            <li><a href="#">COVID Safety Guidelines</a></li>
          </ul>
        </div>

        {/* COMPANY */}
        <div className="help">
          <h3>COMPANY</h3>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">BATA Worldwide</a></li>
            <li><a href="#">The BATA Company</a></li>
            <li><a href="#">Press Release</a></li>
            <li><a href="#">CSR</a></li>
            <li><a href="#">Award & Recognition</a></li>
            <li><a href="#">Whistle Blow Policy</a></li>
            <li><a href="#">POSH Policy</a></li>
            <li><a href="#">Investor Relation</a></li>
            <li><a href="#">Careers</a></li>
          </ul>
        </div>

        {/* FOLLOW US */}
        <div className="help">
          <h3>FOLLOW US</h3>
          <div className="follow-icons">
      <a href="#"><FaInstagram /></a>
      <a href="#"><FaFacebook /></a>
      <a href="#"><FaYoutube /></a>
      <a href="#"><FaPinterest /></a>
      <a href="#"><FaLinkedin /></a>
      <a href="#"><FaTwitter /></a>
    </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="footer-bottom">
        <div className="containor">
          <span>Bata India - CIN: L19201WB1931PLC007261</span>
          <div className="card">
            <a href="#"><img src={payment2} alt="Payment Option 1" /></a>
            <a href="#"><img src={payment3} alt="Payment Option 2" /></a>
          </div>
        </div>
        <div className="footer-copy">
          <p>
          <FaRegCopyright style={{ fontSize: "16px", marginRight: "5px" }} />
            &nbsp;2024 BATA BRAND
          </p>
        </div>
      </div>
    </footer>
    </>
  );
};

export default Footer;
