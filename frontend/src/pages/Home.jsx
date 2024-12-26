import React, { useEffect, useState } from 'react'
import { handleError, handleSuccess } from '../utlis';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


export const Home = () => {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'))

  }, [])
  const handleLogout = () => {
    handleSuccess("User Logged Out Successfully");
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    setTimeout(() => {
      navigate('/login')
    })
  }

  const fetchProducts = async () => {
    try {
      const headers = {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      }
      const url = "http://localhost:8080/products";
      const response = await fetch(url, headers);
      const result = await response.json();
      console.log("==========",result);
      setProducts(result);
    } catch (err) {
      handleError(err);
      console.log(err)
    }
  }
  useEffect(() => {
    fetchProducts();
  }, [])
  return (
    <>
      <div>{loggedInUser}</div>
      <button onClick={handleLogout} >Logout</button>
      {
        products.map((el,index)=>(
          <ul key={index}>
            <span>{el.name} : {el.price}</span>
          </ul>
        ))
      }
    
      <ToastContainer />
    </>
  )
}
