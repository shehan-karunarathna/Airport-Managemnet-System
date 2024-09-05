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
  CFormSelect,
  CRow,
} from '@coreui/react'
import axios from 'axios'
import Swal from 'sweetalert2' // Import SweetAlert2

const Addhanger = () => {
  const [validated, setValidated] = useState(false)
  const [hangerData, setHangerData] = useState({
    location: '',
    size: '',
    type: '',
    occupied_status: false,
    operator: '',
    supported_aircraft_types: '',
    maintenance_facilities: '',
    availability: '',
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
          'http://localhost:8080/api/v1/hanger/addhanger',
          hangerData,
        )
        if (response.status === 200 || response.status === 201) {
          // Show SweetAlert2 success notification
          Swal.fire({
            icon: 'success',
            title: 'Hanger Registered!',
            text: 'The hanger has been added successfully.',
          }).then(() => {
            // Navigate to the hanger list after success
            navigate('/hanger/hangerlist')
          })
        }
      } catch (error) {
        console.error('There was an error registering the hanger!', error)
        // Show SweetAlert2 error notification
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: 'Failed to register the hanger. Please try again.',
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
              <strong>Add Hanger</strong>
              <CButton color="secondary" onClick={handleBackButtonClick}>
                Back to Hangers list
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
                <CFormLabel htmlFor="location">Hanger Location</CFormLabel>
                <CFormInput
                  type="text"
                  id="location"
                  value={hangerData.location}
                  onChange={(e) => setHangerData({ ...hangerData, location: e.target.value })}
                  required
                />
                <CFormFeedback valid>Looks good!</CFormFeedback>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="size">Size</CFormLabel>
                <CFormInput
                  type="text"
                  id="size"
                  value={hangerData.size}
                  onChange={(e) => setHangerData({ ...hangerData, size: e.target.value })}
                  required
                />
                <CFormFeedback valid>Looks good!</CFormFeedback>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="type">Type</CFormLabel>
                <CFormSelect
                  id="type"
                  value={hangerData.type}
                  onChange={(e) => setHangerData({ ...hangerData, type: e.target.value })}
                  required
                >
                  <option value="" disabled>
                    Choose...
                  </option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Storage">Storage</option>
                  <option value="Other">Other</option>
                </CFormSelect>
                <CFormFeedback invalid>Please select a type.</CFormFeedback>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="occupiedStatus">Occupied Status</CFormLabel>
                <CFormSelect
                  id="occupiedStatus"
                  value={hangerData.occupiedStatus}
                  onChange={(e) =>
                    setHangerData({
                      ...hangerData,
                      occupiedStatus: e.target.value,
                    })
                  }
                  required
                >
                  <option value="Available">Available</option>
                  <option value="Occupied">Occupied</option>
                </CFormSelect>
                <CFormFeedback invalid>Please select an occupied status.</CFormFeedback>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="operator">Operator</CFormLabel>
                <CFormInput
                  type="text"
                  id="operator"
                  value={hangerData.operator}
                  onChange={(e) => setHangerData({ ...hangerData, operator: e.target.value })}
                  required
                />
                <CFormFeedback invalid>Please provide a valid operator.</CFormFeedback>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="supported_aircraft_types">Supported Aircraft Types</CFormLabel>
                <CFormInput
                  type="text"
                  id="supported_aircraft_types"
                  value={hangerData.supported_aircraft_types}
                  onChange={(e) =>
                    setHangerData({ ...hangerData, supported_aircraft_types: e.target.value })
                  }
                  required
                />
                <CFormFeedback invalid>Please provide supported aircraft types.</CFormFeedback>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="maintenance_facilities">Maintenance Facilities</CFormLabel>
                <CFormInput
                  type="text"
                  id="maintenance_facilities"
                  value={hangerData.maintenance_facilities}
                  onChange={(e) =>
                    setHangerData({ ...hangerData, maintenance_facilities: e.target.value })
                  }
                  required
                />
                <CFormFeedback invalid>Please provide maintenance facilities.</CFormFeedback>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="availability">Availability</CFormLabel>
                <CFormInput
                  type="text"
                  id="availability"
                  value={hangerData.availability}
                  onChange={(e) => setHangerData({ ...hangerData, availability: e.target.value })}
                  required
                />
                <CFormFeedback invalid>Please provide availability information.</CFormFeedback>
              </CCol>

              <CCol xs={12}>
                <CButton color="primary" type="submit">
                  Register Hanger
                </CButton>
              </CCol>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Addhanger
