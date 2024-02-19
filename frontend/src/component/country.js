// import React, { useState, useEffect, useRef } from 'react';
// import Modal from './Modals/modal';
// import { useCountryContext  } from './Context/CountryContext';
// import Pagination from '@mui/material/Pagination';
// import Stack from '@mui/material/Stack';
// import { ToastContainer,toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';




// const Country = () => {
//   const {sort,totalPages,currentPage,setCurrentPage, countryData, fetchDataFromApi, deleteDataFromApi, insertData,updateData ,filterData} = useCountryContext();
  
//   const [showModal, setShowModal] = useState(false);
//   const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
//   const [countryInModal, setCountryInModal] = useState(null);
//   const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
//   const [deleteCandidateId, setDeleteCandidateId] = useState(null);
//   const [page, setPage] = useState(0);
//   const [searchResult, setSearchResult] = useState(false);
//   const [sortOrder, setSortOrder] = useState('');
//   const itemsPerPage = 4;
//   const newPage =1


//   useEffect(() => {
//     fetchDataFromApi(newPage, itemsPerPage);
//   }, [newPage]); // Run whenever pageNo changes

//   let code,search;
//   let searchData = {
//     search: '',
//     code: "",
//     limit: itemsPerPage,
//     page: newPage,
//   };

//   const deleteCandidateIdRef = useRef(deleteCandidateId);
//   const insertDataRef = useRef(insertData);
//   //console.log(countryData)
//   // useEffect(() => {
//   //   // Update refs without triggering re-renders
//   //   deleteCandidateIdRef.current = deleteCandidateId;
//   //   insertDataRef.current = insertData;
//   // }, [deleteCandidateId, insertData]);

//   useEffect(() => {
//     fetchDataFromApi(newPage, itemsPerPage);
//   }, []); // Run once on mount

  

//   const handleModal = (mode, country) => {
//     setModalMode(mode);
//     setCountryInModal(country);
//     setShowModal(true);
//   };
  

//   const handleDeleteCandidate = (id) => {
//     setDeleteCandidateId(id);
//     setShowConfirmationDialog(true);
//   };

//   const handleDeleteCountry = async () => {
//     try {
//       await deleteDataFromApi(deleteCandidateId);
  
//       if (countryData.length === 1 && totalPages > 1) {
//         const newPage = currentPage > 1 ? currentPage - 1 : 1;
//         setCurrentPage(newPage);
//         setPage(newPage);
//         fetchDataFromApi(newPage, itemsPerPage);
//         toast.success('Country deleted successfully!');
//       } else {
//         fetchDataFromApi(currentPage, itemsPerPage);
//       }
//       setDeleteCandidateId(null);
//       setShowConfirmationDialog(false);
//     } catch (error) {
//       console.error("Error deleting country:", error);
//     }
//   };
  

//   const handleCancelDelete = () => {
//     setDeleteCandidateId(null);
//     setShowConfirmationDialog(false);
//   };

  

//   const handleSaveCountry = async (newData) => {
//     console.log('Save data:', newData);
//     setTimeout(() => {
//       toast.success("Country is Added front", { duration: 5000 });
//     }, 0);

//     await insertData(newData);
//     fetchDataFromApi(currentPage, itemsPerPage);
//     console.log('Before setShowModal');
//     setShowModal(false);
//     console.log('After setShowModal');
//   };

//   const handleEditCountry = async (editedData) =>{
//     console.log('Edited data:', editedData)
//     await updateData(editedData);
//     await fetchDataFromApi(currentPage, itemsPerPage);
//     setShowModal(false);
//     toast.success('Country updated successfully!');
//   };


//   const  handleSearchChange= (e) => {
//     const country = 'country'
    
//     const eventValue = e.target.value;
//     if (isNaN(eventValue)) {
//       searchData = {
//         search: eventValue,
//         code: '',
//         limit: itemsPerPage,
//         page: newPage,
//       };
//     } else {
//       searchData = {
//         search: '',
//         code: eventValue,
//         limit: itemsPerPage,
//         page: newPage,
//       };
      
