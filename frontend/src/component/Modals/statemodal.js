// import React, { useState, useEffect } from "react";
// import { X } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { closeModal, countryid } from "../../Redux/modalstateSlice";
// import { setCountryData } from "./../../Redux/dropcountry";
// import { useStateContext } from "../Context/StateContext";
// import {
//   setCountryname,
//   setStatename,
//   setCountryId,
// } from "../../Redux/modalstateSlice";

// const Modal = ({ mode, state }) => {
//   const { fetchCountryData, handleStateUpdate, fetchstate, addState } =
//     useStateContext();
//   const dispatch = useDispatch();
//   const countryData = useSelector((state) => state.country.countryData);
//   const statename = useSelector((state) => state.modal.statename);
//   const countryname = useSelector((state) => state.modal.countryname);
//   const stateid = useSelector((state) => state.modal.stateid);
//   const countryid = useSelector((state) => state.modal.countryid);
//   const { data: states, pagination } = useSelector((state) => state.state);

//   const initialFormData = {
//     countryname: "",
//     countrycode: "",
//     phonecode: "",
//   };

//   //const [selectedCountry, setSelectedCountry] = useState("select country");
//   const [formData, setFormData] = useState(initialFormData);

//   //console.log(countryname)
//   useEffect(() => {
//     fetchCountryData();
//     if (mode === "edit" && state) {
//       setFormData((prevFormData) => ({
//         ...prevFormData,
//         stateName: state.statename,
//       }));
//     }
//   }, [dispatch, fetchCountryData, mode, state, handleStateUpdate,fetchstate,pagination,setStatename]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (mode === "edit") {
      
//       if (name === "countryId") {
//         const selectedCountryObject = countryData.find(
//           (country) => country.countryname === value
//         );
//         if (selectedCountryObject) {
//           const selectedCountryId = selectedCountryObject.countryid;
//           dispatch(setCountryId({ countryid: selectedCountryId }));
//           //setSelectedCountry(value);
//           dispatch(setCountryname(value));
//         }
//       } else if (name === "stateName") {
//         dispatch(setStatename({ statename: value }));
//       }

      
//     } else if (mode === "add") {
//       // Handle add mode
//       if (name === "countryId") {
//         dispatch(setCountryId({ countryid: value }));
//         //setSelectedCountry(value);
//         dispatch(setCountryname(value));
//       } else if (name === "stateName") {
//         dispatch(setStatename({ statename: value }));
//       }
//     }
//   };

//   const validateForm = () => {
//     // Validate your form here
//   };

//   const handleSave = () => {


//     if (mode === "add") {
//       addState(statename, countryid);
//     } else if (mode === "edit") {
//       handleStateUpdate(stateid, statename,countryid);
//     }
//     fetchstate(pagination.currentPage, pagination.rowsperpage);
//     dispatch(closeModal());
//   };

//   const handleCancel = () => {
//     dispatch(closeModal());
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm justify-center align-middle flex">
//       <div className="mt-10 flex flex-col gap-5 text-white w-96 h-96">
//         <button onClick={handleCancel} className="place-self-end">
//           <X size={30} />
//         </button>
//         <div className="bg-slate-600 flex items-center justify-center p-10 rounded-md">
//           <form className="flex flex-col w-80 gap-4 ">
//             <h3 className="">
//               {mode === "edit" ? "Update state" : "Add state"}
//             </h3>
//             <div className="relative">
//               <label htmlFor="countryId">Country</label>
//               <div className="relative">
//                 <select
//                   id="countryId"
//                   name="countryId"
//                   value={countryname}
//                   onChange={handleChange}
//                   className="rounded p-2 text-black bg-white w-80 "
//                   //disabled={countryname !== null && mode === "edit"}
//                 >
//                   <option className="text-black" value="">
//                     {"Select Country"}
//                   </option>
//                   {countryData.map((country) => (
//                     <option
//                       className="text-black"
//                       key={country.countryid}
//                       value={country.countryname}
//                       disabled={countryname === country.countryname}
//                     >
//                       {country.countryname}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//             <input
//               className="rounded p-2 text-black"
//               name="stateName"
//               value={statename}
//               onChange={handleChange}
//               placeholder="Enter state name"
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

// export default Modal;


import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, countryid } from "../../Redux/modalstateSlice";
import { setCountryData } from "./../../Redux/dropcountry";
import { useStateContext } from "../Context/StateContext";
import {
  setCountryname,
  setStatename,
  setCountryId,
} from "../../Redux/modalstateSlice";

