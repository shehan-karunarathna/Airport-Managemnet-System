import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CCard,
  CButton,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableDataCell,
} from '@coreui/react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import axios from 'axios'
import Swal from 'sweetalert2' // Import SweetAlert2

const Airplanelist = () => {
  const navigate = useNavigate()
  const [airplaneData, setAirplaneData] = useState([])

  // Fetch data from the Spring Boot API
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/v1/airplane/getairplanes')
      .then((response) => {
        setAirplaneData(response.data)
      })
      .catch((error) => {
        console.error('There was an error fetching the airplanes!', error)
      })
  }, [])

  const handleRegisterButtonClick = () => {
    navigate('/AirPlane/AirplaneReg')
  }

  const handleUpdateButtonClick = (PlaneID) => {
    navigate(`/AirPlane/Airplaneedit/${PlaneID}`)
  }

  const handleDeleteButtonClick = (airplane) => {
    // Show SweetAlert2 confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // Implement delete functionality with API call, sending the entire airplane object
        axios
          .delete('http://localhost:8080/api/v1/airplane/deleteairplane', {
            data: airplane, // Send the airplane object in the request body
          })
          .then(() => {
            //  refresh the list after deletion
            setAirplaneData(airplaneData.filter((a) => a.PlaneID !== airplane.PlaneID))

            // Show success message
            Swal.fire('Deleted!', 'The airplane has been deleted.', 'success')
          })
          .catch((error) => {
            console.error(
              `There was an error deleting the airplane with ID ${airplane.PlaneID}!`,
              error,
            )

            // Show error message
            Swal.fire('Error!', 'There was an error deleting the airplane.', 'error')
          })
      }
    })
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong>Airplane List</strong>
              <CButton color="primary" onClick={handleRegisterButtonClick}>
                Register New Airplane
              </CButton>
            </div>
          </CCardHeader>
          <CCardBody>
            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>#</CTableHeaderCell>
                  <CTableHeaderCell>Model</CTableHeaderCell>
                  <CTableHeaderCell>Manufacturer</CTableHeaderCell>
                  <CTableHeaderCell>Year of Manufacturer</CTableHeaderCell>
                  <CTableHeaderCell>Seating Capacity</CTableHeaderCell>
                  <CTableHeaderCell>Fuel Capacity</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {airplaneData.length > 0 ? (
                  airplaneData.map((airplane, index) => (
                    <CTableRow key={airplane.PlaneID}>
                      <CTableDataCell>{index + 1}</CTableDataCell>
                      <CTableDataCell>{airplane.Model}</CTableDataCell>
                      <CTableDataCell>{airplane.Manufacturer}</CTableDataCell>
                      <CTableDataCell>{airplane.YearOfManufacturer}</CTableDataCell>
                      <CTableDataCell>{airplane.SeatingCapacity}</CTableDataCell>
                      <CTableDataCell>{airplane.FuelCapacity}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="warning"
                          onClick={() => handleUpdateButtonClick(airplane.PlaneID)}
                          className="me-2"
                          shape="rounded"
                          variant="outline"
                        >
                          <FaEdit />
                        </CButton>
                        <CButton
                          color="danger"
                          onClick={() => handleDeleteButtonClick(airplane)}
                          shape="rounded"
                          variant="outline"
                        >
                          <FaTrash />
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))
                ) : (
                  <CTableRow>
                    <CTableDataCell colSpan="7" className="text-center">
                      No airplanes found.
                    </CTableDataCell>
                  </CTableRow>
                )}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Airplanelist
