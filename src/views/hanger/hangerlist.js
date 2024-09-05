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

const Hangerlist = () => {
  const navigate = useNavigate()
  const [hangerData, setHangerData] = useState([])

  // Fetch data from the Spring Boot API
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/v1/hanger/gethanger')
      .then((response) => {
        setHangerData(response.data)
      })
      .catch((error) => {
        console.error('There was an error fetching the hangers!', error)
      })
  }, [])

  const handleRegisterButtonClick = () => {
    navigate('/hanger/addhanger')
  }

  const handleUpdateButtonClick = (hanger_id) => {
    navigate(`/hanger/hangeredit/${hanger_id}`)
  }

  const handleDeleteButtonClick = (hanger) => {
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
        // Implement delete functionality with API call, sending the entire hanger object
        axios
          .delete('http://localhost:8080/api/v1/hanger/deletehanger', {
            data: hanger, // Send the hanger object in the request body
          })
          .then(() => {
            //  refresh the list after deletion
            setHangerData(hangerData.filter((h) => h.hanger_id !== hanger.hanger_id))

            // Show success message
            Swal.fire('Deleted!', 'The hanger has been deleted.', 'success')
          })
          .catch((error) => {
            console.error(
              `There was an error deleting the hanger with ID ${hanger.hanger_id}!`,
              error,
            )

            // Show error message
            Swal.fire('Error!', 'There was an error deleting the hanger.', 'error')
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
              <strong>Hanger List</strong>
              <CButton color="primary" onClick={handleRegisterButtonClick}>
                Register New Hanger
              </CButton>
            </div>
          </CCardHeader>
          <CCardBody>
            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>#</CTableHeaderCell>
                  <CTableHeaderCell>Location</CTableHeaderCell>
                  <CTableHeaderCell>Size</CTableHeaderCell>
                  <CTableHeaderCell>Type</CTableHeaderCell>
                  <CTableHeaderCell>Occupied Status</CTableHeaderCell>
                  <CTableHeaderCell>Operator</CTableHeaderCell>
                  <CTableHeaderCell>Supported Aircraft Types</CTableHeaderCell>
                  <CTableHeaderCell>Maintenance Facilities</CTableHeaderCell>
                  <CTableHeaderCell>Availability</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {hangerData.length > 0 ? (
                  hangerData.map((hanger, index) => (
                    <CTableRow key={hanger.hanger_id}>
                      <CTableDataCell>{index + 1}</CTableDataCell>
                      <CTableDataCell>{hanger.location}</CTableDataCell>
                      <CTableDataCell>{hanger.size}</CTableDataCell>
                      <CTableDataCell>{hanger.type}</CTableDataCell>
                      <CTableDataCell>
                        {hanger.occupied_status ? 'Occupied' : 'Available'}
                      </CTableDataCell>
                      <CTableDataCell>{hanger.operator}</CTableDataCell>
                      <CTableDataCell>{hanger.supported_aircraft_types}</CTableDataCell>
                      <CTableDataCell>{hanger.maintenance_facilities}</CTableDataCell>
                      <CTableDataCell>{hanger.availability}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="warning"
                          onClick={() => handleUpdateButtonClick(hanger.hanger_id)}
                          className="me-2"
                          shape="rounded"
                          variant="outline"
                        >
                          <FaEdit />
                        </CButton>
                        <CButton
                          color="danger"
                          onClick={() => handleDeleteButtonClick(hanger)}
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
                    <CTableDataCell colSpan="10" className="text-center">
                      No hangers found.
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

export default Hangerlist
