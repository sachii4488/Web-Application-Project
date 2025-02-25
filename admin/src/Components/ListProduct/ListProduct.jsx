import React,{useEffect, useState} from 'react';
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png';



const ListProduct = () => {

  const[allProduct, setAllProduct] = useState([]);

const fetchInfo = async () => {
  await fetch('http://localhost:4000/allproduct')
  .then((res) => res.json())
  .then((data) => {setAllProduct(data)});

}

useEffect(() => {
  fetchInfo();
},[])

const remove_Product = async (id) => {
  await fetch('http://localhost:4000/removeproduct',{
    method:'POST',
    headers:{
      Accept:'Application/json',
      'Content-Type':'application/json',
    },
    body:JSON.stringify({id:id})
})
 await fetchInfo();
  
}
  return (
    <div className='list-product'>
      <h1>All Pets List</h1>
      <div className="listproduct-format-main">
        <p>Pets</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allProduct.map((product,index)=>{
          return<><div key={index} className="listproduct-format-main listproduct-format">
              <img src={product.image}alt="" className="listproduct-product-icon" />
              <p>{product.name}</p>
              <p>${product.old_price}</p>
              <p>${product.new_price}</p>
              <p>{product.category}</p>
              <img onClick={()=>{remove_Product(product.id)}} className='listproduct-remove-icon' src={cross_icon}alt="" />
            </div>
            <hr />
            </>
            
            
          
        })}
      </div>
      </div>
  )
}

export default ListProduct