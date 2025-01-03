import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProperties } from '../redux/propertiesSlice';
import { useParams } from 'react-router-dom';
import { add } from '../redux/CartSlice';
import { Navbar } from '../components/Navbar';
import { handleSuccess } from '../utlis';
import { ToastContainer } from 'react-toastify';

export const DetailPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { data } = useSelector((state) => state.properties);

    useEffect(() => {
        dispatch(fetchProperties());
    }, [dispatch]);
    const handleAddTocart =()=>{
        dispatch(add(property))
        handleSuccess("Added to cart")
    }


    const property = data.find((el) => el._id === id);

    return (
        <div>
            <Navbar/>
            {property ? (
                <div className='border p-6 mt-16 shadow'>
                    <p className='text-2xl mb-4 text-black text-bold'>Property Name: {property.name}</p>
                    <img src={property.image} alt="Property" />
                    <p>Property Type: {property.type}</p>
                    <p>Owner: {property.owner}</p>
                    <p>Price: {property.price}</p>
                    <p>City: {property.city}</p>
                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    onClick={()=> handleAddTocart()}
                    >Add to Cart</button>
                </div>
            ) : (
                <p>Loading property details...</p>
            )}
            <ToastContainer/>
        </div>
    );
};
