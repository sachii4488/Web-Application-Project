import React, { useEffect, useState } from 'react'
import './popular.css'
//import data_product from '../Assests/data'
import Item from "../Item/item.jsx";
const Popular = () => {

  
  const [popularProducts,setPopularProducts] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:4000/popularinwomen').then((response)=>response.json()).then((data)=>setPopularProducts(data))
  },[])



  return (
    <div className='popular'>
        <h1>POPULAR LAPTOPS IN SRI LANKA</h1>
        <hr/>
        <div className="popular-item">
            {popularProducts.map((item,i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>

            })}
        </div>
    </div>
  )
}
export default Popular