//     }
//     if (searchData.search === '' && searchData.code === '') {
//       // Call fetchDataFromApi() if both search and code are blank
//       setSearchResult(false)
//       fetchDataFromApi(newPage, itemsPerPage);
//     } else {
//       // Otherwise, call filterData with the search data
//       filterData(country, searchData);
//       setSearchResult(true)
//     }
//     }

//     const handleChangePage = (event, newPage) => {
//       setCurrentPage(newPage);
//       setPage(newPage);
//       fetchDataFromApi(newPage, itemsPerPage); // Add this line to fetch data for the new page
//     };
    
//     const handleSortClick = (columnName) => {
//       setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
//       console.log(sortOrder);
//       sort(currentPage,itemsPerPage,sortOrder,"country",columnName)
//     };

//   return (
//     <div className="w-[100%] flex flex-col items-center">
//       <div className="w-[100%] flex justify-between items-baseline ">
//         <div className="relative flex-grow flex items-stretch">
//           <input
//             type="search"
//             className=" rounded-lg border-[4px] border-black p-2 w-60  bg-[#F3E5AB] placeholder:text-black"
//             placeholder="Search"
//             aria-label="Search"
//             aria-describedby="button-addon1"
//             onChange={handleSearchChange}
//           />
//         </div>
//         <button
//           className="rounded-lg border-[4px] border-black p-2 w-60  bg-[#F3E5AB] placeholder:text-black text-left "
//           onClick={() => handleModal("add", null)}
//         >
//           Add Country
//         </button>
//       </div>
//       <div>
//         <div className="flex-grow w-[100%] min-h-[calc(100vh-24rem)] overflow-y-visible relative">
//           <table className="w-[100%] mx-auto my-8 bg-white border-gray-300 shadow-md rounded-md">
//             <thead className="bg-[#F3E5AB] text-black">
//               <tr>
//                 <th className="py-2 px-4 text-center w-96">Country ID</th>
//                 <th className="py-2 px-4 text-center">
//                   <div className="flex items-center">
//                     Country Name
//                     <button
//                     className="ml-2 focus:outline-none"
//                     onClick={() => handleSortClick("countryname")}
//                   >
//                     {sortOrder === 'asc' ? '↓' : '↑'}
//                   </button>
//                   </div>{" "}
//                 </th>
//                 <th className="py-2 px-4 text-center">
//                 <div className="flex items-center">
//                 Country Code 
//                     <button
//                     className="ml-2 focus:outline-none"
//                     onClick={() => handleSortClick("countrycode")}
//                   >
//                     {sortOrder === 'asc' ? '↓' : '↑'}
//                   </button>
//                   </div>{" "}
//                 </th>
//                 <th className="py-2 px-4 text-center">
//                 <div className="flex items-center">
//                 Phone Code 
//                     <button
//                     className="ml-2 focus:outline-none"
//                     onClick={() => handleSortClick("phonecode")}
//                   >
//                     {sortOrder === 'asc' ? '↓' : '↑'}
//                   </button>
//                   </div>{" "}
//                 </th>
//                 <th className="py-2 px-4 text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="text-center">
//               {countryData && countryData.length > 0 ? (
//                 countryData.map((country, index) => (
//                   <tr
//                     key={country.countryid}
//                     className={` transition-all duration-300 ${
//                       index % 2 === 0 ? "bg-gray-100" : "bg-white"
//                     } hover:bg-gray-200`}
//                   >
//                     <td className="py-2 px-4 ">{country.countryid}</td>
//                     <td className="py-2 px-4">{country.countryname}</td>
//                     <td className="py-2 px-4">{country.countrycode}</td>
//                     <td className="py-2 px-4">{country.phonecode}</td>
//                     <td className="py-2 px-4 flex justify-between gap-2">
//                       <button
//                         onClick={() => handleModal("edit", country)}
//                         className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDeleteCandidate(country.countryid)}
//                         className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition-all duration-300 focus:outline-none focus:shadow-outline-red active:bg-red-800"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="5" className="text-center py-4">
//                     No data found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>

