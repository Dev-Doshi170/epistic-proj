// CountryContext.js
import React, { createContext, useContext, useState } from 'react';
import { useLocation  } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const CountryContext = createContext();




export const CountryProvider = ({ children }) => {
    const location = useLocation();
    const [countryData, setCountryData] = useState([]);
    const [totalPage, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(1);

    const fetchDataFromApi = async (page, limit) => {
      try {
        const response = await fetch('http://localhost:8000', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            page,
            limit,
          }),
        });
    
        const result = await response.json();
    
        // Check if the 'data' property exists in the response
        if ('data' in result && 'pagination' in result) {
          const { data, pagination } = result;
          setCountryData(data);
          setTotalPages(pagination.totalPages);
          setCurrentPage(pagination.currentPage);
          setCount(pagination.totalCount)
        } else {
          console.error('Invalid response structure:', result);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    
const deleteDataFromApi = async (id) => {
    try {
        const response = await fetch(`http://localhost:8000/countrydelete/${id}`, {
            method: 'DELETE',
        });
        
        if (response.ok) {
            
            const data = await response.text();
            const parsedData = data ? JSON.parse(data) : null;
            
            if (parsedData) {
                setCountryData(parsedData);
            }
        } 
    } catch (error) {
        console.error('Error deleting data:', error);
    }
};

const insertData = async (newData) => {
  try {
    const duplicateCheckResponse = await fetch('http://localhost:8000/checkDuplicateCountry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          countryName:  newData.countryname,
        }),
      });
  
      const duplicateCheckResult = await duplicateCheckResponse.json();
  
      if (duplicateCheckResult.isDuplicate) {
        // Show a toast or handle duplicate city name
        toast.error('Country with the same name already exists');
        return null; // Return null to indicate failure due to duplicate city name
      }

      const response = await fetch('http://localhost:8000/addcountry', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              countryName: newData.countryname,
              countryCode: newData.countrycode,
              phoneCode: newData.phonecode,
          }),
      });

      if (response.ok) {
          const data = await response.json();
          console.log(data)
          if (data.finalStatus === 'success') {
            console.log("hii")
            toast.success("Country is Added");
          } else if (data.message === 'Country already exists.') {
            toast.error("Country already exists");
          } else {
            toast.success("Country is Added");
          }
        } else {
          toast.error("Failed to add country. Please try again.");
        }
      
  } catch (error) {
      console.error('Error saving data:', error);
  }
};


  const updateData = async (updatedCountry) => {
    console.log("insidecontext",updatedCountry)
    try {
      const response = await fetch('http://localhost:8000/countryupdate', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          countryname : updatedCountry.countryname,
          countrycode : updatedCountry.countrycode,
          phonecode : updatedCountry.phonecode,
          countryid : updatedCountry.countryid,}),
      });

      if (response.ok) {
        fetchDataFromApi(currentPage,4);
      } 
      
    } catch (error) {
      console.error('Error updating country:', error);
    }
  };

  const filterData = async (tableName,searchData) => {
    
    try {
      const locationSearch = new URLSearchParams(location.search);

      // Set default values if the corresponding query parameters are not present
      // const searchParam = locationSearch.get('search') || '';
      // const codeParam = locationSearch.get('code') || '';
      // const limitParam = locationSearch.get('limit') || '';
      // const pageParam = locationSearch.get('page') || '';

      let response

      if(searchData.search) {
        response = await fetch(
          `http://localhost:8000/api/pagination/${tableName}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              search: searchData.search,
              limit: searchData.limit,
              page: searchData.page
            })
          }

        );
        
      } 
      else {
        response = await fetch(
          `http://localhost:8000/api/pagination/${tableName}?`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              code: searchData.code,
              limit: searchData.limit,
              page: searchData.page

            })
          }
        );
      }

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setCountryData(data.result);
    } catch (error) {
      console.error(`Error fetching data:', error.message`);
    }
  };

  const sort = async (page, limit, sortOrder,tablename , columnname) => {
    try {
      const response = await fetch(`http://localhost:8000/sort/sort/${tablename}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          page,
          limit,
          sortOrder,
          columnname,
        }),
        
      });
      const result = await response.json();
      if ('data' in result && 'pagination' in result) {
        const { data, pagination } = result;
        setCountryData(data);
        setTotalPages(pagination.totalPages);
        setCurrentPage(pagination.currentPage);
      } else {
        console.error('Invalid response structure:', result);
      }
      console.log(result)
  
      // Rest of the function remains the same
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  

return (
    <CountryContext.Provider value={{sort,count,totalPage,setCurrentPage, countryData,currentPage, fetchDataFromApi, deleteDataFromApi ,insertData ,updateData,filterData }}>
    {children}
    <ToastContainer />
    </CountryContext.Provider>
    );
};

export const useCountryContext = () => {
  return useContext(CountryContext);
};