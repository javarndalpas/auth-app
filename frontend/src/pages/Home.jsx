import React, { useEffect, useState } from 'react'
import { handleError, handleSuccess } from '../utlis';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';

import { useDispatch, useSelector } from 'react-redux';
import { fetchProperties } from '../redux/propertiesSlice';


export const Home = () => {

  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState();
  // const [properties, setProperties] = useState([]);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.properties);

  useEffect(() => {
    dispatch(fetchProperties());
    // console.log(data.properties, "=========chirkut mohit");
  }, [dispatch]);


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
if (loading) {
  return <div>Loading...</div>;
}

if (error) {
  return <div>Error: {error}</div>;
}

  // const fetchProducts = async () => {
  //   try {
  //     const headers = {
  //       headers: {
  //         'Authorization': localStorage.getItem('token')
  //       }
  //     }
  //     const url = "http://localhost:8080/products";
  //     const response = await fetch(url, headers);
  //     const result = await response.json();

  //     setProducts(result);
  //   } catch (err) {
  //     handleError(err);
  //     console.log(err);
  //   }
  // }

  // const fetchProperties = async () => {
  //   try {
  //     const url = "http://localhost:8080/properties";
  //     const response = await fetch(url);
  //     const result = await response.json();
  //     setProperties(result.properties);
  //     console.log("==========", properties);
  //   } catch (err) {
  //     handleError(err);
  //     console.log(err)
  //   }
  // }

  // useEffect(() => {
  //   // fetchProducts();
  //   fetchProperties();
  // }, [])

  return (
    <>
    <Navbar/>
      <div>{loggedInUser}</div>
      <button onClick={handleLogout} >Logout</button>
      {/* {
        products.map((el, index) => (
          <ul key={index}>
            <span>{el.name} : {el.price}</span>
          </ul>
        ))
      } */}
      {data &&
        data.map((el, index) => (
          <div key={index}>
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                <img className="rounded-t-lg" src={el.image} alt="" />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Read more
                  <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLineCap="round" strokelinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

        ))

      }
      <ToastContainer />
    </>
  
  )
}
