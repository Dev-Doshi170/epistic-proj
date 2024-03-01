

import * as React from 'react';
import { useState, useEffect } from 'react';
import Modal from './Modals/modal.js';
import { useCountryContext } from './Context/CountryContext.js';
import { useNavigate } from 'react-router-dom';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { IconButton } from '@mui/material';
import { FirstPage, KeyboardArrowLeft, KeyboardArrowRight, LastPage } from '@mui/icons-material';

const CustomTable = () => {
  const {
    setCountryData,
    sort,
    totalPage,
    currentPage,
    setCurrentPage,
    countryData,
    fetchDataFromApi,
    deleteDataFromApi,
    insertData,
    updateData,
    filterData,
    count
  } = useCountryContext();

  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {

        console.log("token not experied")
      const tokenTimestamp = localStorage.getItem("tokenTimestamp");

      if (tokenTimestamp) {
        const currentTime = Date.now();
        const expirationTime = parseInt(tokenTimestamp, 10) + 30 * 60 * 1000;  

        if (currentTime > expirationTime) {
          console.log("Token expired");
          localStorage.removeItem('authToken');
          localStorage.removeItem('tokenTimestamp');
          navigate('/');
        }
      }
    }, 10000);

    return () => clearInterval(intervalId);
  }, [navigate]);


  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [countryInModal, setCountryInModal] = useState(null);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [deleteCandidateId, setDeleteCandidateId] = useState(null);
  const [page, setPage] = useState(1); // Start with page 1
  const [searchResult, setSearchResult] = useState(false);
  const [sortOrder, setSortOrder] = useState('');
  const [sortColumn,setSortColumn] = useState('');
  const [rowsPerPage,setRowsPerPage] = useState(5);
  const [isSearching, setIsSearching] = useState('');


// Function to handle page change
const handleChangePage = (event, newPage) => {
  setCurrentPage(setCurrentPage(currentPage + 1)); // Adjusting newPage to 1-based index
  fetchDataFromApi(newPage + 1, rowsPerPage,sortOrder,sortColumn);
};

// Function to handle rows per page change
const handleChangeRowsPerPage = (event) => {
  const newRowsPerPage = parseInt(event.target.value, 10);
  setRowsPerPage(newRowsPerPage);
  setCurrentPage(1); // Reset currentPage to 1 when rows per page changes
  fetchDataFromApi(1, newRowsPerPage,sortOrder,sortColumn); // Fetch data for the first page with the new rows per page
};

// Function to handle first page button click
const handleFirstPageButtonClick = () => {
  setCurrentPage(1);
  fetchDataFromApi(1, rowsPerPage,sortOrder,sortColumn);
};

// Function to handle back button click
const handleBackButtonClick = () => {
  const newPage = Math.max(1, currentPage - 1);
  setCurrentPage(newPage);
  fetchDataFromApi(newPage, rowsPerPage,sortOrder,sortColumn);
};

// Function to handle next button click
const handleNextButtonClick = () => {
  const newPage = Math.min(totalPage, currentPage + 1);
  setCurrentPage(newPage);
  fetchDataFromApi(newPage, rowsPerPage,sortOrder,sortColumn);
};

