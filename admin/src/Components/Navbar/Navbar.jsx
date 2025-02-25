import React from 'react'
import './Navbar.css'
//import navlogo from '../../assets/nav-logo.svg';
import navlogo from '../../assets/Logo2.png';

//import navProfile from '../../assets/nav-profile.svg';
import navProfile from '../../assets/SachiProfile.jpeg';



const Navbar = () => {
    
  return (
    <div className='navbar'>
        <img src={navlogo} alt='' className="nav-logo"  />
        <img src={navProfile} className='nav-profile' alt='' />
    
    </div>
  )
}

export default Navbar