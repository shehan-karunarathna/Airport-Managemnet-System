import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CRow,
} from '@coreui/react'
import axios from 'axios'
import Swal from 'sweetalert2' // Import SweetAlert2

const Createadmin = () => {
  const [validated, setValidated] = useState(false)
  const [adminData, setAdminData] = useState({
    admin_fullName: '',
    userName: '',
    admin_position: '',
    password: '',
    admin_email: '',
    admin_phone: '',
    admin_address: '',
  })
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      event.preventDefault()
      event.stopPropagation()
      setValidated(true)

      try {
        const response = await axios.post(
          'http://localhost:8080/api/v1/admin/createadmin',
          adminData,
        )
        if (response.status === 200 || response.status === 201) {
          // Show SweetAlert2 success notification
          Swal.fire({
            icon: 'success',
            title: 'Admin Registered!',
            text: 'The admin has been added successfully.',
          }).then(() => {
            // Navigate to the admin list after success
            navigate('/admin/adminlist')
          })
        }
      } catch (error) {
        console.error('There was an error registering the admin!', error)
        // Show SweetAlert2 error notification
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: 'Failed to register the admin. Please try again.',
        })
      }
    }
  }

  const handleBackButtonClick = () => {
    navigate(-1)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong>Create Admin</strong>
              <CButton color="secondary" onClick={handleBackButtonClick}>
                Back to Admin list
              </CButton>
            </div>
          </CCardHeader>
          <CCardBody>
            <CForm
              className="row g-3 needs-validation"
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
            >
              <CCol md={6}>
                <CFormLabel htmlFor="admin_fullName">Full Name</CFormLabel>
                <CFormInput
                  type="text"
                  id="admin_fullName"
                  value={adminData.admin_fullName}
                  onChange={(e) => setAdminData({ ...adminData, admin_fullName: e.target.value })}
                  required
                />
                <CFormFeedback invalid>Please provide a valid full name.</CFormFeedback>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="userName">Username</CFormLabel>
                <CFormInput
                  type="text"
                  id="userName"
                  value={adminData.userName}
                  onChange={(e) => setAdminData({ ...adminData, userName: e.target.value })}
                  required
                />
                <CFormFeedback invalid>Please provide a valid username.</CFormFeedback>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="admin_position">Position</CFormLabel>
                <CFormInput
                  type="text"
                  id="admin_position"
                  value={adminData.admin_position}
                  onChange={(e) => setAdminData({ ...adminData, admin_position: e.target.value })}
                  required
                />
                <CFormFeedback invalid>Please provide a valid position.</CFormFeedback>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="password">Password</CFormLabel>
                <CFormInput
                  type="password"
                  id="password"
                  value={adminData.password}
                  onChange={(e) => setAdminData({ ...adminData, password: e.target.value })}
                  required
                />
                <CFormFeedback invalid>Please provide a valid password.</CFormFeedback>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="admin_email">Email</CFormLabel>
                <CFormInput
                  type="email"
                  id="admin_email"
                  value={adminData.admin_email}
                  onChange={(e) => setAdminData({ ...adminData, admin_email: e.target.value })}
                  required
                />
                <CFormFeedback invalid>Please provide a valid email.</CFormFeedback>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="admin_phone">Phone</CFormLabel>
                <CFormInput
                  type="text"
                  id="admin_phone"
                  value={adminData.admin_phone}
                  onChange={(e) => setAdminData({ ...adminData, admin_phone: e.target.value })}
                  required
                />
                <CFormFeedback invalid>Please provide a valid phone number.</CFormFeedback>
              </CCol>
              <CCol md={12}>
                <CFormLabel htmlFor="admin_address">Address</CFormLabel>
                <CFormInput
                  type="text"
                  id="admin_address"
                  value={adminData.admin_address}
                  onChange={(e) => setAdminData({ ...adminData, admin_address: e.target.value })}
                  required
                />
                <CFormFeedback invalid>Please provide a valid address.</CFormFeedback>
              </CCol>
              <CCol xs={12}>
                <CButton color="primary" type="submit">
                  Register Admin
                </CButton>
              </CCol>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Createadmin
