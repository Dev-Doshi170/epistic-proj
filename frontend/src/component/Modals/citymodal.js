// import React, { useState, useEffect } from "react";
// import { X } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { closeModal, setSelectedState, setSelectedCountry, setCityName,setSelectedStateId,setSelectedCountryId } from "../../Redux/modalCitySlice";
// import { useStateContext } from "../Context/StateContext";
// import { useCityContext } from "../Context/CityContext";
// import { toast, ToastContainer } from 'react-toastify';

// const CityModal = ({ city }) => {
//   const dispatch = useDispatch();
//   const { fetchCountryData } = useStateContext();
//   const { fetchStateData , addCity,getCity,updateCity} = useCityContext();
//   const initialFormData = {
//     stateId: "",
//     cityName: "",
//     textFieldValue: "",
//   };

//   const [formData, setFormData] = useState(initialFormData);
//   const countryData = useSelector((state) => state.country.countryData);
//   const { data: cities, pagination } = useSelector((state) => state.city);
//   // const stateData = useSelector((state) => state.cityModal.stateData);
//   // const selectedState = useSelector((state) => state.cityModal.selectedState);
//   // const selectedCountry = useSelector((state) => state.cityModal.selectedCountry);
//   // const cityname = useSelector((state) => state.cityModal.cityname);
//   // const setSelectedStateId = useSelector((state) => state.cityModal.setSelectedStateId);
//   const {stateData,selectedState, cityname, selectedCountry,selectedCountryId,selectedStateId,mode,cityId} = useSelector((state) => state.cityModal);


//   useEffect(() => {
//     fetchCountryData();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "country") {

//       const selectedCountry = countryData.find(country => country.countryname === value);
//       if (selectedCountry) {
//         const countryId = selectedCountry.countryid;
//         //console.log(countryId)
//         dispatch(setSelectedCountry(value));
//         dispatch(setSelectedCountryId(countryId))
//       }
      
//     } else if (name === "state") {

//       const selectedState = stateData.find(state => state.statename === value);
//       if (selectedState) {
//         const stateId = selectedState.stateid;
//         //console.log(stateId)
//         dispatch(setSelectedState(value));
//         dispatch(setSelectedStateId(stateId))
//       }
//     } else if (name === "cityname") {
//       dispatch(setCityName(value));
//     }
//   };
  
//   useEffect(() => {
//     //console.log(selectedCountry)
//     if (selectedCountry !== null) {
//       fetchStateData(selectedCountry);
//     }
//   }, [selectedCountry]);

//   const validateForm = () => {
//     // Validate your form here
//   };
  
//   const clickState = () => {
//     // Handle click on state
//   };

//   const handleSave = async() => {

//     if(mode == 'add') {
//       await addCity(selectedCountryId,selectedStateId,cityname)
//     }

//     if(mode == 'edit'){
//       console.log("cityModal",cityId)
//       await updateCity(cityname,cityId,selectedStateId,selectedCountryId)
//     }
//     await getCity(pagination.currentPage, pagination.rowsPerPage);
//     dispatch(closeModal());
//   };
  
//   const handleCancel = () => {
//     dispatch(closeModal());
//   };
  
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm justify-center align-middle flex">
//     <div className="mt-10 flex flex-col gap-5 text-white w-96 h-96">
//         <button onClick={handleCancel} className="place-self-end">
//         <X size={30} />
//         </button>
//         <div className="bg-slate-600 flex items-center justify-center p-10 rounded-md">
//         <form className="flex flex-col w-80 gap-4 ">
//         <h3 className="">{mode === "edit" ? "Update City" : "Add City"}</h3>
//         <div className="relative">
//               <label htmlFor="stateId">country</label>
//               <div className="relative flex flex-col gap-2">
//               <select
//                   id="countryId"
//                   name="country"
//                   value={selectedCountry}
//                   onChange={handleChange}
//                   className="rounded p-2 text-black bg-white"
//                 >
//                   <option className="text-black" value="">
//                     {"Select country"}
//                   </option>
//                   {countryData.map((country) => (
//                     <option
//                       className="text-black"
//                       key={country.countryid}
//                       value={country.countryname}
//                     >
//                       {country.countryname}
//                     </option>
//                   ))}
//                 </select>
//                 <select
//                   id="stateId"
//                   name="state"
//                   onChange={handleChange}
//                   onClick={clickState}
//                   value={selectedState}
//                   className="rounded p-2 text-black bg-white"
//                   disabled={!selectedCountry && mode=='add'}
//                 >
//                   <option className="text-black" value="">
//                     {"Select State"}
//                   </option>
//                   {stateData.map((state) => (
//                     <option
//                       className="text-black"
//                       key={state.stateid}
//                       value={state.statename}
//                     >
//                       {state.statename}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//             <input
//               className="rounded p-2 text-black"
//               name="cityname"
//               value={cityname}
//               onChange={handleChange}
//               placeholder="Enter city name"
//             />
//             <div className="flex justify-between">
//               <button type="button" onClick={handleSave}>
//                 {mode === "edit" ? "Update" : "Save"}
//               </button>
//               <button type="button" onClick={handleCancel}>
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CityModal;

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, setSelectedState, setSelectedCountry, setCityName, setSelectedStateId, setSelectedCountryId } from '../../Redux/modalCitySlice';
import { useStateContext } from '../Context/StateContext';
import { useCityContext } from '../Context/CityContext';

