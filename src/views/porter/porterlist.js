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

const Porterlist = () => {
  const navigate = useNavigate()
  const [porterData, setPorterData] = useState([])

  // Fetch data from the Spring Boot API
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/v1/porter/getporters')
      .then((response) => {
        setPorterData(response.data)
      })
      .catch((error) => {
        console.error('There was an error fetching the porters!', error)
      })
  }, [])

  const handleRegisterButtonClick = () => {
    navigate('/porter/addporter')
  }

  const handleUpdateButtonClick = (porter_id) => {
    navigate(`/porter/porteredit/${porter_id}`)
  }

  const handleDeleteButtonClick = (porter) => {
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
        // Implement delete functionality with API call, sending the entire porter object
        axios
          .delete('http://localhost:8080/api/v1/porter/deleteporter', {
            data: porter, // Send the porter object in the request body
          })
          .then(() => {
            //  refresh the list after deletion
            setPorterData(porterData.filter((p) => p.porterId !== porter.porterId))

            // Show success message
            Swal.fire('Deleted!', 'The porter has been deleted.', 'success')
          })
          .catch((error) => {
            console.error(
              `There was an error deleting the porter with ID ${porter.porterId}!`,
              error,
            )

            // Show error message
            Swal.fire('Error!', 'There was an error deleting the porter.', 'error')
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
              <strong>Porter List</strong>
              <CButton color="primary" onClick={handleRegisterButtonClick}>
                Register New Porter
              </CButton>
            </div>
          </CCardHeader>
          <CCardBody>
            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>#</CTableHeaderCell>
                  <CTableHeaderCell>Name</CTableHeaderCell>
                  <CTableHeaderCell>Shift</CTableHeaderCell>
                  <CTableHeaderCell>Contact Number</CTableHeaderCell>
                  <CTableHeaderCell>Email</CTableHeaderCell>
                  <CTableHeaderCell>Position</CTableHeaderCell>
                  <CTableHeaderCell>Work Location</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {porterData.length > 0 ? (
                  porterData.map((porter, index) => (
                    <CTableRow key={porter.porterId}>
                      <CTableDataCell>{index + 1}</CTableDataCell>
                      <CTableDataCell>{porter.name}</CTableDataCell>
                      <CTableDataCell>{porter.shift}</CTableDataCell>
                      <CTableDataCell>{porter.contactNumber}</CTableDataCell>
                      <CTableDataCell>{porter.email}</CTableDataCell>
                      <CTableDataCell>{porter.position}</CTableDataCell>
                      <CTableDataCell>{porter.workLocation}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="warning"
                          onClick={() => handleUpdateButtonClick(porter.porterId)}
                          className="me-2"
                          shape="rounded"
                          variant="outline"
                        >
                          <FaEdit />
                        </CButton>
                        <CButton
                          color="danger"
                          onClick={() => handleDeleteButtonClick(porter)}
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
                      No porters found.
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

export default Porterlist
