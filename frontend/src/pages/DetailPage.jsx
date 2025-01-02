import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProperties } from '../redux/propertiesSlice';
import { useParams } from 'react-router-dom';


export const DetailPage = () => {
    const {id} = useParams();
    const [itemsToDisplay,setitemsToDisplay] = useState();
    const { data } = useSelector((state) => state.properties);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProperties());
        const property = data.filter((el)=>el.id === id);
        console.log(property);
        setitemsToDisplay(property);
    }, [dispatch]);

    return (
        <div>DetailPage</div>
    )
}
