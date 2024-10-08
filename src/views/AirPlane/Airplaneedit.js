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

const Airplaneedit = () => {
  const { plane_id } = useParams() // Get planeId from URL parameters
  const [validated, setValidated] = useState(false)
  const [airplaneData, setAirplaneData] = useState({
    model: '',
    manufacturer: '',
    year_of_manufacturer: '',
    seating_capacity: '',
    fuel_capacity: '',
  })
  const navigate = useNavigate()

  useEffect(() => {
    // Fetch airplane data based on planeId from the backend API
    const fetchAirplaneData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/airplane/getAirplaneByPlaneid/${plane_id}`,
        )
        setAirplaneData(response.data) // Auto-fill form with fetched data
      } catch (error) {
        console.error('There was an error fetching the airplane data!', error)
      }
    }
    fetchAirplaneData()
  }, [plane_id]) // Fetch data when planeId changes

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
          // Send PUT request to update the airplane data to the backend
          await axios.put('http://localhost:8080/api/v1/airplane/updateAirplane', airplaneData)

          // Show SweetAlert2 success notification
          Swal.fire('Saved!', 'Your changes have been saved.', 'success')

          // Navigate back to the airplane list
          navigate('/Airplane/Airplanelist')
        } catch (error) {
          console.error('There was an error saving the airplane data!', error)

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
                <strong>Edit Airplane</strong>
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
                  <CFormLabel htmlFor="airplaneModel">Model</CFormLabel>
                  <CFormInput
                    type="text"
                    id="airplaneModel"
                    value={airplaneData.model}
                    onChange={(e) => setAirplaneData({ ...airplaneData, model: e.target.value })}
                    required
                  />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>

                <CCol md={6}>
                  <CFormLabel htmlFor="airplaneManufacturer">Manufacturer</CFormLabel>
                  <CFormInput
                    type="text"
                    id="airplaneManufacturer"
                    value={airplaneData.manufacturer}
                    onChange={(e) =>
                      setAirplaneData({ ...airplaneData, manufacturer: e.target.value })
                    }
                    required
                  />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>

                <CCol md={6}>
                  <CFormLabel htmlFor="yearOfManufacturer">Year of Manufacturer</CFormLabel>
                  <CFormInput
                    type="number"
                    id="yearOfManufacturer"
                    value={airplaneData.year_of_manufacturer}
                    onChange={(e) =>
                      setAirplaneData({
                        ...airplaneData,
                        year_of_manufacturer: e.target.value,
                      })
                    }
                    required
                  />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>

                <CCol md={6}>
                  <CFormLabel htmlFor="seatingCapacity">Seating Capacity</CFormLabel>
                  <CFormInput
                    type="number"
                    id="seatingCapacity"
                    value={airplaneData.seating_capacity}
                    onChange={(e) =>
                      setAirplaneData({
                        ...airplaneData,
                        seating_capacity: e.target.value,
                      })
                    }
                    required
                  />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>

                <CCol md={6}>
                  <CFormLabel htmlFor="fuelCapacity">Fuel Capacity (in liters)</CFormLabel>
                  <CFormInput
                    type="number"
                    id="fuelCapacity"
                    value={airplaneData.fuel_capacity}
                    onChange={(e) =>
                      setAirplaneData({
                        ...airplaneData,
                        fuel_capacity: e.target.value,
                      })
                    }
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

export default Airplaneedit