const Modal = ({ mode, state }) => {
  const { fetchCountryData, handleStateUpdate, fetchstate, addState } =
    useStateContext();
  const dispatch = useDispatch();
  const countryData = useSelector((state) => state.country.countryData);
  const statename = useSelector((state) => state.modal.statename);
  const countryname = useSelector((state) => state.modal.countryname);
  const stateid = useSelector((state) => state.modal.stateid);
  const countryid = useSelector((state) => state.modal.countryid);
  const { data: states, pagination } = useSelector((state) => state.state);

  const initialFormData = {
    countryname: "",
    countrycode: "",
    phonecode: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState({
    country: "",
    stateName: "",
  });

  useEffect(() => {
    fetchCountryData();
    if (mode === "edit" && state) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        stateName: state.statename,
      }));
    }
  }, [dispatch, fetchCountryData, mode, state, handleStateUpdate, fetchstate, pagination, setStatename]);

  const validateForm = () => {
    let isValid = true;

    // Reset form errors
    setFormErrors({
      country: "",
      stateName: "",
    });

    if (!countryid) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        country: "Please select a country",
      }));
      isValid = false;
    }

    if (!statename) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        stateName: "Please enter state name",
      }));
      isValid = false;
    } else if (!/^[a-zA-Z]+$/.test(statename)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        stateName: "State name should contain only alphabets",
      }));
      isValid = false;
    } else if (statename.length > 15) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        stateName: "State name should not exceed 15 characters",
      }));
      isValid = false;
    }

    return isValid;
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   console.log(name,value)
  //   // Reset error message for the changed field
  //   setFormErrors((prevErrors) => ({
  //     ...prevErrors,
  //     [name]: "",
  //   }));

  //   if (mode === "edit") {
  //     if (name === "countryId") {
  //       const selectedCountryObject = countryData.find(
  //         (country) => country.countryname === value
  //       );
  //       if (selectedCountryObject) {
  //         const selectedCountryId = selectedCountryObject.countryid;
  //         dispatch(setCountryId({ countryid: selectedCountryId }));
  //         dispatch(setCountryname(value));
  //       }
  //     } else if (name === "stateName") {
  //       dispatch(setStatename({ statename: value }));
  //     }
  //   } else if (mode === "add") {
  //     if (name === "countryId") {
  //       dispatch(setCountryId({ countryid: value }));
  //       dispatch(setCountryname(value));
  //     } else if (name === "stateName") {
  //       dispatch(setStatename({ statename: value }));
  //     }
  //   }
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Reset error message for the changed field
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  
    if (mode === "edit") {
      if (name === "countryId") {
        const selectedCountryObject = countryData.find(
          (country) => country.countryname === value
        );
        if (selectedCountryObject) {
          const selectedCountryId = selectedCountryObject.countryid;
          console.log(selectedCountryId)
          dispatch(setCountryId({ countryid: selectedCountryId }));
          dispatch(setCountryname(value));
        } else {
          // Handle case when country is not found
        }
      } else if (name === "stateName") {
        dispatch(setStatename({ statename: value }));
      }
    } else if (mode === "add") {
      if (name === "countryId") {
        const selectedCountryObject = countryData.find(
          (country) => country.countryname === value
        );
        if (selectedCountryObject) {
          const selectedCountryId = selectedCountryObject.countryid;
          console.log(selectedCountryId)
          dispatch(setCountryId({ countryid: selectedCountryId }));
          dispatch(setCountryname(value));
        } else {
          // Handle case when country is not found
        }
      } else if (name === "stateName") {
        dispatch(setStatename({ statename: value }));
      }
    }
  };



  const handleSave = () => {
    const isFormValid = validateForm();

    if (isFormValid) {
      if (mode === "add") {
        console.log(statename,countryid)
        addState(statename, countryid,pagination.currentPage,pagination.rowsperpage);
      } else if (mode === "edit") {
        handleStateUpdate(stateid, statename, countryid);
      }
      //fetchstate(pagination.currentPage, pagination.rowsperpage);
      dispatch(closeModal());
    }
  };

  const handleCancel = () => {
    dispatch(closeModal());
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm justify-center align-middle flex">
      <div className="mt-10 flex flex-col gap-5 text-white w-96 h-96">
        <button onClick={handleCancel} className="place-self-end">
          <X size={30} />
        </button>
        <div className="bg-white flex items-center justify-center p-10 rounded-md">
          <form className="flex flex-col w-80 gap-4 ">
            <h3 className="text-black">
              {mode === "edit" ? "Update state" : "Add state"}
            </h3>
            <div className="relative">
              
              <div className="relative">
                <select
                  id="countryId"
                  name="countryId"
                  value={countryname}
                  onChange={handleChange}
                  className="rounded p-2 text-black bg-white w-80 border-[1px] border-gray-400 h-[50px]"
                  style={{ maxHeight: '100px', overflowY: 'auto' }}
                >
                
                  <option className="text-black" value=""  >
                    {"Select Country"}
                  </option>
                  {countryData.map((country) => (
                    <option
                      className="text-black  "
                      key={country.countryid}
                      value={country.countryname}
                      disabled={countryname === country.countryname}
                    >
                      {country.countryname}
                    </option>
                  ))}
                </select>
              </div>
              {formErrors.country && (
                <span className="text-red-500">{formErrors.country}</span>
              )}
            </div>
            <input
              className="rounded p-2 text-black border-[1px] border-gray-400  h-[50px]"
              name="stateName"
              value={statename}
              onChange={handleChange}
              placeholder="Enter state name"
            />
            {formErrors.stateName && (
              <span className="text-red-500">{formErrors.stateName}</span>
            )}
            <div className="flex justify-between text-black">
              <button type="button" onClick={handleSave}>
                {mode === "edit" ? "Update" : "Save"}
              </button>
              <button type="button" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;



