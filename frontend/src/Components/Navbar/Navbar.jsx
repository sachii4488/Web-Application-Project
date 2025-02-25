import React, { useContext,useRef,useState } from "react";  
import "./Navbar.css";
import logo from "../Assests/Logo2.png"
import cart_icon from "../Assests/cart_icon.png"    
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import nav_dropdown from "../Assests/nav_dropdown.png"


const Navbar = () => {     
    
    const[menu,setMenu] = useState("shop")
    const {getTotalCartItems}= useContext(ShopContext);
    const menuRef = useRef();

    const dropdown_toggle = (e) => {
        menuRef.current.classList.toggle("nav_menu_visible");
        e.target.classList.toggle('open');
    }

    return (
        <div className="navbar">
            <div className="nav-logo">
                <img src={logo} alt="logo" />
                <p>Fur Friend Finder</p>
                </div>
                <img className="nav-dropdown" onClick={dropdown_toggle} src={nav_dropdown} alt=""/>
                <ul ref={menuRef} className="nav-menu">
                    <li onClick={()=>{setMenu("shop")}}><Link to ='/'>Shop</Link>{menu==="shop"?<hr/>:<></>}</li>
                    <li onClick={()=>{setMenu("dog")}}><Link to ='/dog'>Dog</Link>{menu==="dog"?<hr/>:<></>}</li>
                    <li onClick={()=>{setMenu("cat")}}><Link to='/cat'>Cat</Link>{menu==="cat"?<hr/>:<></>}</li>
                    <li onClick={()=>{setMenu("bird")}}><Link to='/bird'>Bird</Link>{menu==="bird"?<hr/>:<></>}</li>
                    <li onClick={()=>{setMenu("fish")}}><Link to='/fish'>Fish</Link>{menu==="fish"?<hr/>:<></>}</li>
                    
                    

                    </ul>

<div className="nav-login-cart">
{localStorage.getItem('auth-token')
            ?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>
            :<Link to="/login"><button>Login</button></Link> }
    
    <Link to='/cart'><img src={cart_icon} alt="cart" /></Link>
    <div className="nav-cart-count">{getTotalCartItems()}</div>
        </div>
        </div>
    )
    }
    export default Navbar;