import React, { useEffect, useState, useRef } from "react";
import { ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchProperties } from "../redux/propertiesSlice";

export const Home = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState();
  const dropdownRef = useRef();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.properties);
  const [itemsToDisplay, setitemsToDisplay] = useState(data);
  const [fileredData, setFilteredData] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);

  useEffect(() => {
    dispatch(fetchProperties());
    setitemsToDisplay(data);
  }, [dispatch]);
  useEffect(() => {
    setitemsToDisplay(data);
  }, [data]);

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = (e) => {
    if (!dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeDropdown);
    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);
  useEffect(() => {
    let filteredItems = data;

    // Filter by Type if selected
    if (selectedType) {
      filteredItems = filteredItems.filter(item => item.type.toLowerCase() === selectedType);
    }

    // Filter by Price Range if selected
    if (selectedPriceRange) {
      if (selectedPriceRange === '>=100000') {
        filteredItems = filteredItems.filter(item => item.price >= 100000);
      } else if (selectedPriceRange === '<10000000') {
        filteredItems = filteredItems.filter(item => item.price < 10000000);
      }
    }

    setitemsToDisplay(filteredItems);
  }, [selectedType, selectedPriceRange, data]);

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-20 text-red-500">Error: {error}</div>;
  }
  // const itemsToDisplay = fileredData.length > 0 ? fileredData : data;
  // const handleFilter = (criteria) => {
  //   let filteredItems = [];
  //   if (criteria === '>=100000') {
  //     filteredItems = data.filter((item) => item.price >= 100000);
  //   } else if (criteria === '<10000000') {
  //     filteredItems = data.filter((item) => item.price < 10000000);
  //   }
  //   console.log(filteredItems,"filteredItems")
  //   setitemsToDisplay(filteredItems);
  // };

  // const filterByType =(type)=>{
  //   let filteredItems = [];
  //     filteredItems = data.filter((item) => item.type.toLowerCase() === type);
  //     setitemsToDisplay(filteredItems);

  // }

  // const applyFilters = () => {
  //   let filteredItems = data;

  //   // Filter by Type if selected
  //   if (selectedType) {
  //     filteredItems = filteredItems.filter(item => item.type.toLowerCase() === selectedType);
  //   }

  //   // Filter by Price Range if selected
  //   if (selectedPriceRange) {
  //     if (selectedPriceRange === '>=100000') {
  //       filteredItems = filteredItems.filter(item => item.price >= 100000);
  //     } else if (selectedPriceRange === '<10000000') {
  //       filteredItems = filteredItems.filter(item => item.price < 10000000);
  //     }
  //   }

  //   setitemsToDisplay(filteredItems);
  // };
  // const handleTypeFilter = (type) => {
  //   setSelectedType(type);
  //   applyFilters();
  // };

  // const handlePriceFilter = (priceRange) => {
  //   setSelectedPriceRange(priceRange);
  //   applyFilters();
  // };

  // This useEffect will trigger the filtering whenever selectedType or selectedPriceRange changes

  console.log(itemsToDisplay, "+++++");

  const handleTypeFilter = (type) => {
    setSelectedType(type);
  };

  const handlePriceFilter = (priceRange) => {
    setSelectedPriceRange(priceRange);
  };

  const resetFilters = () => {
    setSelectedType(null);
    setSelectedPriceRange(null);
    setitemsToDisplay(data);  // Show all items
  };
  const handleNavigationTodetails = (id) => {
    console.log(id)
    navigate(`/details/${id}`);
  }


  return (
    <>
      <Navbar />
      <div className="flex  mt-20"> </div>
      <div className="text-start text-blue-700">Welcome back ! {loggedInUser}</div>
      <div className="text-center">
        <div className="relative inline-block mt-6" ref={dropdownRef}>

          <div className="flex text-center">
            <button onClick={() => handleTypeFilter("flat")} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Flat</button>

            <button onClick={() => handleTypeFilter("bungalow")} type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Bungalow</button>
            <button type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Residential Land</button>
            <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={() => handleTypeFilter("commercial")}>Commercial Land</button>
            <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Shop</button>
            <button type="button" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" onClick={() => resetFilters()}>Reset</button>
          </div>
          <button
            id="dropdownDefaultButton"
            onClick={toggleDropdown}
            className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center"
          >
            Filter Prices
            <svg
              className="w-2.5 h-2.5 ms-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          {isOpen && (
            <div
              id="dropdown"
              className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 mt-2"
            >
              <ul className="py-2 text-sm text-gray-700">
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => handlePriceFilter('>=100000')}
                  >
                    Greater than or equal to ₹100,000
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => handlePriceFilter('<10000000')}
                  >
                    Less than ₹10,000,000
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-12 gap-6">
        {itemsToDisplay.length == 0 ?
          (
            <h1 className="text-2xl">No Properties found </h1>
          )
          :
          (
            itemsToDisplay.map((el, index) => (
              <div
                key={index}
                className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800"
              >
                <a href="#">
                  <img className="rounded-t-lg" src={el.image} alt={el.name} />
                </a>
                <div className="p-5">
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                      {el.name}
                    </h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-700">Owner: {el.owner}</p>
                  <p className="mb-3 font-normal text-gray-700">City: {el.city}</p>
                  <p className="mb-3 font-normal text-gray-700">Price: {el.price}</p>
                  <p className="mb-3 font-normal text-gray-700">Type: {el.type}</p>
                  <button
                    onClick={() => handleNavigationTodetails(el._id)}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800"
                  >
                    Buy
                  </button>
                  <Link
                    to="/"
                    className="ml-4 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  >
                    Rent
                  </Link>
                </div>
              </div>
            ))
          )

        }
      </div>
      <ToastContainer />
    </>
  );
};
