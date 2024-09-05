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

const Pilotlist = () => {
  const navigate = useNavigate()
  const [pilotData, setPilotData] = useState([])

  // Fetch data from the Spring Boot API
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/v1/pilot/getpilots')
      .then((response) => {
        setPilotData(response.data)
      })
      .catch((error) => {
        console.error('There was an error fetching the pilots!', error)
      })
  }, [])

  const handleRegisterButtonClick = () => {
    navigate('/pilot/addpilot')
  }

  const handleUpdateButtonClick = (pilotId) => {
    navigate(`/pilot/pilotedit/${pilotId}`)
  }

  const handleDeleteButtonClick = (pilot) => {
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
        // Implement delete functionality with API call, sending the entire pilot object
        axios
          .delete('http://localhost:8080/api/v1/pilot/deletepilot', {
            data: pilot, // Send the pilot object in the request body
          })
          .then(() => {
            //  refresh the list after deletion
            setPilotData(pilotData.filter((p) => p.pilotId !== pilot.pilotId))

            // Show success message
            Swal.fire('Deleted!', 'The pilot has been deleted.', 'success')
          })
          .catch((error) => {
            console.error(`There was an error deleting the pilot with ID ${pilot.pilotId}!`, error)

            // Show error message
            Swal.fire('Error!', 'There was an error deleting the pilot.', 'error')
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
              <strong>Pilot List</strong>
              <CButton color="primary" onClick={handleRegisterButtonClick}>
                Register New Pilot
              </CButton>
            </div>
          </CCardHeader>
          <CCardBody>
            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>#</CTableHeaderCell>
                  <CTableHeaderCell>Pilot Name</CTableHeaderCell>
                  <CTableHeaderCell>Licenses Number</CTableHeaderCell>
                  <CTableHeaderCell>Email</CTableHeaderCell>
                  <CTableHeaderCell>Phone Number</CTableHeaderCell>
                  <CTableHeaderCell>Hire Date</CTableHeaderCell>
                  <CTableHeaderCell>Flight Hours</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {pilotData.length > 0 ? (
                  pilotData.map((pilot, index) => (
                    <CTableRow key={pilot.pilotId}>
                      <CTableDataCell>{index + 1}</CTableDataCell>
                      <CTableDataCell>{pilot.pilotName}</CTableDataCell>
                      <CTableDataCell>{pilot.licencesNumber}</CTableDataCell>
                      <CTableDataCell>{pilot.email}</CTableDataCell>
                      <CTableDataCell>{pilot.phoneNumber}</CTableDataCell>
                      <CTableDataCell>
                        {new Date(pilot.hireDate).toLocaleDateString()}
                      </CTableDataCell>
                      <CTableDataCell>{pilot.flightHours}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="warning"
                          onClick={() => handleUpdateButtonClick(pilot.pilotId)}
                          className="me-2"
                          shape="rounded"
                          variant="outline"
                        >
                          <FaEdit />
                        </CButton>
                        <CButton
                          color="danger"
                          onClick={() => handleDeleteButtonClick(pilot)}
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
                    <CTableDataCell colSpan="8" className="text-center">
                      No pilots found.
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

export default Pilotlist
