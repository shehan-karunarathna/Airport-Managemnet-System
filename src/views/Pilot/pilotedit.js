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

const Pilotedit = () => {
  const { pilot_id } = useParams() // Get pilotId from URL parameters
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

  useEffect(() => {
    // Fetch pilot data based on pilotId from the backend API
    const fetchPilotData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/pilot/getPilotByPilotid/${pilot_id}`,
        )
        setPilotData(response.data) // Auto-fill form with fetched data
      } catch (error) {
        console.error('There was an error fetching the pilot data!', error)
      }
    }
    fetchPilotData()
  }, [pilot_id]) // Fetch data when pilotId changes

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
          // Send PUT request to update the pilot data to the backend
          await axios.put(`http://localhost:8080/api/v1/pilot/updatepilot`, pilotData)

          // Show SweetAlert2 success notification
          Swal.fire('Saved!', 'Your changes have been saved.', 'success')

          // Navigate back to the pilot list
          navigate('/Pilot/Pilotlist')
        } catch (error) {
          console.error('There was an error saving the pilot data!', error)

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
                <strong>Edit Pilot</strong>
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

export default Pilotedit
