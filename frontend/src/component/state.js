// import React, { useEffect, useState } from 'react';
// import { useStateContext } from './Context/StateContext';
// import { useSelector, useDispatch } from 'react-redux';
// import { useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Table from '@mui/material/Table';
// import { TableHead } from '@mui/material';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableFooter from '@mui/material/TableFooter';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import IconButton from '@mui/material/IconButton';
// import FirstPageIcon from '@mui/icons-material/FirstPage';
// import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
// import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
// import FirstPage from '@mui/icons-material/FirstPage';
// import LastPage from '@mui/icons-material/LastPage';
// import LastPageIcon from '@mui/icons-material/LastPage';
// import { setData, totalPages, setCurrentPage, setCount, setRowsPerPage } from './../Redux/stateSlice';
// import { openModal, closeModal, setStatename, setCountryname } from './../Redux/modalSlice';
// import Modal from './Modals/statemodal'; // Update this path

// const State = () => {
//   const { fetchstate, deleteState, searchStateData } = useStateContext();
//   const dispatch = useDispatch();
//   const { data: states, pagination } = useSelector((state) => state.state);
//   const isModalOpen = useSelector((state) => state.modal.isOpen);
//   const mode = useSelector((state) => state.modal.mode);
//   const stateid = useSelector((state) => state.modal.stateid);
//   const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
//   const [selectedStateId, setSelectedStateId] = useState(null);

//   const [isSearching, setIsSearching] = useState('');

//   useEffect(() => {
//     fetchstate(1, 5);
//   }, []);

//   const handleEdit = async (editedData) => {
//     // Implement your edit logic here
//   };

//   const handleDelete = async (stateId) => {
//     setShowConfirmationDialog(true);
//     setSelectedStateId(stateId);
//   };

//   const handleDeleteConfirmed = () => {
//     setShowConfirmationDialog(false);

//     if (selectedStateId) {
//       deleteState(selectedStateId);
//       fetchstate(pagination.currentPage, pagination.rowsperpage);
//     }
//   };

//   const handleDeleteCancelled = () => {
//     setShowConfirmationDialog(false);
//   };

//   const handleChangePage = (event, newPage) => {
//     dispatch(setCurrentPage(newPage + 1));
//     fetchstate(newPage + 1, 2);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     const newRowsPerPage = parseInt(event.target.value, 10);
//     dispatch(setRowsPerPage(newRowsPerPage));
//     fetchstate(1, newRowsPerPage);
//   };

//   const handleFirstPageButtonClick = () => {
//     dispatch(setCurrentPage(1));
//     fetchstate(1, pagination.rowsperpage);
//   };

//   const handleBackButtonClick = () => {
//     const newPage = Math.max(1, pagination.currentPage - 1);
//     dispatch(setCurrentPage(newPage));
//     fetchstate(newPage, pagination.rowsperpage);
//   };

//   const handleNextButtonClick = () => {
//     const newPage = Math.min(pagination.totalPages, pagination.currentPage + 1);
//     dispatch(setCurrentPage(newPage));
//     fetchstate(newPage, pagination.rowsperpage);
//   };

//   const handleLastPageButtonClick = () => {
//     dispatch(setCurrentPage(pagination.totalPages));
//     fetchstate(pagination.totalPages, pagination.rowsperpage);
//   };

//   const handleSearchChange = (e) => {
//     const searchTerm = e.target.value;
//     setIsSearching(searchTerm.trim() !== '');
  
//     if (searchTerm.trim() !== '') {
//       searchStateData(searchTerm);
//     } else {
//       fetchstate(pagination.totalPages, pagination.rowsperpage);
//     }
//   };


//   const handleModal = (state, mode,countryname) => {
//     const stateToPass = mode === 'add' ? null : state;
//     dispatch(setStatename({ statename: stateToPass ? stateToPass.statename : null }));
//     dispatch(setCountryname(countryname));
//     dispatch(openModal({ state: stateToPass, mode }));
//   };

