import React, { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import BackendURL from "../config/BackendURL";
import { FaSearch } from "react-icons/fa";
import "../css/SearchBar.css";
import axios from "axios";
import { FaIndianRupeeSign } from "react-icons/fa6";
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
import { addToCart } from '../cartSlice';
import { useNavigate } from "react-router-dom";
const SearchBar = ({ onSearch }) => {
  const [pro, setPro] = useState("");
  const [product,setProduct] = useState([]);
  const navigate  = useNavigate()
  
  const loadData=async(e)=>{
    setPro(e.target.value)
 let api = `${BackendURL}product/homepage`
    const response= await axios.get(api);
    console.log(response.data);
    setProduct(response.data);

}
const proClick = (id)=>{
    navigate(`/prodetail/${id}`)
    // alert(id)

  }
const ans = product.map((key)=>{
    const dispatch = useDispatch()
    const mystr =  key.name.toLowerCase();
    const myproduct = pro.toLocaleLowerCase();
    const status =  mystr.includes(myproduct);
    console.log(status)
    if(status){
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
}
})

  return (
    <>
    <form className="search-bar" >
      <input
        type="text"
        placeholder="Search products, brands, etc..."
        value={pro}
        onChange={loadData}
      />
      <button type="submit">
        <FaSearch />
      </button>
    </form>
    <div className="product-context" style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr'}}>
       {ans}
      </div>
    

</>
    
  );
};

export default SearchBar;
