import React from 'react'
import './Sidebar.css'
import{Link} from 'react-router-dom'
import add_product_icon from '../../assets/pet_cart2.png'
import list_product_icon from '../../assets/pet_list.jpg'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Link to={'/addproduct'} style={{TextDecoration:"none"}}>
        <div className="sidebar-item">
            <img src={add_product_icon} alt="" />
            <p>Add Pet</p>
        </div>
        </Link>

        <Link to={'/listproduct'} style={{TextDecoration:"none"}}>
        <div className="sidebar-item">
            <img src={list_product_icon} alt="" />
            <p>Pet List</p>
        </div>
        </Link>


        

    </div>
  )
}

export default Sidebar