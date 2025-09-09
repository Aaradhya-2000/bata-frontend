
import { useState,useEffect } from "react";
import BackendURL from "../config/BackendURL";
import axios from "axios";

// import Carousel from 'react-bootstrap/Carousel';
// import ban1 from "../images/banner-1-img/banner-1_1.jpeg"
// import ban2 from "../images/banner-1-img/banner-1_2.jpeg"
// import ban3 from "../images/banner-1-img/banner-1_3.jpeg"
import { FaCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
// import img1 from "../images/Hero-section-img/hero-section-img_1.jpeg"
// import img2 from "../images/Hero-section-img/hero-section-img_2.jpeg"
// import { useState,useEffect } from 'react';
// import BackendURL from '../config/BackendURL';
import { FaIndianRupeeSign } from "react-icons/fa6";
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../cartSlice';
const Womens = ()=>{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const[myData,setMydata] =  useState([]);
    const loadData = async()=>{
        let api = `${BackendURL}product/homepageWomen/?category=womens`;
        const response = await axios.get(api);
        console.log(response.data);
        
        setMydata(response.data)
    }
    useEffect(()=>{
        loadData()
    },[])
    const proClick = (id)=>{
        navigate(`/prodetail/${id}`)
        // alert(id)
    
      }
    const ans = myData.map((key)=>{
        return(
          <>
               <div className="product-card">
          <a href="#" className="product-image">
            <img src={key.images[0]} alt={key.name} onClick={()=>{proClick(key._id)}}
            onMouseOver={(e) => {
              if (key.images[0]) e.target.src = key.images[1];
            }}
            onMouseOut={(e) => {
              e.currentTarget.src = key.images[0]; // revert back on mouse out
            }} />
          </a>
    
          <div className="context-details">
            <a href="#" className="product-name">{key.name}</a>
            <a href="#" className="product-desc">{key.description}</a>
            <a href="#" className="product-cat">{key.category}</a>
    
            <div className="price-section">
              <span className="rs current-price">
                <FaIndianRupeeSign />{key.price}
              </span>
              <div className="context-discount">
                <span className="mrp">MRP</span>
                <span className="line-through">
                  <FaIndianRupeeSign />{(key.price*2)+1}
                </span>
                <span className="discount">-50%</span>
              </div>
            </div>
    
            <button className="add-to-cart-btn" onClick={()=>{dispatch(addToCart({id:key._id,name:key.name,description:key.description,price:key.price,category:key.category,images:key.images,defaultimage:key.defaultimage,qnty:1}))}}>
              🛒 Add to Cart
            </button>
          </div>
        </div>
            
          
          </>
        )
      })
    return(
        <>
           {/* <h1>Mens</h1> */}
           <section className="product-section">
      <div className="product-section-tittle" >
        BUY FROM POPULAR CATALOGUE WOMEN
      </div>
      {/* <h1>MENS</h1> */}

      

      <div className="product-context">
       {ans}
      </div>
    </section>
        
        </>
    )
}

export default Womens;