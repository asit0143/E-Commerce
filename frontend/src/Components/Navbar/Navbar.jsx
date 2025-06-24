 import React, { useContext, useRef, useState } from 'react'
 import './Navbar.css'
 import logo from '../Assets/Frontend_Assets/BMart.png'
 import cart_icon from '../Assets/Frontend_Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import nav_dropdown from '../Assets/Frontend_Assets/nav_dropdown.png'

 const Navbar = () => {

        const [menu,setMenu] = useState("shop");
        const {getTotalCartItems} = useContext(ShopContext);
        const menuRef = useRef();
        const dropdown_toggle = (e) =>{
            menuRef.current.classList.toggle('nav-menu-visible');
            e.target.classList.toggle('open');
        }
        return (
        <div className="navbar">
            <div className="nav_logo">
                <img src={logo} alt="img"/>
                <p> BazaarMart</p>
            </div>
            <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
            <ul ref={menuRef} className="nav-menu">
                <li onClick={()=>{setMenu("shop")}}><Link style={{textDecoration:'none'}} to='/' >Poducts</Link>{menu==="shop"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("mens")}}><Link style={{textDecoration:'none'}} to='/mens' >Mens</Link>{menu==="mens"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("womens")}}><Link style={{textDecoration:'none'}} to='/womens' >Womens</Link>{menu==="womens"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("kids")}}><Link style={{textDecoration:'none'}} to='/kids' >Kids</Link>{menu==="kids"?<hr/>:<></>}</li>
               {/* <li onClick={()=>{setMenu("Teracotta")}}><Link style={{textDecoration:'none'}} to='/Teracotta' >Teracotta</Link>{menu==="Teracotta"?<hr/>:<></>}</li> */}
            </ul>
            <div className='search-bar'>
            <input type="text" id="search-input" placeholder="Search for products..." name='search'/>
            <i class="fa-solid fa-magnifying-glass"></i>
            </div>
            <div className="nav-login-cart">
                {localStorage.getItem('auth-token')
                ?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>
            : <Link to= '/login'> <button type='button' className="btn btn-outline-primary">Login</button></Link>}
                <Link to= '/cart'><img src={cart_icon} alt="" /></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
        </div>
    );
 }
 
 export default Navbar;
 