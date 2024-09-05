import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CRow,
} from '@coreui/react'
import axios from 'axios'

const Adminedit = () => {
  const { admin_id } = useParams() // Get adminId from URL parameters
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

  useEffect(() => {
    // Fetch admin data based on admin_id from the backend API
    const fetchAdminData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/admin/getAdminByAdminId/${admin_id}`,
        )
        setAdminData(response.data) // Auto-fill form with fetched data
      } catch (error) {
        console.error('There was an error fetching the admin data!', error)
      }
    }
    fetchAdminData()
  }, [admin_id]) // Fetch data when admin_id changes

  const handleSubmit = async (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      event.preventDefault()
      event.stopPropagation()
      setValidated(true)

      // Show SweetAlert2 confirmation dialog
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to save these changes?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, save changes!',
        cancelButtonText: 'No, cancel!',
      })

      if (result.isConfirmed) {
        try {
          // Send PUT request to update the admin data to the backend
          await axios.put(`http://localhost:8080/api/v1/admin/updateAdmin`, adminData)

          // Show SweetAlert2 success notification
          Swal.fire('Saved!', 'Your changes have been saved.', 'success')

          // Navigate back to the admin list
          navigate('/admin/adminlist')
        } catch (error) {
          console.error('There was an error saving the admin data!', error)

          // Show SweetAlert2 error notification
          Swal.fire('Error', 'There was an issue saving your changes.', 'error')
        }
      } else {
        // Show SweetAlert2 cancellation notification
        Swal.fire('Cancelled', 'Your changes were not saved.', 'error')
      }
    }
  }

  const handleBackButtonClick = () => {
    navigate(-1)
  }

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <strong>Edit Admin</strong>
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
                  <CFormLabel htmlFor="adminFullName">Full Name</CFormLabel>
                  <CFormInput
                    type="text"
                    id="adminFullName"
                    value={adminData.admin_fullName}
                    onChange={(e) => setAdminData({ ...adminData, admin_fullName: e.target.value })}
                    required
                  />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
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
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="adminPosition">Position</CFormLabel>
                  <CFormInput
                    type="text"
                    id="adminPosition"
                    value={adminData.admin_position}
                    onChange={(e) => setAdminData({ ...adminData, admin_position: e.target.value })}
                    required
                  />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
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
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="adminEmail">Email</CFormLabel>
                  <CFormInput
                    type="email"
                    id="adminEmail"
                    value={adminData.admin_email}
                    onChange={(e) => setAdminData({ ...adminData, admin_email: e.target.value })}
                    required
                  />
                  <CFormFeedback invalid>Please provide a valid email.</CFormFeedback>
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="adminPhone">Phone</CFormLabel>
                  <CFormInput
                    type="text"
                    id="adminPhone"
                    value={adminData.admin_phone}
                    onChange={(e) => setAdminData({ ...adminData, admin_phone: e.target.value })}
                    required
                  />
                  <CFormFeedback invalid>Please provide a valid phone number.</CFormFeedback>
                </CCol>
                <CCol md={12}>
                  <CFormLabel htmlFor="adminAddress">Address</CFormLabel>
                  <CFormInput
                    type="text"
                    id="adminAddress"
                    value={adminData.admin_address}
                    onChange={(e) => setAdminData({ ...adminData, admin_address: e.target.value })}
                    required
                  />
                  <CFormFeedback invalid>Please provide a valid address.</CFormFeedback>
                </CCol>

                <CCol xs={12}>
                  <CButton color="primary" type="submit">
                    Save Changes
                  </CButton>
                </CCol>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Adminedit