const CityModal = ({ city }) => {
  const dispatch = useDispatch();
  const { fetchCountryData } = useStateContext();
  const { fetchStateData, addCity, getCity, updateCity } = useCityContext();
  const initialFormData = {
    stateId: '',
    cityName: '',
    textFieldValue: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const countryData = useSelector((state) => state.country.countryData);
  const { data: cities, pagination } = useSelector((state) => state.city);

  const { stateData, selectedState, cityname, selectedCountry, selectedCountryId, selectedStateId, mode, cityId } = useSelector((state) => state.cityModal);

  const [validationMessages, setValidationMessages] = useState({
    country: '',
    state: '',
    cityname: '',
  });

  useEffect(() => {
    fetchCountryData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'country') {
      const selectedCountry = countryData.find((country) => country.countryname === value);

      if (selectedCountry) {
        const countryId = selectedCountry.countryid;
        dispatch(setSelectedCountry(value));
        dispatch(setSelectedCountryId(countryId));
      }
    } else if (name === 'state') {
      const selectedState = stateData.find((state) => state.statename === value);

      if (selectedState) {
        const stateId = selectedState.stateid;
        dispatch(setSelectedState(value));
        dispatch(setSelectedStateId(stateId));
      }
    } else if (name === 'cityname') {
      dispatch(setCityName(value));
    }

    // Clear validation message when the field is changed
    setValidationMessages((prevMessages) => ({
      ...prevMessages,
      [name]: '',
    }));
  };

  useEffect(() => {
    if (selectedCountry !== null) {
      fetchStateData(selectedCountry);
    }
  }, [selectedCountry]);

  const validateForm = () => {
    console.log("hii")
    let isValid = true;
    const newValidationMessages = {};
  
    if (!selectedCountry) {
      newValidationMessages.country = 'Please select a country.';
      isValid = false;
    }
  
    if (!selectedState) {
      newValidationMessages.state = 'Please select a state.';
      isValid = false;
    }
  
    if (cityname === null || cityname.trim() === '') {
      newValidationMessages.cityname = 'City name is required.';
      isValid = false;
    } else if (!/^[A-Za-z]+$/.test(cityname)) {
      newValidationMessages.cityname = 'City name should contain only alphabets.';
      isValid = false;
    } else if (cityname.length < 1 || cityname.length > 10) {
      newValidationMessages.cityname = 'City name should be between 1 and 10 characters long.';
      isValid = false;
    }
  
    setValidationMessages(newValidationMessages);
    return isValid;
  };

  const handleSave = async () => {
    if (validateForm()) {
      if (mode === 'add') {
        await addCity(selectedCountryId, selectedStateId, cityname,pagination.rowsPerPage,pagination.currentPage);
      }

      if (mode === 'edit') {
        await updateCity(cityname, cityId, selectedStateId, selectedCountryId);
      }

      
      dispatch(closeModal());
    }
  };

  const handleCancel = () => {
    dispatch(closeModal());
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm justify-center align-middle flex'>
      <div className='mt-10 flex flex-col gap-5 text-white w-96 h-96'>
        <button onClick={handleCancel} className='place-self-end'>
          <X size={30} />
        </button>
        <div className='bg-slate-600 flex items-center justify-center p-10 rounded-md'>
          <form className='flex flex-col w-80 gap-4 '>
            <h3 className=''>{mode === 'edit' ? 'Update City' : 'Add City'}</h3>
            <div className='relative'>
              <label htmlFor='stateId'>Country</label>
              <div className='relative flex flex-col gap-2'>
                <select
                  id='countryId'
                  name='country'
                  value={selectedCountry}
                  onChange={handleChange}
                  className='rounded p-2 text-black bg-white'
                >
                  <option className='text-black' value=''>
                    {'Select country'}
                  </option>
                  {countryData.map((country) => (
                    <option className='text-black' key={country.countryid} value={country.countryname}>
                      {country.countryname}
                    </option>
                  ))}
                </select>
                <div className='text-red-500'>{validationMessages.country}</div>
              </div>
            </div>
            <div className='relative'>
              <label htmlFor='stateId'>State</label>
              <div className='relative flex flex-col gap-2'>
                <select
                  id='stateId'
                  name='state'
                  onChange={handleChange}
                  value={selectedState}
                  className='rounded p-2 text-black bg-white'
                  disabled={!selectedCountry && mode === 'add'}
                >
                  <option className='text-black' value=''>
                    {'Select State'}
                  </option>
                  {stateData.map((state) => (
                    <option className='text-black' key={state.stateid} value={state.statename}>
                      {state.statename}
                    </option>
                  ))}
                </select>
                <div className='text-red-500'>{validationMessages.state}</div>
              </div>
            </div>
            <input
              className='rounded p-2 text-black'
              name='cityname'
              value={cityname}
              onChange={handleChange}
              placeholder='Enter city name'
            />
            <div className='text-red-500'>{validationMessages.cityname}</div>
            <div className='flex justify-between'>
              <button type='button' onClick={handleSave}>
                {mode === 'edit' ? 'Update' : 'Save'}
              </button>
              <button type='button' onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CityModal;