//           <div className=" fixed flex justify-end p-2"></div>
//           {!searchResult && (
//             <Stack className="flex justify-center items-center  bottom-10 absolute  w-full">
//               <Pagination
//                 className="bg-[#F3E5AB] p-3 rounded-lg"
//                 count={totalPages}
//                 page={currentPage}
//                 color="primary"
//                 onChange={handleChangePage}
//               />
//             </Stack>
//           )}
//         </div>
//       </div>
//       {showConfirmationDialog && (
//         <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
//           <div className="bg-white p-4 rounded-md shadow-md">
//             <p>Are you sure you want to delete this country?</p>
//             <div className="flex justify-end mt-4">
//               <button
//                 className="bg-red-500 text-white px-3 py-1 rounded mr-2"
//                 onClick={handleDeleteCountry}
//               >
//                 Sure
//               </button>
//               <button
//                 className="bg-gray-500 text-white px-3 py-1 rounded"
//                 onClick={handleCancelDelete}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//       {showModal && (
//         <Modal
//           country={countryInModal}
//           Mode={modalMode}
//           onSaveCountry={handleSaveCountry}
//           onEditCountry={handleEditCountry}
//           className="relative z-10"
//           onClose={() => setShowModal(false)}
//         />
//       )}
       
//     </div>
//   );
// };

// export default Country;











// import React, { useState, useEffect } from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import IconButton from '@mui/material/IconButton';
// import TablePagination from '@mui/material/TablePagination';
// import Box from '@mui/material/Box';
// import FirstPageIcon from '@mui/icons-material/FirstPage';
// import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
// import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
// import LastPageIcon from '@mui/icons-material/LastPage';
// import Stack from '@mui/material/Stack';
// import PropTypes from 'prop-types';
// import { useTheme } from '@mui/material/styles';
// //import Box from '@mui/material/Box';
// //import IconButton from '@mui/material/IconButton';
// //import FirstPageIcon from '@mui/icons-material/FirstPage';
// //import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
// //import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
// //import LastPageIcon from '@mui/icons-material/LastPage';
// import Modal from './Modals/modal';
// import { useCountryContext } from './Context/CountryContext';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const CustomTable = () => {
//   const {
//     sort,
//     totalPages,
//     currentPage,
//     setCurrentPage,
//     countryData,
//     fetchDataFromApi,
//     deleteDataFromApi,
//     insertData,
//     updateData,
//     filterData,
//   } = useCountryContext();

//   const [showModal, setShowModal] = useState(false);
//   const [modalMode, setModalMode] = useState('add');
//   const [countryInModal, setCountryInModal] = useState(null);
//   const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
//   const [deleteCandidateId, setDeleteCandidateId] = useState(null);
//   const [page, setPage] = useState(0);
//   const [searchResult, setSearchResult] = useState(false);
//   const [sortOrder, setSortOrder] = useState('');
//   const itemsPerPage = 5;

//   useEffect(() => {
//     fetchDataFromApi(page + 1, itemsPerPage);
//   }, [page]);

//   const handleModal = (mode, country) => {
//     setModalMode(mode);
//     setCountryInModal(country);
//     setShowModal(true);
//   };

//   const handleDeleteCandidate = (id) => {
//     setDeleteCandidateId(id);
//     setShowConfirmationDialog(true);
//   };

//   const handleDeleteCountry = async () => {
//     try {
//       await deleteDataFromApi(deleteCandidateId);

