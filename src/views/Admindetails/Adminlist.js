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

const Adminlist = () => {
  const navigate = useNavigate()
  const [adminData, setAdminData] = useState([])

  // Fetch data from the Spring Boot API
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/v1/admin/getadmin')
      .then((response) => {
        setAdminData(response.data)
      })
      .catch((error) => {
        console.error('There was an error fetching the admin data!', error)
      })
  }, [])

  const handleRegisterButtonClick = () => {
    navigate('/Admindetails/Createadmin')
  }

  const handleUpdateButtonClick = (admin_id) => {
    navigate(`/Admindetails/Adminedit/${admin_id}`)
  }

  const handleDeleteButtonClick = (admin) => {
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
        // Implement delete functionality with API call, sending the entire admin object
        axios
          .delete('http://localhost:8080/api/v1/admin/deleteadmin', {
            data: admin, // Send the admin object in the request body
          })
          .then(() => {
            //  refresh the list after deletion
            setAdminData(adminData.filter((a) => a.admin_id !== admin.admin_id))

            // Show success message
            Swal.fire('Deleted!', 'The admin has been deleted.', 'success')
          })
          .catch((error) => {
            console.error(`There was an error deleting the admin with ID ${admin.admin_id}!`, error)

            // Show error message
            Swal.fire('Error!', 'There was an error deleting the admin.', 'error')
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
              <strong>Admin List</strong>
              <CButton color="primary" onClick={handleRegisterButtonClick}>
                Register New Admin
              </CButton>
            </div>
          </CCardHeader>
          <CCardBody>
            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>#</CTableHeaderCell>
                  <CTableHeaderCell>Full Name</CTableHeaderCell>
                  <CTableHeaderCell>Username</CTableHeaderCell>
                  <CTableHeaderCell>Position</CTableHeaderCell>
                  <CTableHeaderCell>Email</CTableHeaderCell>
                  <CTableHeaderCell>Phone</CTableHeaderCell>
                  <CTableHeaderCell>Address</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {adminData.length > 0 ? (
                  adminData.map((admin, index) => (
                    <CTableRow key={admin.admin_id}>
                      <CTableDataCell>{index + 1}</CTableDataCell>
                      <CTableDataCell>{admin.admin_fullName}</CTableDataCell>
                      <CTableDataCell>{admin.userName}</CTableDataCell>
                      <CTableDataCell>{admin.admin_position}</CTableDataCell>
                      <CTableDataCell>{admin.admin_email}</CTableDataCell>
                      <CTableDataCell>{admin.admin_phone}</CTableDataCell>
                      <CTableDataCell>{admin.admin_address}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="warning"
                          onClick={() => handleUpdateButtonClick(admin.admin_id)}
                          className="me-2"
                          shape="rounded"
                          variant="outline"
                        >
                          <FaEdit />
                        </CButton>
                        <CButton
                          color="danger"
                          onClick={() => handleDeleteButtonClick(admin)}
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
                      No admins found.
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

export default Adminlist
