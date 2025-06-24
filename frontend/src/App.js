import React from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCatagory from './Pages/ShopCatagory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Footer from './Components/Footer/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import men_banner from './Components/Assets/Frontend_Assets/banner_mens.png';
import women_banner from './Components/Assets/Frontend_Assets/banner_women.png';
import kid_banner from './Components/Assets/Frontend_Assets/banner_kids.png';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Routes>
          <Route path='/' element={<Shop/>}/>
          <Route path='/mens' element={<ShopCatagory banner={men_banner} category="men"/>}/>
          <Route path='/womens' element={<ShopCatagory banner={women_banner} category="women"/>}/>
          <Route path='/kids' element={<ShopCatagory banner={kid_banner} category="kid"/>}/>
          <Route path='/Teracotta' element={<ShopCatagory banner={kid_banner} category="tera"/>}/>
          <Route path="/product" element={<Product/>}>
            <Route path=':productId' element={<Product/>}/>
          </Route>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/login' element={<LoginSignup/>}/>
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