//       if (countryData.length === 1 && totalPages > 1) {
//         const newPage = currentPage > 1 ? currentPage - 1 : 1;
//         setCurrentPage(newPage);
//         setPage(newPage);
//         fetchDataFromApi(newPage, itemsPerPage);
//         toast.success('Country deleted successfully!');
//       } else {
//         fetchDataFromApi(currentPage, itemsPerPage);
//       }
//       setDeleteCandidateId(null);
//       setShowConfirmationDialog(false);
//     } catch (error) {
//       console.error('Error deleting country:', error);
//     }
//   };

//   const handleCancelDelete = () => {
//     setDeleteCandidateId(null);
//     setShowConfirmationDialog(false);
//   };

//   const handleSaveCountry = async (newData) => {
//     try {
//       await insertData(newData);
//       fetchDataFromApi(currentPage, itemsPerPage);
//       setShowModal(false);
//       toast.success('Country added successfully!');
//     } catch (error) {
//       console.error('Error adding country:', error);
//     }
//   };

//   const handleEditCountry = async (editedData) => {
//     try {
//       await updateData(editedData);
//       await fetchDataFromApi(currentPage, itemsPerPage);
//       setShowModal(false);
//       toast.success('Country updated successfully!');
//     } catch (error) {
//       console.error('Error updating country:', error);
//     }
//   };

//   const handleSearchChange = (e) => {
//     const eventValue = e.target.value;

//     if (isNaN(eventValue)) {
//       filterData('country', { search: eventValue, code: '', limit: itemsPerPage, page: 1 });
//     } else {
//       filterData('country', { search: '', code: eventValue, limit: itemsPerPage, page: 1 });
//     }

//     if (eventValue === '' && eventValue === '') {
//       setSearchResult(false);
//       fetchDataFromApi(page + 1, itemsPerPage);
//     } else {
//       setSearchResult(true);
//     }
//   };

//   const handleChangePage = (event, newPage) => {
//     setCurrentPage(newPage + 1);
//     setPage(newPage);
//   };

//   const handleSortClick = (columnName) => {
//     setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
//     sort(currentPage, itemsPerPage, sortOrder, 'country', columnName);
//   };

//   TablePaginationActions.propTypes = {
//     count: PropTypes.number.isRequired,
//     onPageChange: PropTypes.func.isRequired,
//     page: PropTypes.number.isRequired,
//     rowsPerPage: PropTypes.number.isRequired,
//   };

//   const TablePaginationActions = (props) => {
//     const theme = useTheme();
//     const { count, page, rowsPerPage, onPageChange } = props;
  
//     const handleFirstPageButtonClick = (event) => {
//       onPageChange(event, 0);
//     };
  
//     const handleBackButtonClick = (event) => {
//       onPageChange(event, page - 1);
//     };
  
//     const handleNextButtonClick = (event) => {
//       onPageChange(event, page + 1);
//     };
  
//     const handleLastPageButtonClick = (event) => {
//       onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
//     };