//   return (
//     <div className='w-[100%]  flex flex-col items-center justify-between gap-4'>
//       {showConfirmationDialog && (
//         <div className="z-50 fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
//           <div className="bg-white p-4 rounded-md shadow-md">
//             <p>Are you sure you want to delete this state?</p>
//             <div className="flex justify-end mt-4">
//               <button
//                 className="bg-red-500 text-white px-3 py-1 rounded mr-2"
//                 onClick={handleDeleteConfirmed}
//               >
//                 Sure
//               </button>
//               <button
//                 className="bg-gray-500 text-white px-3 py-1 rounded"
//                 onClick={handleDeleteCancelled}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="z-0 w-[100%] flex justify-between items-baseline ">
//         <div className="relative flex-grow flex items-stretch">
//           <input
//             type="search"
//             className="rounded-lg border-[1px] border-black p-2 w-60 bg-white placeholder:text-black"
//             placeholder="Search"
//             aria-label="Search"
//             aria-describedby="button-addon1"
//             onChange={handleSearchChange}
//           />
//         </div>
//         <button
//           className="rounded-lg border-[1px] border-black p-2 w-30 bg-white placeholder:text-black text-left"
//           onClick={() => handleModal(null, "add",'select a country')}
//         >
//           Add state
//         </button>
//       </div>
//         <div className="flex-grow  min-h-[calc(100vh-24rem)] overflow-y-visible relative">
//         <TableContainer
//           component={Paper}
//           style={{ maxHeight: "408px", overflowY: "auto" }}
//         >
//           <Table style={{ minWidth: 650 }}>
//             <TableHead>
//               <TableRow>
//                 <TableCell style={{ textAlign: "center" }}>State ID</TableCell>
//                 <TableCell style={{ textAlign: "center" }}>State Name</TableCell>
//                 <TableCell style={{ textAlign: "center" }}>
//                   Country Name
//                 </TableCell>
//                 <TableCell style={{ textAlign: "center" }}>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//             {states && states.length > 0 ? (
//               states.map((state,index) => (
//                 <TableRow className={` transition-all duration-300 ${
//                   index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
//                 } hover:bg-gray-200`} key={state.stateid}>
//                   <TableCell style={{ textAlign: "center" }}>
//                     {state.stateid}
//                   </TableCell>
//                   <TableCell style={{ textAlign: "center" }}>
//                     {state.statename}
//                   </TableCell>
//                   <TableCell style={{ textAlign: "center" }}>
//                     {state.countryname}
//                   </TableCell>
//                   <TableCell style={{ textAlign: "center" }}>
//                     <button
//                       className="bg-blue-500 m-1 text-white px-3 py-1 rounded hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
//                       onClick={() => handleModal(state, "edit",state.countryname)}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(state.stateid)}
//                       className="bg-red-500 text-white m-1 px-3 py-1 rounded hover:bg-red-700 transition-all duration-300 focus:outline-none focus:shadow-outline-red active:bg-red-800"
//                     >
//                       Delete
//                     </button>
//                   </TableCell>
//                 </TableRow>
//               ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan="5" className="text-center py-4">
//                     No data found
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         </div>

//       <TableFooter
//         style={{ position: "sticky",  background: "white" }}
//       >
//         <TableRow>
//           {isSearching ? null : (
//             <TablePagination
//               rowsPerPageOptions={[5, 10, 25]}
//               colSpan={3}
//               count={Number(pagination.count)}
//               rowsPerPage={Number(pagination.rowsperpage)}
//               page={Number(pagination.currentPage) - 1 || 0}
//               onPageChange={handleChangePage}
//               onRowsPerPageChange={handleChangeRowsPerPage}
//               component="td"
//               ActionsComponent={() => (
//                 <div style={{ flexShrink: 0, marginLeft: 2.5 }}>
//                   <IconButton
//                     onClick={handleFirstPageButtonClick}
//                     disabled={pagination.currentPage === 1}
//                     aria-label="first page"
//                   >
//                     <FirstPage />
//                   </IconButton>
//                   <IconButton
//                     onClick={handleBackButtonClick}
//                     disabled={pagination.currentPage === 1}
//                     aria-label="previous page"
//                   >
//                     <KeyboardArrowLeft />
//                   </IconButton>
//                   <IconButton
//                     onClick={handleNextButtonClick}
//                     disabled={pagination.currentPage === pagination.totalPages}
//                     aria-label="next page"
//                   >
//                     <KeyboardArrowRight />
//                   </IconButton>
//                   <IconButton
//                     onClick={handleLastPageButtonClick}
//                     disabled={pagination.currentPage === pagination.totalPages}
//                     aria-label="last page"
//                   >
//                     <LastPage />
//                   </IconButton>
//                 </div>
//               )}
//             />
//           )}
//         </TableRow>
//       </TableFooter>