// Function to handle last page button click
const handleLastPageButtonClick = () => {
  setCurrentPage(totalPage);
  fetchDataFromApi(totalPage, rowsPerPage,sortOrder,sortColumn);
};

  const handleModal = (mode, country) => {
    setModalMode(mode);
    setCountryInModal(country);
    setShowModal(true);
  };

  const handleDeleteCandidate = (id) => {
    setDeleteCandidateId(id);
    setShowConfirmationDialog(true);
  };

  const handleDeleteCountry = async () => {
    try {
      await deleteDataFromApi(deleteCandidateId,currentPage, rowsPerPage,sortOrder,sortColumn);
      setIsSearching('');
      if (countryData.length === 1 && totalPage > 1) {
        const newPage = currentPage > 1 ? currentPage - 1 : 1;
        setCurrentPage(newPage);
        setPage(newPage-1);
        
        
      }
      setDeleteCandidateId(null);
      setShowConfirmationDialog(false);
    } catch (error) {
      console.error('Error deleting country:', error);
    }
  };

  const handleCancelDelete = () => {
    setDeleteCandidateId(null);
    setShowConfirmationDialog(false);
    setIsSearching('');
  };

  const handleSaveCountry = async (newData) => {
    try {
      await insertData(newData,currentPage, rowsPerPage,sortOrder,sortColumn);
      await setShowModal(false);
      setIsSearching('');
      
    } catch (error) {
      console.error('Error adding country:', error);
    }
  };

  const handleEditCountry = async (editedData) => {
   
    try {
      // Find the index of the country with the matching countryid in the existing countryData
      const indexToUpdate = countryData.findIndex(
        (country) => country.countryid === editedData.countryid
      );
  
      if (indexToUpdate !== -1) {
        // Update only the specified fields
        const updatedCountry = {
          ...countryData[indexToUpdate],
          countryname: editedData.countryname,
          countrycode: editedData.countrycode,
          phonecode: editedData.phonecode,
        };
  
        // Create a new array with the updated country at the found index
        const updatedCountryData = [...countryData];
        updatedCountryData[indexToUpdate] = updatedCountry;
  
        // Update the state with the new countryData
        setCountryData(updatedCountryData);
  
        // Perform the API update with the editedData
        await updateData(editedData);
  
        setShowModal(false);
        setIsSearching('');
      } else {
        console.error('Country with the specified countryid not found.');
      }
    } catch (error) {
      console.error('Error updating country:', error);
    }
  };

  const handleSearchChange = (e) => {
    const eventValue = e.target.value;
    setIsSearching(eventValue)
    if (isNaN(eventValue)) {
      filterData('country', { search: eventValue, code: '', limit: rowsPerPage, page: 1 });
    } else {
      filterData('country', { search: '', code: eventValue, limit: rowsPerPage, page: 1 });
    }

    if (eventValue === '' && eventValue === '') {
      setSearchResult(false);
      fetchDataFromApi(page, rowsPerPage,sortOrder,sortColumn);
    } else {
      setSearchResult(true);
    }
  };

  

  const handleSortClick = async(columnName) => {
   
    setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
    setSortColumn(columnName)
    await sort(currentPage, rowsPerPage, sortOrder, 'country', columnName);
  };

  useEffect(()=>{
    console.log("use")
    fetchDataFromApi(page,rowsPerPage,sortOrder,sortColumn)
   },[page,rowsPerPage,sortOrder,sortColumn])

  return (
    <div className="w-[100%] flex flex-col items-center justify-between gap-4">
      <div className="w-[100%] flex justify-between items-baseline ">
        <div className="relative flex-grow flex items-stretch">
          <input
            type="search"
            className="rounded-lg border-[1px] border-black p-2 w-60 bg-white placeholder:text-black"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="button-addon1"
            value={isSearching}
            onChange={handleSearchChange}
          />
        </div>
        <button
          className="rounded-lg border-[1px] border-black p-2 w-30 bg-white placeholder:text-black text-left "
          onClick={() => handleModal("add", null)}
        >
          Add Country
        </button>
        
      </div>
      <div>
        <div className="flex-grow w-[100%] min-h-[calc(100vh-24rem)] overflow-y-visible relative  rounded-xl  ">
          <TableContainer
            component={Paper}
            style={{ maxHeight: "505px", overflowY: "auto",boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
          >
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
              <TableHead
                style={{ position: "sticky", top: 0, background: "#fff" }}
              >
                <TableRow>
                  <TableCell
                    style={{ textAlign: "center" }}
                    className="py-2 px-4 text-center w-96"
                  >
                    Country ID
                  </TableCell>
                  <TableCell className="py-2 px-4 text-center">
                    <div className="flex items-center">
                      Country Name
                      {!isSearching && (
                        <button
                          className="ml-2 focus:outline-none"
                          onClick={() => handleSortClick("countryname")}
                        >
                          {sortOrder === "asc" ? "↓" : "↑"}
                        </button>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="py-2 px-4 text-center">
                    <div className="flex items-center">
                      Country Code
                      {!isSearching && (
                        <button
                          className="ml-2 focus:outline-none"
                          onClick={() => handleSortClick("countrycode")}
                        >
                          {sortOrder === "asc" ? "↓" : "↑"}
                        </button>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="py-2 px-4 text-center">
                    <div className="flex items-center">
                      Phone Code
                      {!isSearching && (
                        <button
                          className="ml-2 focus:outline-none"
                          onClick={() => handleSortClick("phonecode")}
                        >
                          {sortOrder === "asc" ? "↓" : "↑"}
                        </button>
                      )}
                    </div>
                  </TableCell>
                  <TableCell
                    style={{ textAlign: "center" }}
                    className="py-2 px-4 text-center"
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {countryData && countryData.length > 0 ? (
                  countryData.map((country, index) => (
                    <TableRow
                      key={country.countryid}
                      className={` transition-all duration-300 ${
                        index % 2 === 0 ? "bg-gray-100" : "bg-white"
                      } hover:bg-gray-200`}
                    >
                      <TableCell
                        style={{ textAlign: "center" }}
                        className="py-2 px-4"
                      >
                        {country.countryid}
                      </TableCell>
                      <TableCell
                        style={{ textAlign: "center" }}
                        className="py-2 px-4"
                      >
                        {country.countryname}
                      </TableCell>
                      <TableCell
                        style={{ textAlign: "center" }}
                        className="py-2 px-4"
                      >
                        {country.countrycode}
                      </TableCell>
                      <TableCell
                        style={{ textAlign: "center" }}
                        className="py-2 px-4"
                      >
                        {country.phonecode}
                      </TableCell>
                      <TableCell
                      >
                      <div className='align-baseline flex justify-end'>
                        <button
                          onClick={() => handleModal("edit", country)}
                          className=" m-1 text-white  rounded"
                        >
                        <img
                            src="Asset\icons8-edit-50.png" // Replace with the actual path to your delete icon image
                            alt="Edit Icon"
                            className=" " // Adjust the margin as needed
                          />
                          
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteCandidate(country.countryid)
                          }
                          className=" text-white m-1 px-3 py-1 rounded transition-all duration-300 focus:outline-none focus:shadow-outline-red active:bg-red-800"
                        >
                          <img
                            src="Asset\icons8-delete-60.png" // Replace with the actual path to your delete icon image
                            alt="Delete Icon"
                            className="" // Adjust the margin as needed
                          />
                          
                        </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan="5" className="text-center py-4">
                      No data found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <div
              className="flex justify-end"
              style={{ position: "sticky", bottom: 0, background: "#fff" }}
            >
              {isSearching ? null : (
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={3}
                  count={count}
                  rowsPerPage={rowsPerPage}
                  page={currentPage - 1}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={() => (
                    <div style={{ flexShrink: 0, ml: 2.5 }}>
                      <IconButton
                        onClick={handleFirstPageButtonClick}
                        disabled={currentPage === 1}
                        aria-label="first page"
                      >
                        <FirstPage />
                      </IconButton>
                      <IconButton
                        onClick={handleBackButtonClick}
                        disabled={currentPage === 1}
                        aria-label="previous page"
                      >
                        <KeyboardArrowLeft />
                      </IconButton>
                      <IconButton
                        onClick={handleNextButtonClick}
                        disabled={currentPage === totalPage}
                        aria-label="next page"
                      >
                        <KeyboardArrowRight />
                      </IconButton>
                      <IconButton
                        onClick={handleLastPageButtonClick}
                        disabled={currentPage === totalPage}
                        aria-label="last page"
                      >
                        <LastPage />
                      </IconButton>
                    </div>
                  )}
                />
              )}
            </div>
          </TableContainer>
        </div>
      </div>
      {showConfirmationDialog && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-4 rounded-md shadow-md">
            <p>Are you sure you want to delete this country?</p>
            <div className="flex justify-end mt-4">
              <button
                className="bg-red-500 text-white px-3 py-1 rounded mr-2"
                onClick={handleDeleteCountry}
              >
                Sure
              </button>
              <button
                className="bg-gray-500 text-white px-3 py-1 rounded"
                onClick={handleCancelDelete}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {showModal && (
        <Modal
          country={countryInModal}
          Mode={modalMode}
          onSaveCountry={handleSaveCountry}
          onEditCountry={handleEditCountry}
          className="relative z-10"
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default CustomTable;