//   return (
//     <div className="w-[100%] flex flex-col items-center">
//       <div className="w-[100%] flex justify-between items-baseline ">
//         <div className="relative flex-grow flex items-stretch">
//           <input
//             type="search"
//             className="rounded-lg border-[4px] border-black p-2 w-60 bg-[#F3E5AB] placeholder:text-black"
//             placeholder="Search"
//             aria-label="Search"
//             aria-describedby="button-addon1"
//             onChange={handleSearchChange}
//           />
//         </div>
//         <button
//           className="rounded-lg border-[4px] border-black p-2 w-60 bg-[#F3E5AB] placeholder:text-black text-left "
//           onClick={() => handleModal('add', null)}
//         >
//           Add Country
//         </button>
//       </div>
//       <div>
//         <div className="flex-grow w-[100%] min-h-[calc(100vh-24rem)] overflow-y-visible relative">
//           <TableContainer component={Paper}>
//             <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
//               <TableHead>
//                 <TableRow>
//                   <TableCell className="py-2 px-4 text-center w-96">Country ID</TableCell>
//                   <TableCell className="py-2 px-4 text-center">
//                     <div className="flex items-center">
//                       Country Name
//                       <button className="ml-2 focus:outline-none" onClick={() => handleSortClick('countryname')}>
//                         {sortOrder === 'asc' ? '↓' : '↑'}
//                       </button>
//                     </div>
//                   </TableCell>
//                   <TableCell className="py-2 px-4 text-center">
//                     <div className="flex items-center">
//                       Country Code
//                       <button className="ml-2 focus:outline-none" onClick={() => handleSortClick('countrycode')}>
//                         {sortOrder === 'asc' ? '↓' : '↑'}
//                       </button>
//                     </div>
//                   </TableCell>
//                   <TableCell className="py-2 px-4 text-center">
//                     <div className="flex items-center">
//                       Phone Code
//                       <button className="ml-2 focus:outline-none" onClick={() => handleSortClick('phonecode')}>
//                         {sortOrder === 'asc' ? '↓' : '↑'}
//                       </button>
//                     </div>
//                   </TableCell>
//                   <TableCell className="py-2 px-4 text-center">Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {countryData && countryData.length > 0 ? (
//                   countryData.map((country, index) => (
//                     <TableRow
//                       key={country.countryid}
//                       className={` transition-all duration-300 ${
//                         index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
//                       } hover:bg-gray-200`}
//                     >
//                       <TableCell className="py-2 px-4">{country.countryid}</TableCell>
//                       <TableCell className="py-2 px-4">{country.countryname}</TableCell>
//                       <TableCell className="py-2 px-4">{country.countrycode}</TableCell>
//                       <TableCell className="py-2 px-4">{country.phonecode}</TableCell>
//                       <TableCell className="py-2 px-4 flex justify-between gap-2">
//                         <button
//                           onClick={() => handleModal('edit', country)}
//                           className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => handleDeleteCandidate(country.countryid)}
//                           className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition-all duration-300 focus:outline-none focus:shadow-outline-red active:bg-red-800"
//                         >
//                           Delete
//                         </button>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan="5" className="text-center py-4">
//                       No data found
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           <div className=" fixed flex justify-end p-2"></div>
//           {!searchResult && (
//             <Stack className="flex justify-center items-center  bottom-10 absolute  w-full">
//               <TablePagination
//                 rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
//                 colSpan={3}
//                 count={totalPages * itemsPerPage}
//                 rowsPerPage={itemsPerPage}
//                 page={page}
//                 SelectProps={{
//                   inputProps: {
//                     'aria-label': 'rows per page',
//                   },
//                   native: true,
//                 }}
//                 onPageChange={handleChangePage}
//                 ActionsComponent={(props) => (
//                   <TablePaginationActions {...props} count={totalPages} onPageChange={handleChangePage} />
//                 )}
//               />
//             </Stack>
//           )}
//         </div>
//       </div>
//       {showConfirmationDialog && (
//         <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
//           <div className="bg-white p-4 rounded-md shadow-md">
//             <p>Are you sure you want to delete this country?</p>
//             <div className="flex justify-end mt-4">
//               <button
//                 className="bg-red-500 text-white px-3 py-1 rounded mr-2"
//                 onClick={handleDeleteCountry}
//               >
//                 Sure
//               </button>
//               <button
//                 className="bg-gray-500 text-white px-3 py-1 rounded"
//                 onClick={handleCancelDelete}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//       {showModal && (
//         <Modal
//           country={countryInModal}
//           Mode={modalMode}
//           onSaveCountry={handleSaveCountry}
//           onEditCountry={handleEditCountry}
//           className="relative z-10"
//           onClose={() => setShowModal(false)}
//         />
//       )}
//     </div>
//   );
// }};

// export default CustomTable;

