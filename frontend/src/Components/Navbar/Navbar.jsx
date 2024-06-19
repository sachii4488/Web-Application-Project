import React, { useState } from "react";  
import "./Navbar.css";
import logo from "../Assests/logo.png"
import cart_icon from "../Assests/cart_icon.png"    
import { Link } from "react-router-dom";

const Navbar = () => {     
    
    const[menu,setMenu] = useState("shop")
    return (
        <div className="navbar">
            <div className="nav-logo">
                <img src={logo} alt="logo" />
                <p>SHOPPER</p>
                </div>
                <ul className="nav-menu">
                    <li onClick={()=>{setMenu("shop")}}><Link to ='/'>Shop</Link>{menu==="shop"?<hr/>:<></>}</li>
                    <li onClick={()=>{setMenu("mens")}}><Link to ='/mens'>Men</Link>{menu==="mens"?<hr/>:<></>}</li>
                    <li onClick={()=>{setMenu("womens")}}><Link to='/womens'>Women</Link>{menu==="womens"?<hr/>:<></>}</li>
                    <li onClick={()=>{setMenu("kids")}}><Link to='/kids'>Kid</Link>{menu==="kids"?<hr/>:<></>}</li>
                    </ul>

<div className="nav-login-cart">
    <Link to='/login'><button>Login</button></Link>
    <Link to='/cart'><img src={cart_icon} alt="cart" /></Link>
    <div className="nav-cart-count"></div>
        </div>
        </div>
    )
    }
    export default Navbar;