import React, { createContext, useContext } from 'react';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { setCityData} from '../../Redux/citySlice';
import {setStateData } from '../../Redux/modalCitySlice'

const CityContext = createContext();

export const CityProvider = ({ children }) => {
  const dispatch = useDispatch();

  const getCity = async (page,limit) => {

    try {
      const response = await fetch('http://localhost:8000/city/getcity', {
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
      //console.log(result)
      if ('data' in result && 'pagination' in result) {
        const { data, pagination } = result;
        console.log("getcity",data,pagination)
        dispatch(setCityData({data , pagination}))
      } else {
        console.error('Invalid response structure:', result);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchStateData = async (countryName) => {
    try {
      const url = 'http://localhost:8000/city/getstatedata';
      const requestBody = {
        countryname: countryName  // Adjust the property name to match your server expectations
      };
  
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
  
      const result = await response.json();
      console.log(result);
      if ('data' in result) {
        dispatch(setStateData(result.data));
      } else {
        console.error('Invalid response structure:', result);
      }
    } catch (error) {
      console.error('Error fetching state data:', error);
    }
  };

  const addCity = async (countryId, stateId, city) => {
    try {
      // Check for duplicate city name
      const duplicateCheckResponse = await fetch('http://localhost:8000/city/checkDuplicateCity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cityName: city,
        }),
      });
  
      const duplicateCheckResult = await duplicateCheckResponse.json();
  
      if (duplicateCheckResult.isDuplicate) {
        // Show a toast or handle duplicate city name
        toast.error('City with the same name already exists');
        return null; // Return null to indicate failure due to duplicate city name
      }
  
      // Continue with adding the city
      const response = await fetch('http://localhost:8000/city/addcity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          countryId,
          stateId,
          city,
        }),
      });
  
      const result = await response.json();
  
      if ('data' in result) {
        toast.success(`${city} added successfully`);
        return result.data;
      } else {
        console.error('Invalid response structure:', result);
        throw new Error('Invalid response structure');
      }
    } catch (error) {
      console.error('Error adding city:', error);
      throw new Error('Error adding city');
    }
  };
  
  async function updateCity(cityname, cityid, stateid, countryid) {
    console.log(cityid)
    try {
      const updateResponse = await fetch('http://localhost:8000/city/cityupdate', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cityname, cityid, stateid, countryid }),
      });
  
      const updateResult = await updateResponse.json();
  
      console.log('Update response:', updateResponse);
      console.log('Update result:', updateResult);
  
      if (updateResponse.ok) {
        console.log('City updated successfully:', updateResult.data);
        // Show a success toast if needed
        toast.success('City updated successfully');
      } else {
        console.error('Error updating city:', updateResult.error);
        // Show an error toast if needed
        toast.error('City Already Exists');
      }
    } catch (error) {
      console.error('Network error:', error);
      // Show a general error toast if needed
      toast.error('Network error. Please try again.');
    }
  }
  
  

  const deleteCity = async (cityid) => {
    console.log("context",cityid)
  try {
    const url = 'http://localhost:8000/city/deletecity';  // Replace with your actual API URL
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cityid }),
    });

    const result = await response.json();

    if (response.ok) {
      console.log('City deleted successfully:', result.message);
    } else {
      console.error('Failed to delete city:', result.message);
    }
  } catch (error) {
    console.error('Error deleting city:', error);
  }
};

const sortData = async (tablename, page, limit, sortOrder, columnname) => {
  try {
    const url = `http://localhost:8000/city/sort/${tablename}`;  // Replace with your actual API URL
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ page, limit, sortOrder, columnname }),
    });

    const result = await response.json();

    if (response.ok) {
      const { data, pagination } = result;
      console.log('Sorted data:', result);
      dispatch(setCityData({data , pagination}))
    } else {
      console.error('Failed to fetch sorted data:', result.error);
    }
  } catch (error) {
    console.error('Error fetching sorted data:', error);
  }
};

const searchCities = async (searchTerm) => {
  try {
    const url = 'http://localhost:8000/city/search';  // Replace with your actual API URL
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ search: searchTerm }),
    });

    if (response.ok) {
      const result = await response.json();
      const {pagination, data } = result;
      console.log("data",data,"pagination",pagination);
      dispatch(setCityData({data , pagination}))
      return result;
    } else {
      const errorResult = await response.json();
      console.error('Failed to search cities:', errorResult.error);
      return { error: 'Failed to search cities' };
    }
  } catch (error) {
    console.error('Error searching cities:', error);
    return { error: 'Internal Server Error' };
  }
};



  return (
    <CityContext.Provider value={{ getCity,fetchStateData,addCity,updateCity,deleteCity,sortData,searchCities }}>
      {children}
      <ToastContainer />
    </CityContext.Provider>
  );
};

export const useCityContext = () => {
  return useContext(CityContext);
};
