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

const Addpilot = () => {
  const [validated, setValidated] = useState(false)
  const [pilotData, setPilotData] = useState({
    pilotName: '',
    licencesNumber: '',
    email: '',
    phoneNumber: '',
    hireDate: '',
    flightHours: '',
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
        const response = await axios.post('http://localhost:8080/api/v1/pilot/addpilot', pilotData)
        if (response.status === 200 || response.status === 201) {
          // Show SweetAlert2 success notification
          Swal.fire({
            icon: 'success',
            title: 'Pilot Registered!',
            text: 'The pilot has been added successfully.',
          }).then(() => {
            // Navigate to the pilot list after success
            navigate('/pilot/pilotlist')
          })
        }
      } catch (error) {
        console.error('There was an error registering the pilot!', error)
        // Show SweetAlert2 error notification
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: 'Failed to register the pilot. Please try again.',
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
              <strong>Add Pilot</strong>
              <CButton color="secondary" onClick={handleBackButtonClick}>
                Back to Pilots list
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
                <CFormLabel htmlFor="pilotName">Pilot Name</CFormLabel>
                <CFormInput
                  type="text"
                  id="pilotName"
                  value={pilotData.pilotName}
                  onChange={(e) => setPilotData({ ...pilotData, pilotName: e.target.value })}
                  required
                />
                <CFormFeedback valid>Looks good!</CFormFeedback>
              </CCol>

              <CCol md={6}>
                <CFormLabel htmlFor="licencesNumber">Licenses Number</CFormLabel>
                <CFormInput
                  type="text"
                  id="licencesNumber"
                  value={pilotData.licencesNumber}
                  onChange={(e) => setPilotData({ ...pilotData, licencesNumber: e.target.value })}
                  required
                />
                <CFormFeedback valid>Looks good!</CFormFeedback>
              </CCol>

              <CCol md={6}>
                <CFormLabel htmlFor="email">Email</CFormLabel>
                <CFormInput
                  type="email"
                  id="email"
                  value={pilotData.email}
                  onChange={(e) => setPilotData({ ...pilotData, email: e.target.value })}
                  required
                />
                <CFormFeedback valid>Looks good!</CFormFeedback>
              </CCol>

              <CCol md={6}>
                <CFormLabel htmlFor="phoneNumber">Phone Number</CFormLabel>
                <CFormInput
                  type="number"
                  id="phoneNumber"
                  value={pilotData.phoneNumber}
                  onChange={(e) => setPilotData({ ...pilotData, phoneNumber: e.target.value })}
                  required
                />
                <CFormFeedback valid>Looks good!</CFormFeedback>
              </CCol>

              <CCol md={6}>
                <CFormLabel htmlFor="hireDate">Hire Date</CFormLabel>
                <CFormInput
                  type="date"
                  id="hireDate"
                  value={pilotData.hireDate}
                  onChange={(e) => setPilotData({ ...pilotData, hireDate: e.target.value })}
                  required
                />
                <CFormFeedback valid>Looks good!</CFormFeedback>
              </CCol>

              <CCol md={6}>
                <CFormLabel htmlFor="flightHours">Flight Hours (HH:MM:SS)</CFormLabel>
                <CFormInput
                  type="time"
                  step="1"
                  id="flightHours"
                  value={pilotData.flightHours}
                  onChange={(e) => setPilotData({ ...pilotData, flightHours: e.target.value })}
                  required
                />
                <CFormFeedback valid>Looks good!</CFormFeedback>
              </CCol>

              <CCol xs={12}>
                <CButton color="primary" type="submit">
                  Register Pilot
                </CButton>
              </CCol>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Addpilot
