// App.jsx
import './css/dashboard.css';
import './App.css';
import './responsive.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './layout';
import Home from './Pages/home';
import AdminDashboard from './admin/adminDashBoard';
import AdminDashHome from './admin/adminDashHome';
import AddProduct from './admin/addProduct';
import LoginForm from './admin/AdminLogin';
import CartData from './Pages/cartdata';
import Signup from './components/signup';
import Login from './components/login';
import Checkout from './Pages/checkoutpage';
import OurProducts from './admin/OurProduct';
import ProDetail from './Pages/proDetails';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useState, useEffect } from 'react';
import loaderImage from './images/Logo/logo_1.jpeg'; // ✅ Correct import
import SearchBar from './Pages/Search';
import Mens from './Pages/mens';
import Womens from './Pages/womens';
import OurOrder from './Pages/YourOrder';
import ProductList from './admin/productList';
import ThanksForShopping from './Pages/thanksPage';


function App() {
  const [showLoader, setShowLoader] = useState(true);
  const [dotCount, setDotCount] = useState(1);

  useEffect(() => {
    const loaderTimeout = setTimeout(() => {
      setShowLoader(false);
    }, 4000);

    const dotInterval = setInterval(() => {
      setDotCount((prev) => (prev % 3) + 1);
    }, 500);

    return () => {
      clearTimeout(loaderTimeout);
      clearInterval(dotInterval);
    };
  }, []);

  if (showLoader) {
    return (
      <div className="loader-container">
        <img src={loaderImage} alt="Logo" className="loader-logo" />
        <div className="loading-text">Loading{'.'.repeat(dotCount)}</div>
      </div>
    );
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path='login' element={<Login />} />
        <Route path='adminlogin' element={<LoginForm />} />
        <Route path='thanks' element={<ThanksForShopping />} />
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='home' element={<Home />} />
            <Route path='orders' element={<OurOrder/>}/>
           
            <Route path='cartdata' element={<CartData />} />
            <Route path="prodetail/:id" element={<ProDetail />} />
            <Route path='signup' element={<Signup />} />
          
            <Route path='checkout' element={<Checkout />} />
           

            <Route path='search' element={<SearchBar/>} />
            <Route path='men' element={<Mens/>} />
            <Route path='women' element={<Womens/>} />

          </Route>

          <Route path='/dashboard' element={<AdminDashboard />}>
            <Route index element={<AdminDashHome />} />
            <Route path='addPro' element={<AddProduct />} />
            <Route path='ourpro' element={<OurProducts />} />
            <Route path='prolist' element={<ProductList />} />

          </Route>
        </Routes>
      </BrowserRouter>

      <ToastContainer />
    </>
  );
}

export default App;
