import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom' // Import useNavigate
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react'

const AirplaneReg = () => {
  const [validated, setValidated] = useState(false)
  const navigate = useNavigate() // Initialize navigate

  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
  }

  const handleBackButtonClick = () => {
    navigate(-1) // Navigate to the previous page
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            {/* Header with Title and Back Button */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong>Airplane Registration</strong>
              <CButton color="secondary" onClick={handleBackButtonClick}>
                Back to Airplanes list
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
                <CFormLabel htmlFor="airplaneModel">Airplane Model</CFormLabel>
                <CFormInput type="text" id="airplaneModel" required />
                <CFormFeedback valid>Looks good!</CFormFeedback>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="airplaneManufacturer">Manufacturer</CFormLabel>
                <CFormInput type="text" id="airplaneManufacturer" required />
                <CFormFeedback valid>Looks good!</CFormFeedback>
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="registrationNumber">Registration Number</CFormLabel>
                <CFormInput type="text" id="registrationNumber" required />
                <CFormFeedback invalid>Please provide a valid registration number.</CFormFeedback>
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="ownerName">Owners Name</CFormLabel>
                <CFormInput type="text" id="ownerName" required />
                <CFormFeedback valid>Looks good!</CFormFeedback>
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="contactNumber">Contact Number</CFormLabel>
                <CFormInput type="text" id="contactNumber" required />
                <CFormFeedback invalid>Please provide a valid contact number.</CFormFeedback>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="manufacturerYear">Year of Manufacture</CFormLabel>
                <CFormInput type="number" id="manufacturerYear" required />
                <CFormFeedback invalid>Please provide a valid year.</CFormFeedback>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="airplaneType">Airplane Type</CFormLabel>
                <CFormSelect id="airplaneType" required>
                  <option value="" disabled selected>
                    Choose...
                  </option>
                  <option>Commercial</option>
                  <option>Private</option>
                  <option>Military</option>
                </CFormSelect>
                <CFormFeedback invalid>Please select an airplane type.</CFormFeedback>
              </CCol>
              <CCol md={12}>
                <CFormLabel htmlFor="address">Owners Address</CFormLabel>
                <CFormInput type="text" id="address" required />
                <CFormFeedback invalid>Please provide a valid address.</CFormFeedback>
              </CCol>

              <CCol xs={12}>
                <CButton color="primary" type="submit">
                  Register Airplane
                </CButton>
              </CCol>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AirplaneReg
