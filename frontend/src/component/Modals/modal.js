import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const Modal = ({ onClose, onSaveCountry, country, Mode, onEditCountry }) => {
  const initialFormData = {
    countryname: '',
    countrycode: '',
    phonecode: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    const errors = {};

    // Validation for country name
    if (!formData.countryname) {
      errors.countryname = 'Country name cannot be empty';
    } else if (formData.countryname.length > 50) {
      errors.countryname = 'Maximum 50 characters allowed';
    } else if (!/^[a-zA-Z]+$/.test(formData.countryname)) {
      errors.countryname = 'Enter only alphabets';
    }

    if (!formData.countrycode) {
      errors.countrycode = 'Country code cannot be empty';
    } else if (!/^[a-zA-Z]+$/.test(formData.countrycode)) {
      errors.countrycode = 'Enter only alphabets';
    }
    else if (formData.countrycode.length > 2) {
      errors.countrycode = 'Maximum 2 characters allowed';
    } 
    
    // Validation for phone code
    if (!formData.phonecode) {
      errors.phonecode = 'Phone code cannot be empty';
    } else if (!/^\d+$/.test(formData.phonecode)) {
      errors.phonecode = 'Enter only numbers';
    }
    else if (formData.phonecode.length > 4) {
      errors.phonecode = 'Maximum 4 characters allowed';
    } 
    setValidationErrors(errors);
    return Object.keys(errors).length === 0; // Return true if there are no errors
  };

  const handleSave = () => {
    const isFormValid = validateForm();

    if (isFormValid) {
      if (Mode === 'edit') {
        onEditCountry({ ...formData, countryid: country.countryid });
      }
      if (Mode === 'add') {
        onSaveCountry(formData);
      }
    }
  };

  useEffect(() => {
    if (Mode === 'edit') {
      const { countrycode, countryname, phonecode } = country;
      setFormData((prevData) => ({
        ...prevData,
        countryname: countryname || '',
        countrycode: countrycode || '',
        phonecode: phonecode || '',
      }));
    } else {
      setFormData(initialFormData);
    }
  }, [country, Mode]);

  const handleCancel = () => {
    if (Mode === 'edit') {
      onClose(); // Close the modal if in edit mode
    }else{
      setFormData(initialFormData)
    }
  };

  return (
    <div className=' fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm justify-center align-middle flex'>
      <div className='mt-10 flex flex-col gap-5 text-white w-96 h-96'>
        <button onClick={() => onClose()} className='place-self-end'>
          <X size={30} />
        </button>
        <div className='bg-white flex items-center justify-center p-10 rounded-md '>
          <form className='flex flex-col w-80 gap-4 '>
            <h3 className='text-black font-semibold'>{Mode === 'edit' ? 'Update country' : 'Add country'}</h3>
            <input
              className='p-2 text-black border-2 border-black  rounded-md'
              name='countryname'
              value={formData.countryname}
              onChange={handleChange}
              placeholder='Enter country name'
            />
            {validationErrors.countryname && (
              <small className='text-red-500'>{validationErrors.countryname}</small>
            )}
            <input
              className=' p-2 text-black border-2 border-black  rounded-md'
              name='countrycode'
              value={formData.countrycode}
              onChange={handleChange}
              placeholder='Enter country ID'
            />
            {validationErrors.countrycode && (
              <small className='text-red-500'>{validationErrors.countrycode}</small>
            )}
            <input
              className=' p-2 text-black border-2 border-black  rounded-md'
              name='phonecode'
              value={formData.phonecode}
              onChange={handleChange}
              placeholder='Enter country Phone Code'
            />
            {validationErrors.phonecode && (
              <small className='text-red-500'>{validationErrors.phonecode}</small>
            )}
            <div className='flex justify-between'>
              <button className='text-black ' type='button' onClick={handleSave}>
                {Mode === 'edit' ? 'Update' : 'Save'}
              </button>
              <button className='text-black ' type='button' onClick={() => handleCancel()}>
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
