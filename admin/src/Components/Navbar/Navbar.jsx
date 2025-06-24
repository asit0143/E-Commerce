import React from 'react';
import './Navbar.css'
import navlogo from '../../assets/Admin_Assets/nav-logo.svg'
import navprofile from '../../assets/Admin_Assets/nav-profile.svg'

const Navbar = () => {
    return (
        <div className='navbar'>
            <img src={navlogo} alt="" className="nav-logo" />
            <img src={navprofile} className='nav-profile' alt="" />
        </div>
    );
}

export default Navbar;
