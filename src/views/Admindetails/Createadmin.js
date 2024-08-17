import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
  CFormSelect,
  CRow,
} from '@coreui/react'

const Createadmin = () => {
  const [validated, setValidated] = useState(false)
  const [profilePicture, setProfilePicture] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
  }

  const handleBackButtonClick = () => {
    navigate(-1)
  }

  const handleProfilePictureChange = (event) => {
    setProfilePicture(event.target.files[0])
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            {/* Header with Title and Back Button */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong>Admin Registration</strong>
              <CButton color="secondary" onClick={handleBackButtonClick}>
                Back to Admin List
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
                <CFormInput type="text" id="adminFullName" required />
                <CFormFeedback valid>Looks good!</CFormFeedback>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="adminEmail">Email Address</CFormLabel>
                <CFormInput type="email" id="adminEmail" required />
                <CFormFeedback invalid>Please provide a valid email address.</CFormFeedback>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="username">Username</CFormLabel>
                <CFormInput type="text" id="username" required />
                <CFormFeedback invalid>Please provide a username.</CFormFeedback>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="password">Password</CFormLabel>
                <CFormInput type="password" id="password" required />
                <CFormFeedback invalid>Please provide a password.</CFormFeedback>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="phoneNumber">Phone Number</CFormLabel>
                <CFormInput type="text" id="phoneNumber" required />
                <CFormFeedback invalid>Please provide a valid phone number.</CFormFeedback>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="role">Role/Position</CFormLabel>
                <CFormSelect id="role" required>
                  <option value="" disabled selected>
                    Choose...
                  </option>
                  <option>Admin</option>
                  <option>Supervisor</option>
                  <option>Manager</option>
                </CFormSelect>
                <CFormFeedback invalid>Please select a role.</CFormFeedback>
              </CCol>
              <CCol md={12}>
                <CFormLabel htmlFor="address">Address</CFormLabel>
                <CFormInput type="text" id="address" required />
                <CFormFeedback invalid>Please provide a valid address.</CFormFeedback>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="department">Assigned Department</CFormLabel>
                <CFormSelect id="department" required>
                  <option value="" disabled selected>
                    Choose...
                  </option>
                  <option>Security</option>
                  <option>Maintenance</option>
                  <option>Customer Service</option>
                </CFormSelect>
                <CFormFeedback invalid>Please select a department.</CFormFeedback>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="accessLevel">Access Level</CFormLabel>
                <CFormSelect id="accessLevel" required>
                  <option value="" disabled selected>
                    Choose...
                  </option>
                  <option>Read-Only</option>
                  <option>Read/Write</option>
                  <option>Admin</option>
                </CFormSelect>
                <CFormFeedback invalid>Please select an access level.</CFormFeedback>
              </CCol>

              <CCol md={12}>
                <CFormLabel htmlFor="profilePicture">Profile Picture</CFormLabel>
                <CFormInput
                  type="file"
                  id="profilePicture"
                  onChange={handleProfilePictureChange}
                  required
                />
                <CFormFeedback invalid>Please upload a profile picture.</CFormFeedback>
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
