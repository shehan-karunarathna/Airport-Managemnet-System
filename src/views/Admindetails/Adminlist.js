import React from 'react'
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

const Adminlist = () => {
  const navigate = useNavigate()

  const handleRegisterButtonClick = () => {
    navigate('/Admindetails/Createadmin')
  }

  const handleUpdateButtonClick = (adminId) => {
    navigate(`/Admindetails/Adminedit/${adminId}`)
  }

  const handleDeleteButtonClick = (adminId) => {
    // Implement delete functionality here
    console.log(`Delete admin with Admin ID ${adminId}`)
  }

  const adminData = [
    {
      adminId: 1,
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      username: 'johndoe',
      password: '********',
      phoneNumber: '123-456-7890',
      role: 'Admin',
      department: 'Security',
      accessLevel: 'Admin',
      profileImage: null, // No image provided, will show default image
    },
    {
      adminId: 2,
      fullName: 'Jane Smith',
      email: 'jane.smith@example.com',
      username: 'janesmith',
      password: '********',
      phoneNumber: '098-765-4321',
      role: 'Supervisor',
      department: 'Maintenance',
      accessLevel: 'Read/Write',
      profileImage: 'https://via.placeholder.com/50', // Example image URL
    },
    // Add more admin data as needed
  ]

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
                  <CTableHeaderCell>Admin ID</CTableHeaderCell> {/* Updated Admin ID column */}
                  <CTableHeaderCell>Profile Image</CTableHeaderCell>
                  <CTableHeaderCell>Full Name</CTableHeaderCell>
                  <CTableHeaderCell>Email</CTableHeaderCell>
                  <CTableHeaderCell>Username</CTableHeaderCell>
                  <CTableHeaderCell>Password</CTableHeaderCell>
                  <CTableHeaderCell>Phone Number</CTableHeaderCell>
                  <CTableHeaderCell>Role</CTableHeaderCell>
                  <CTableHeaderCell>Department</CTableHeaderCell>
                  <CTableHeaderCell>Access Level</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {adminData.map((admin, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>{index + 1}</CTableDataCell>
                    <CTableDataCell>{admin.adminId}</CTableDataCell> {/* Display Admin ID */}
                    <CTableDataCell>
                      <img
                        src={admin.profileImage}
                        alt={admin.fullName}
                        style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                      />
                    </CTableDataCell>
                    <CTableDataCell>{admin.fullName}</CTableDataCell>
                    <CTableDataCell>{admin.email}</CTableDataCell>
                    <CTableDataCell>{admin.username}</CTableDataCell>
                    <CTableDataCell>{admin.password}</CTableDataCell>
                    <CTableDataCell>{admin.phoneNumber}</CTableDataCell>
                    <CTableDataCell>{admin.role}</CTableDataCell>
                    <CTableDataCell>{admin.department}</CTableDataCell>
                    <CTableDataCell>{admin.accessLevel}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="warning"
                        onClick={() => handleUpdateButtonClick(admin.adminId)}
                        className="me-2"
                        shape="rounded"
                        variant="outline"
                      >
                        <FaEdit />
                      </CButton>
                      <CButton
                        color="danger"
                        onClick={() => handleDeleteButtonClick(admin.adminId)}
                        shape="rounded"
                        variant="outline"
                      >
                        <FaTrash />
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Adminlist
