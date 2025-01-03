import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar } from '../components/Navbar';
import { Link } from 'react-router-dom';
import { remove } from '../redux/CartSlice';

export const Cart = () => {
  const { cartList } = useSelector((state) => state.cartState); 
  console.log(cartList);
  const dispatch = useDispatch();
  
  const handleRemoveFromCart =(id)=>{
    dispatch(remove(id))
  }

  return (
    <>
      <Navbar />
      <div className="mt-20">
        {/* <h1 className='text-xl mt-4 mb-8'>Cart Page</h1> */}
        {cartList && cartList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cartList.map((el, index) => (
              <div key={index} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800"  >
                <a href="#">
                  <img className="rounded-t-lg" src={el.image} alt={el.name} />
                </a>
                <div className="p-5">
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {el.name}
                    </h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Owner: {el.owner}
                  </p>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    City: {el.city}
                  </p>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Price: {el.price}
                  </p>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Type: {el.type}
                  </p>
                  {/* <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800" > Buy </button> */}
                  <button onClick={() => handleRemoveFromCart(el._id) }
                    className="ml-4 text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" > Remove from Cart</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-700 dark:text-gray-300">
            Your cart is empty. Go back to the <Link to="/" className="text-blue-500">home page</Link> to add properties to your cart.
          </p>
        )}
      </div>
    </>
  );
};