import * as React from 'react';
import { useState, useEffect } from 'react';
import Modal from './Modals/modal.js';
import { useCountryContext } from './Context/CountryContext.js';

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

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [countryInModal, setCountryInModal] = useState(null);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [deleteCandidateId, setDeleteCandidateId] = useState(null);
  const [page, setPage] = useState(1); // Start with page 1
  const [searchResult, setSearchResult] = useState(false);
  const [sortOrder, setSortOrder] = useState('');
  const [rowsPerPage,setRowsPerPage] = useState(5);


// Function to handle page change
const handleChangePage = (event, newPage) => {
  setCurrentPage(setCurrentPage(currentPage + 1)); // Adjusting newPage to 1-based index
  fetchDataFromApi(newPage + 1, rowsPerPage);
};

// Function to handle rows per page change
const handleChangeRowsPerPage = (event) => {
  const newRowsPerPage = parseInt(event.target.value, 10);
  setRowsPerPage(newRowsPerPage);
  setCurrentPage(1); // Reset currentPage to 1 when rows per page changes
  fetchDataFromApi(1, newRowsPerPage); // Fetch data for the first page with the new rows per page
};

// Function to handle first page button click
const handleFirstPageButtonClick = () => {
  setCurrentPage(1);
  fetchDataFromApi(1, rowsPerPage);
};

// Function to handle back button click
const handleBackButtonClick = () => {
  const newPage = Math.max(1, currentPage - 1);
  setCurrentPage(newPage);
  fetchDataFromApi(newPage, rowsPerPage);
};

// Function to handle next button click
const handleNextButtonClick = () => {
  const newPage = Math.min(totalPage, currentPage + 1);
  setCurrentPage(newPage);
  fetchDataFromApi(newPage, rowsPerPage);
};

// Function to handle last page button click
const handleLastPageButtonClick = () => {
  setCurrentPage(totalPage);
  fetchDataFromApi(totalPage, rowsPerPage);
};

