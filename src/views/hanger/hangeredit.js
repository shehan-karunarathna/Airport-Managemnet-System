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
  CFormSelect,
  CRow,
} from '@coreui/react'
import axios from 'axios'

const Hangeredit = () => {
  const { hanger_id } = useParams() // Get hangerId from URL parameters
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

  useEffect(() => {
    // Fetch hanger data based on hangerId from the backend API
    const fetchHangerData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/hanger/getHangerByHangerid/${hanger_id}`,
        )
        setHangerData(response.data) // Auto-fill form with fetched data
      } catch (error) {
        console.error('There was an error fetching the hanger data!', error)
      }
    }
    fetchHangerData()
  }, [hanger_id]) // Fetch data when hangerId changes

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
          // Send PUT request to update the hanger data to the backend
          await axios.put(`http://localhost:8080/api/v1/hanger/updatehanger`, hangerData)

          // Show SweetAlert2 success notification
          Swal.fire('Saved!', 'Your changes have been saved.', 'success')

          // Navigate back to the hanger list
          navigate('/Hanger/Hangerlist')
        } catch (error) {
          console.error('There was an error saving the hanger data!', error)

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
                <strong>Edit Hanger</strong>
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
                  <CFormLabel htmlFor="hangerLocation">Hanger Location</CFormLabel>
                  <CFormInput
                    type="text"
                    id="hangerLocation"
                    value={hangerData.location}
                    onChange={(e) => setHangerData({ ...hangerData, location: e.target.value })}
                    required
                  />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="hangerSize">Size</CFormLabel>
                  <CFormInput
                    type="text"
                    id="hangerSize"
                    value={hangerData.size}
                    onChange={(e) => setHangerData({ ...hangerData, size: e.target.value })}
                    required
                  />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="hangerType">Type</CFormLabel>
                  <CFormSelect
                    id="hangerType"
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
                    value={hangerData.occupiedStatus ? 'Occupied' : 'Available'}
                    onChange={(e) =>
                      setHangerData({
                        ...hangerData,
                        occupiedStatus: e.target.value === 'Occupied', // Updated to camelCase
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
                  <CFormLabel htmlFor="supportedAircraftTypes">Supported Aircraft Types</CFormLabel>
                  <CFormInput
                    type="text"
                    id="supportedAircraftTypes"
                    value={hangerData.supported_aircraft_types}
                    onChange={(e) =>
                      setHangerData({ ...hangerData, supported_aircraft_types: e.target.value })
                    }
                    required
                  />
                  <CFormFeedback invalid>Please provide supported aircraft types.</CFormFeedback>
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="maintenanceFacilities">Maintenance Facilities</CFormLabel>
                  <CFormInput
                    type="text"
                    id="maintenanceFacilities"
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

export default Hangeredit