//       {isModalOpen && (
//         <Modal mode={mode} onClose={() => dispatch(closeModal())} />
//       )}
//     </div>
//   );
// };

// export default State;


import React, { useEffect, useState } from 'react';
import { useStateContext } from './Context/StateContext';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import { TableHead } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import FirstPage from '@mui/icons-material/FirstPage';
import LastPage from '@mui/icons-material/LastPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { setData, totalPages, setCurrentPage, setCount, setRowsPerPage } from './../Redux/stateSlice';
import { openModal, closeModal, setStatename, setCountryname } from '../Redux/modalstateSlice';
import Modal from './Modals/statemodal'; // Update this path

const State = () => {
  const { fetchstate, deleteState, searchStateData,sortState } = useStateContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: states, pagination } = useSelector((state) => state.state);
  const isModalOpen = useSelector((state) => state.modal.isOpen);
  const mode = useSelector((state) => state.modal.mode);
  const stateid = useSelector((state) => state.modal.stateid);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [selectedStateId, setSelectedStateId] = useState(null);

  

  const [isSearching, setIsSearching] = useState('');
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  useEffect(() => {
    fetchstate(1, 5,sortOrder,sortColumn);
  }, [sortOrder,sortColumn]);

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

  const handleEdit = async (editedData) => {
    // Implement your edit logic here
  };

  const handleDelete = async (stateId) => {
    setShowConfirmationDialog(true);
    setSelectedStateId(stateId);
  };

  const handleDeleteConfirmed = async () => {
    setShowConfirmationDialog(false);
  
    if (selectedStateId) {
      await deleteState(selectedStateId,pagination.currentPage,pagination.rowsperpage);
    }
  };

  const handleDeleteCancelled = () => {
    setShowConfirmationDialog(false);
  };

  const handleChangePage = (event, newPage) => {
    dispatch(setCurrentPage(newPage + 1));
    fetchstate(newPage + 1, 2,sortOrder,sortColumn);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    dispatch(setRowsPerPage(newRowsPerPage));
    fetchstate(1, newRowsPerPage,sortOrder,sortColumn);
  };

  const handleFirstPageButtonClick = () => {
    dispatch(setCurrentPage(1));
    fetchstate(1, pagination.rowsperpage,sortOrder,sortColumn);
  };

  const handleBackButtonClick = () => {
    const newPage = Math.max(1, pagination.currentPage - 1);
    dispatch(setCurrentPage(newPage));
    fetchstate(newPage, pagination.rowsperpage,sortOrder,sortColumn);
  };

  const handleNextButtonClick = () => {
    const newPage = Math.min(pagination.totalPages, pagination.currentPage + 1);
    dispatch(setCurrentPage(newPage));
    fetchstate(newPage, pagination.rowsperpage);
  };

  const handleLastPageButtonClick = () => {
    dispatch(setCurrentPage(pagination.totalPages));
    fetchstate(pagination.totalPages, pagination.rowsperpage,sortOrder,sortColumn);
  };

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setIsSearching(searchTerm.trim() !== '');

    if (searchTerm.trim() !== '') {
      searchStateData(searchTerm);
    } else {
      fetchstate(pagination.totalPages, pagination.rowsperpage,sortOrder,sortColumn);
    }
  };

  const handleSort = (column) => {
    setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
    setSortColumn(column);
  };

  // useEffect(() => {
  //   console.log(sortOrder, sortColumn);
  //   fetchstate(pagination.currentPage, pagination.rowsperpage,sortOrder,sortColumn);
  // }, [sortOrder, sortColumn, pagination.currentPage, pagination.rowsperpage]);

  const sortedStates = states.slice().sort((a, b) => {
    if (sortColumn) {
      const comparison = a[sortColumn].localeCompare(b[sortColumn]);
      //return sortOrder === 'asc' ? comparison : -comparison;
    }
    return 0;
  });

  const getSortIcon = (column) => {
    if (sortColumn === column) {
      //return sortOrder === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />;
    }
    return null;
  };

  const handleModal = (state, mode, countryname) => {
    const stateToPass = mode === 'add' ? null : state;
    dispatch(setStatename({ statename: stateToPass ? stateToPass.statename : null }));
    dispatch(setCountryname(countryname));
    dispatch(openModal({ state: stateToPass, mode }));
  };

  return (
    <div className='w-[100%]  flex flex-col items-center justify-between gap-4'>
      {showConfirmationDialog && (
        <div className="z-50 fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-4 rounded-md shadow-md">
            <p>Are you sure you want to delete this state?</p>
            <div className="flex justify-end mt-4">
              <button
                className="bg-red-500 text-white px-3 py-1 rounded mr-2"
                onClick={handleDeleteConfirmed}
              >
                Sure
              </button>
              <button
                className="bg-gray-500 text-white px-3 py-1 rounded"
                onClick={handleDeleteCancelled}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="z-0 w-[100%] flex justify-between items-baseline ">
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
          className="rounded-lg border-[1px] border-black p-2 w-30 bg-white placeholder:text-black text-left"
          onClick={() => handleModal(null, "add", 'select a country')}
        >
          Add state
        </button>
      </div>
      <div className="flex-grow  min-h-[calc(100vh-24rem)] overflow-y-visible relative ">
        <TableContainer component={Paper} style={{ maxHeight: "508px", overflowY: "auto",boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"}}>
          <Table style={{ minWidth: 800 }}>
            <TableHead>
              <TableRow>
                
                <TableCell
                  style={{ textAlign: "center", cursor: "pointer" }} className="py-2 px-4 text-center">
                  <div className="text-center cursor-pointer font-bold text-base" onClick={() => handleSort('statename')}>
                        State Name
                      <button className="ml-2 focus:outline-none" onClick={() => handleSort('statename')}>
                        {sortOrder === 'asc' ? '↓' : '↑'}
                      </button>
                    </div>
                </TableCell>
                <TableCell
                  className="py-2 px-4 text-center"
                  style={{ textAlign: "center", cursor: "pointer" }}>
                  <div className="text-center cursor-pointer font-bold text-base" onClick={() => handleSort('countryname')}>
                          Country Name
                      <button className="ml-2 focus:outline-none" onClick={() => handleSort('countryname')}>
                        {sortOrder === 'asc' ? '↓' : '↑'}
                      </button>
                    </div>
                </TableCell>
                <TableCell style={{ textAlign: "center" }} className="py-2 px-4 text-center  ">
                <div className='font-bold text-base'>
                Actions
                </div>
                
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedStates && sortedStates.length > 0 ? (
                sortedStates.map((state, index) => (
                  <TableRow
                    className={` transition-all duration-300 ${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    } hover:bg-gray-200`}
                    key={state.stateid}
                  >
                    <TableCell style={{ textAlign: "center" }}>
                      {state.statename}
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      {state.countryname}
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                     
                      <div className='align-baseline flex justify-center'>
                        <button
                          onClick={() =>handleModal(state, "edit", state.countryname)}
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
                            handleDelete(state.stateid)
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
          <div className='flex justify-end' style={{ position: 'sticky', bottom: 0, background: '#fff' }}>
          {isSearching ? null : (
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              colSpan={3}
              count={Number(pagination.count)}
              rowsPerPage={Number(pagination.rowsperpage)}
              page={Number(pagination.currentPage) - 1 || 0}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              component="td"
              ActionsComponent={() => (
                <div style={{ flexShrink: 0, marginLeft: 2.5 }}>
                  <IconButton
                    onClick={handleFirstPageButtonClick}
                    disabled={pagination.currentPage === 1}
                    aria-label="first page"
                  >
                    <FirstPage />
                  </IconButton>
                  <IconButton
                    onClick={handleBackButtonClick}
                    disabled={pagination.currentPage === 1}
                    aria-label="previous page"
                  >
                    <KeyboardArrowLeft />
                  </IconButton>
                  <IconButton
                    onClick={handleNextButtonClick}
                    disabled={pagination.currentPage === pagination.totalPages}
                    aria-label="next page"
                  >
                    <KeyboardArrowRight />
                  </IconButton>
                  <IconButton
                    onClick={handleLastPageButtonClick}
                    disabled={pagination.currentPage === pagination.totalPages}
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

      

      {isModalOpen && (
        <Modal mode={mode} onClose={() => dispatch(closeModal())} />
      )}
    </div>
  );
};

export default State;
