import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation  } from 'react-router-dom';
import { toast , ToastContainer  } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setData,setCurrentPage,  setRowsPerPage, setTotalPages } from '../../Redux/stateSlice';
import {setCountryData} from '../../Redux/dropcountry'
const StateContext = createContext();

export const StateProvider = ({ children }) => {
    const dispatch = useDispatch();

   
    
    const fetchstate = async (page, limit) => {
      try {
        const response = await fetch('http://localhost:8000/state/getstatedata', {
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
        if ('data' in result && 'pagination' in result) {
            const { data, pagination } = result;
            dispatch(setData({ data, pagination }));
        } else {
          console.error('Invalid response structure:', result);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }

    };
    
    const fetchCountryData = async () => {
      try {
        const response = await fetch('http://localhost:8000/state/getcountrydata');
        const result = await response.json();
  
        if ('data' in result) {
          dispatch(setCountryData((result.data)));
        } else {
          console.error('Invalid response structure:', result);
        }
      } catch (error) {
        console.error('Error fetching country data:', error);
      }
    };

    const handleStateUpdate = async (stateid, statename, countryid) => {
      try {
        const response = await fetch('http://localhost:8000/state/stateupdate', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ stateid, statename, countryid }),
        });
    
        if (response.ok) {
          //console.log("Updated successfully");
          toast.success(`${statename} updated successfully`)
          // Check if the content type is JSON before trying to parse
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            // Continue processing the parsed data if needed
            console.log("Data:", data);
          }
        } else {
          toast.error(` error updating ${statename}`)
          console.error(`HTTP error! Status: ${response.status}`);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    
    
    const addState = async (statename, countryid) => {


      try {
        const duplicateCheckResponse = await fetch('http://localhost:8000/state/checkDuplicateState', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            stateName: statename,
          }),
        });
    
        const duplicateCheckResult = await duplicateCheckResponse.json();
    
        if (duplicateCheckResult.isDuplicate) {
          // Show a toast or handle duplicate city name
          toast.error('State with the same name already exists');
          return null; // Return null to indicate failure due to duplicate city name
        }

        const response = await fetch('http://localhost:8000/state/addstate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ statename, countryid }),
        });
  
        if (response.ok) {
          const data = await response.json();
          // Update state or handle the response as needed
          toast.success(`${statename} inserted successfully`)
        } else {
          console.error('Failed to add state:', response.status);
          toast.error(`error inserting ${statename}`)
        }
      } catch (error) {
        toast.error(`${statename} already exists`)
        console.error('Error adding state:', error.message);
        // Handle the error
      }
    };

    const deleteState = async (stateId) => {
      try {
        // Make your API call to delete the state
        const response = await fetch('http://localhost:8000/state/deletestate', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ stateid: stateId }),
        });
  
        if (response.ok) {
          toast.success(`removed successfully`)
        } else {
          toast.error(`error removing data`)
          console.error('Failed to delete state');
        }
      } catch (error) {
        console.error('Error deleting state:', error);
      }
    };
    
    const searchStateData = async (search) => {
      try {
        const response = await fetch('http://localhost:8000/state/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ search }),
        });
    
        if (response.ok) {
          const data = await response.json();
          console.log(data.result);
    
          // Assuming that the API response provides pagination information
          const { totalPages, count, result } = data;
          const totalCount = parseInt(data.result.length, 10);
          dispatch(
            setData({
              data: result,
              pagination: {
                totalPages: totalPages || 1, // Set a default if totalPages is not provided
                count: totalCount || 0, // Set a default if count is not provided
              },
            })
          );
        } else {
          console.error(`HTTP error! Status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error during state search:', error);
      }
    };

    const sortState = async (page, limit, sortOrder,tablename, columnname) => {
      console.log(page, limit, sortOrder,tablename, columnname)
      try {
        const response = await fetch(`http://localhost:8000/state/sort/${tablename}`, {
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
          dispatch(setData({ data, pagination }));
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
    <StateContext.Provider value={{sortState,fetchstate,fetchCountryData ,handleStateUpdate,addState,deleteState,searchStateData}}>
    {children}
    </StateContext.Provider>
    );
};

export const useStateContext = () => {
  return useContext(StateContext);
};