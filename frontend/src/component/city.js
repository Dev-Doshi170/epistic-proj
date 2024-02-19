import React, { useEffect, useState } from 'react';
import { useCityContext } from './Context/CityContext';
import { useSelector, useDispatch } from 'react-redux';
import { Table, TableHead, TableBody, TableCell, TableContainer, TableFooter, TableRow, Paper, IconButton } from '@mui/material';
import { setCurrentPage, setRowsPerPage ,setSort} from './../Redux/citySlice';
import { setSelectedCityId,openModal, closeModal, setSelectedState, setSelectedCountry, setCityName,setSelectedStateId,setSelectedCountryId} from '../Redux/modalCitySlice';
import Modal from './Modals/citymodal';
//import { , TableHead, TableBody, TableCell, TableContainer, TableFooter, TableRow, Paper, IconButton } from '@mui/material';
import { TablePagination } from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';



const City = () => {
  const { getCity,deleteCity,sortData,searchCities } = useCityContext();
  const dispatch = useDispatch();
  const { data: cities, pagination ,sort} = useSelector((state) => state.city);
  // const isModalOpen = useSelector((state) => state.modal.isOpen);
  const isModalOpen = useSelector((state) => state.cityModal.isOpen);
  //const countryData = useSelector((state) => state.country.countryData);
  //const {stateData, cityId} = useSelector((state) => state.cityModal);

 
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [isSearching, setIsSearching] = useState('');
  //const [sortColumn, setSortColumn] = useState(null);
  //const [sortOrder, setSortOrder] = useState('asc');
  const [deleteId,setdeleteId] = useState();
  const [deleteName,setdeleteName] = useState();

  
  const handleSort = (column) => {
    const newSortOrder = sort === 'asc' ? 'desc' : 'asc';
    dispatch(setSort(newSortOrder));
    sortData('city',pagination.currentPage,pagination.rowsPerPage,sort,column)
  };

  
  
  const handleModal = async(mode,cityname,statename,countryname,cityid,countryid,stateid) => {
    if (mode === 'edit') {
        console.log(countryid)
        dispatch(setSelectedCountry(countryname));
        dispatch(setSelectedCountryId(countryid))
        
        console.log(stateid)
        dispatch(setSelectedState(statename));
        dispatch(setSelectedStateId(stateid))
        dispatch(setSelectedCityId(cityid))
        dispatch(setCityName(cityname));
      dispatch(openModal(mode));
    } 
    
    else if (mode === 'add') {
      dispatch(openModal(mode));
    }
  }
  

  const handleDelete = async (cityid,cityname) => {
    // console.log(cityid)
    setdeleteId(cityid)
    setdeleteName(cityname)
    setShowConfirmationDialog(true);
    
  };

  const handleDeleteConfirmed = async() => {
      setShowConfirmationDialog(false);
      await deleteCity(deleteId,deleteName);
      await getCity(pagination.currentPage,pagination.rowsPerPage );
    
  };

  const handleDeleteCancelled = () => {
    setShowConfirmationDialog(false);
  };
  
  const handleChangePage = (event, newPage) => {
    dispatch(setCurrentPage(newPage));
    getCity(newPage, pagination.rowsPerPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    console.log(newRowsPerPage)
    dispatch(setRowsPerPage(newRowsPerPage));
    getCity(pagination.currentPage, newRowsPerPage);
  };

  const handleFirstPageButtonClick = () => {
    dispatch(setCurrentPage(1));
    getCity(1, pagination.rowsPerPage);
  };
  
  const handleBackButtonClick = () => {
    const newPage = Math.max(1, pagination.currentPage - 1);
    dispatch(setCurrentPage(newPage));
    getCity(newPage, pagination.rowsPerPage);
  };
  
  const handleNextButtonClick = async () => {
    const newPage = Math.min(pagination.totalPages, pagination.currentPage + 1);
    dispatch(setCurrentPage(newPage));
    getCity(newPage, pagination.rowsPerPage);
  };
  
  const handleLastPageButtonClick = () => {
    dispatch(setCurrentPage(pagination.totalPages));
    getCity(pagination.totalPages, pagination.rowsPerPage);
  };
  
  const handleSearchChange = (event) => {
    if(event.target.value.length >= 1){
      searchCities(event.target.value)
      setIsSearching(event.target.value);
    }else{
      getCity(pagination.totalPages, pagination.rowsPerPage);
      setIsSearching(event.target.value);
    }
  };
  
  useEffect(() => {
    getCity(pagination.currentPage, pagination.rowsPerPage);
  }, []);
  
  return (
    <div className='w-[100%]  flex flex-col items-center justify-between gap-4'>
    {showConfirmationDialog && (
      <div className="z-50 fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="bg-white p-4 rounded-md shadow-md">
          <p>Are you sure you want to delete this city?</p>
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
          onClick={() => handleModal("add", null,null,null,null,null,null)}
        >
          Add City
        </button>
      </div>
      <div className="flex-grow  min-h-[calc(100vh-24rem)] overflow-y-visible relative">
        <TableContainer component={Paper} style={{ maxHeight: "455px", overflowY: "auto" }}>
          <Table style={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell style={{ textAlign: "center" }}>City ID</TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  <div className="flex items-center">
                    City Name
                    <button className="ml-2 focus:outline-none" onClick={() => handleSort('cityname')}>
                      {sort === 'asc' ? '↓' : '↑'}
                    </button>
                  </div>
                  </TableCell>
                  <TableCell>
                  <div className="flex items-center">
                  State Name
                  <button className="ml-2 focus:outline-none" onClick={() => handleSort('statename')}>
                  {sort === 'asc' ? '↓' : '↑'}
                  </button>
                  </div>
                  </TableCell>
                  <TableCell>
                  <div className="flex items-center">
                  Country Name
                  <button className="ml-2 focus:outline-none" onClick={() => handleSort('countryname')}>
                  {sort === 'asc' ? '↓' : '↑'}
                  </button>
                  </div>
                  </TableCell>
                
                {/* ... (other header cells) */}
                <TableCell style={{ textAlign: "center" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cities && cities.length > 0 ? (
                cities.map((city, index) => (
                  <TableRow
                    className={` transition-all duration-300 ${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    } hover:bg-gray-200`}
                    key={city.cityid}
                  >
                    <TableCell style={{ textAlign: "center" }}>
                      {city.cityid}
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      {city.cityname}
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                    {city.statename}
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                  {city.countryname}
                </TableCell>
                    {/* ... (other body cells) */}
                    <TableCell style={{ textAlign: "center" }}>
                      <button
                        className="bg-blue-500 m-1 text-white px-3 py-1 rounded hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                        onClick={() => handleModal("edit", city.cityname,city.statename,city.countryname,city.cityid,city.countryid,city.stateid)}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(city.cityid,city.cityname)}
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
          {isSearching ? null : (
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              colSpan={3}
              count={Number(pagination.count)}
              rowsPerPage={Number(pagination.rowsPerPage)}
              page={Number(pagination.currentPage) - 1 || 0}
              //onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              component="td"
              ActionsComponent={() => (
                <div style={{ flexShrink: 0, marginLeft: 2.5 }}>
                  <IconButton
                    onClick={handleFirstPageButtonClick}
                    disabled={pagination.currentPage === 1}
                    aria-label="first page"
                  >
                    <FirstPageIcon />
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
                    <LastPageIcon />
                  </IconButton>
                </div>
              )}
            />
          )}
          </div>
          </TableContainer>
          
      </div>
      {isModalOpen && (
        <Modal  onClose={() => dispatch(closeModal())} />
      )}
    </div>
  );
};

export default City;