// TablePaginationActions.propTypes = {
//   count: PropTypes.number.isRequired,
//   onPageChange: PropTypes.func.isRequired,
//   page: PropTypes.number.isRequired,
//   rowsPerPage: PropTypes.number.isRequired,
// };



 
  useEffect(() => {
    fetchDataFromApi(page, rowsPerPage);
  }, [page]);

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
      await deleteDataFromApi(deleteCandidateId);
      
      if (countryData.length === 1 && totalPage > 1) {
        const newPage = currentPage > 1 ? currentPage - 1 : 1;
        setCurrentPage(newPage);
        setPage(newPage);
        fetchDataFromApi(newPage, rowsPerPage);
        
      } else {
        fetchDataFromApi(currentPage, rowsPerPage);
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
  };

  const handleSaveCountry = async (newData) => {
    try {
      await insertData(newData);
      fetchDataFromApi(currentPage, rowsPerPage);
      setShowModal(false);
    } catch (error) {
      console.error('Error adding country:', error);
    }
  };

  const handleEditCountry = async (editedData) => {
    try {
      await updateData(editedData);
      await fetchDataFromApi(currentPage, rowsPerPage);
      setShowModal(false);
    } catch (error) {
      console.error('Error updating country:', error);
    }
  };

  const handleSearchChange = (e) => {
    const eventValue = e.target.value;

    if (isNaN(eventValue)) {
      filterData('country', { search: eventValue, code: '', limit: rowsPerPage, page: 1 });
    } else {
      filterData('country', { search: '', code: eventValue, limit: rowsPerPage, page: 1 });
    }

    if (eventValue === '' && eventValue === '') {
      setSearchResult(false);
      fetchDataFromApi(page, rowsPerPage);
    } else {
      setSearchResult(true);
    }
  };

  

  const handleSortClick = (columnName) => {
    setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
    sort(currentPage, rowsPerPage, sortOrder, 'country', columnName);
  };

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
            onChange={handleSearchChange}
          />
        </div>
        <button
          className="rounded-lg border-[1px] border-black p-2 w-30 bg-white placeholder:text-black text-left "
          onClick={() => handleModal('add', null)}
        >
          Add Country
        </button>
      </div>
      <div>
        <div className="flex-grow w-[100%] min-h-[calc(100vh-24rem)] overflow-y-visible relative ">
          <TableContainer component={Paper}  style={{
            maxHeight: rowsPerPage > 5 ? '400px' : 'none',
            overflowY: 'auto',
          }}>
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
              <TableHead style={{position:'sticky',top:0,background:'#fff'}} >
                <TableRow>
                <TableCell style={{ textAlign: 'center' }} className="py-2 px-4 text-center w-96">Country ID</TableCell>
                  <TableCell  className="py-2 px-4 text-center">
                    <div className="flex items-center ">
                      Country Name
                      <button className="ml-2 focus:outline-none" onClick={() => handleSortClick('countryname')}>
                        {sortOrder === 'asc' ? '↓' : '↑'}
                      </button>
                    </div>
                  </TableCell>
                  <TableCell className="py-2 px-4 text-center">
                    <div className="flex items-center">
                      Country Code
                      <button className="ml-2 focus:outline-none" onClick={() => handleSortClick('countrycode')}>
                        {sortOrder === 'asc' ? '↓' : '↑'}
                      </button>
                    </div>
                  </TableCell>
                  <TableCell className="py-2 px-4 text-center">
                    <div className="flex items-center">
                      Phone Code
                      <button className="ml-2 focus:outline-none" onClick={() => handleSortClick('phonecode')}>
                        {sortOrder === 'asc' ? '↓' : '↑'}
                      </button>
                    </div>
                  </TableCell>
                  <TableCell style={{ textAlign: 'center' }} className="py-2 px-4 text-center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {countryData && countryData.length > 0 ? (
                  countryData.map((country, index) => (
                    <TableRow
                      key={country.countryid}
                      className={` transition-all duration-300 ${
                        index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                      } hover:bg-gray-200`}
                    >
                      <TableCell style={{ textAlign: 'center' }} className="py-2 px-4">{country.countryid}</TableCell>
                      <TableCell style={{ textAlign: 'center' }} className="py-2 px-4">{country.countryname}</TableCell>
                      <TableCell style={{ textAlign: 'center' }} className="py-2 px-4">{country.countrycode}</TableCell>
                      <TableCell style={{ textAlign: 'center' }} className="py-2 px-4">{country.phonecode}</TableCell>
                      <TableCell  style={{ textAlign: 'center' }} className="py-2 px-4 flex justify-between gap-2">
                        <button
                          onClick={() => handleModal('edit', country)}
                          className="bg-blue-500 m-1 text-white px-3 py-1 rounded hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteCandidate(country.countryid)}
                          className="bg-red-500 text-white m-1 px-3 py-1 rounded hover:bg-red-700 transition-all duration-300 focus:outline-none focus:shadow-outline-red active:bg-red-800"
                        >
                          Delete
                        </button>
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
            <div className='flex justify-end' style={{ position: 'sticky', bottom: 0, background: '#fff' }}>
          <TablePagination 
          rowsPerPageOptions={[5, 10, 25]}
          colSpan={3}
          count={count}
          rowsPerPage={rowsPerPage}
          page={currentPage - 1} 
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={() => (
    <div  style={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton onClick={handleFirstPageButtonClick} disabled={currentPage === 1} aria-label="first page">
        <FirstPage />
        </IconButton>
        <IconButton onClick={handleBackButtonClick} disabled={currentPage === 1} aria-label="previous page">
        <KeyboardArrowLeft />
        </IconButton>
        <IconButton onClick={handleNextButtonClick} disabled={currentPage === totalPage} aria-label="next page">
        <KeyboardArrowRight />
        </IconButton>
        <IconButton onClick={handleLastPageButtonClick} disabled={currentPage === totalPage} aria-label="last page">
        <LastPage />
        </IconButton>
        </div>
        )}
        />
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


