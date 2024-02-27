import React, { createContext, useContext, useEffect, useState } from 'react';
import { json, useLocation  } from 'react-router-dom';
import { toast , ToastContainer  } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setData,setCurrentPage,  setRowsPerPage, setTotalPages,setUpdatedData,addData } from '../../Redux/stateSlice';
import {setCountryData} from '../../Redux/dropcountry'
const StateContext = createContext();

export const StateProvider = ({ children }) => {
    const dispatch = useDispatch();

   
    
    const fetchstate = async (page, limit,order,column) => {
      
      try {
        const response = await fetch('http://localhost:8000/state/getstatedata', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            page,
            limit,
            order,
            column,
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
    
        const latestdata = await response.json();

        if(latestdata.error){
          toast.error( `State with the same name already exists in the specified `)
          return latestdata.error
        }

        if (response.ok) {
           // Await the Promise here
          const { updatedstate } = latestdata;
          dispatch(setUpdatedData(updatedstate));
          toast.success(`${statename} updated successfully`);
        } else {
          toast.error(`Error updating ${statename}`);
          console.error(`HTTP error! Status: ${response.status}`);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    

    const addState = async (statename, countryid, page, limit) => {
      //console.log(statename, countryid);
      try {
        const response = await fetch('http://localhost:8000/state/addstate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ statename, 
            countryid,
            page,
            limit,
             }),
        });
        
        const result = await response.json();

        if(result.error){
          toast.error( `State with the same name already exists in the specified `)
          return result.error
        }

        const {data,pagination} = result;
        console.log("hii",data,pagination)
        if (response.ok) {
       
            
            dispatch(addData(result));
          // Update state or handle the response as needed
          toast.success(`${statename} inserted successfully`);
        } else {
          console.error('Failed to add state:', response.status);
          toast.error(`Error inserting ${statename}`);
        }
      } catch (error) {
        toast.error(`Internal server`);
        console.error('Error adding state:', error.message);
        // Handle the error
      }
    };


    const deleteState = async (stateId, page, limit) => {
      try {
        // Make your API call to delete the state
        const response = await fetch('http://localhost:8000/state/deletestate', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ stateid: stateId, page, limit }),
        });
    
        if (response.ok) {
          const result = await response.json();
          console.log('Delete state result:', result);
    
          if (result.error) {
            // Handle the error message here
            toast.error(result.error);
          } else {
            dispatch(setData(result));
            if (result.message) {
              toast.success(result.message);
            } 
          }
        } else {
          toast.error('Error removing state');
          console.error('Failed to delete state');
        }
      } catch (error) {
        toast.error('Error deleting state');
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