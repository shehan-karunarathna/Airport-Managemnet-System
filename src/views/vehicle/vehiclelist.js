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

const Vehiclelist = () => {
  const navigate = useNavigate()
  const [vehicleData, setVehicleData] = useState([])

  // Fetch data from the Spring Boot API
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/v1/vehicle/getvehicles')
      .then((response) => {
        setVehicleData(response.data)
      })
      .catch((error) => {
        console.error('There was an error fetching the vehicles!', error)
      })
  }, [])

  const handleRegisterButtonClick = () => {
    navigate('/vehicle/addvehicle')
  }

  const handleUpdateButtonClick = (vehicleId) => {
    navigate(`/vehicle/vehicleedit/${vehicleId}`)
  }

  const handleDeleteButtonClick = (vehicle) => {
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
        // Implement delete functionality with API call, sending the entire vehicle object
        axios
          .delete('http://localhost:8080/api/v1/vehicle/deletevehicle', {
            data: vehicle, // Send the vehicle object in the request body
          })
          .then(() => {
            // Refresh the list after deletion
            setVehicleData(vehicleData.filter((v) => v.vehicleId !== vehicle.vehicleId))

            // Show success message
            Swal.fire('Deleted!', 'The vehicle has been deleted.', 'success')
          })
          .catch((error) => {
            console.error(
              `There was an error deleting the vehicle with ID ${vehicle.vehicleId}!`,
              error,
            )

            // Show error message
            Swal.fire('Error!', 'There was an error deleting the vehicle.', 'error')
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
              <strong>Vehicle List</strong>
              <CButton color="primary" onClick={handleRegisterButtonClick}>
                Register New Vehicle
              </CButton>
            </div>
          </CCardHeader>
          <CCardBody>
            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>#</CTableHeaderCell>
                  <CTableHeaderCell>Vehicle Type</CTableHeaderCell>
                  <CTableHeaderCell>No Plate</CTableHeaderCell>
                  <CTableHeaderCell>Vehicle Model</CTableHeaderCell>
                  <CTableHeaderCell>Fuel Type</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {vehicleData.length > 0 ? (
                  vehicleData.map((vehicle, index) => (
                    <CTableRow key={vehicle.vehicleId}>
                      <CTableDataCell>{index + 1}</CTableDataCell>
                      <CTableDataCell>{vehicle.vehicleType}</CTableDataCell>
                      <CTableDataCell>{vehicle.noPlate}</CTableDataCell>
                      <CTableDataCell>{vehicle.vehicleModel}</CTableDataCell>
                      <CTableDataCell>{vehicle.fuelType}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="warning"
                          onClick={() => handleUpdateButtonClick(vehicle.vehicleId)}
                          className="me-2"
                          shape="rounded"
                          variant="outline"
                        >
                          <FaEdit />
                        </CButton>
                        <CButton
                          color="danger"
                          onClick={() => handleDeleteButtonClick(vehicle)}
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
                    <CTableDataCell colSpan="6" className="text-center">
                      No vehicles found.
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

export default Vehiclelist
