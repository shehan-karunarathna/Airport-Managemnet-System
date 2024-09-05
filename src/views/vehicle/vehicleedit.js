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

const Vehicleedit = () => {
  const { vehicle_id } = useParams() // Get vehicleId from URL parameters
  const [validated, setValidated] = useState(false)
  const [vehicleData, setVehicleData] = useState({
    vehicleType: '',
    noPlate: '',
    vehicleModel: '',
    fuelType: '',
  })
  const navigate = useNavigate()

  useEffect(() => {
    // Fetch vehicle data based on vehicleId from the backend API
    const fetchVehicleData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/vehicle/getVehicleByVehicleId/${vehicle_id}`,
        )
        setVehicleData(response.data) // Auto-fill form with fetched data
      } catch (error) {
        console.error('There was an error fetching the vehicle data!', error)
      }
    }
    fetchVehicleData()
  }, [vehicle_id]) // Fetch data when vehicleId changes

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
          // Send PUT request to update the vehicle data to the backend
          await axios.put(`http://localhost:8080/api/v1/vehicle/updateVehicle`, vehicleData)

          // Show SweetAlert2 success notification
          Swal.fire('Saved!', 'Your changes have been saved.', 'success')

          // Navigate back to the vehicle list
          navigate('/vehicle/vehiclelist')
        } catch (error) {
          console.error('There was an error saving the vehicle data!', error)

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
                <strong>Edit Vehicle</strong>
                <CButton color="secondary" onClick={handleBackButtonClick}>
                  Back to Vehicle list
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
                  <CFormLabel htmlFor="vehicleType">Vehicle Type</CFormLabel>
                  <CFormInput
                    type="text"
                    id="vehicleType"
                    value={vehicleData.vehicleType}
                    onChange={(e) =>
                      setVehicleData({ ...vehicleData, vehicleType: e.target.value })
                    }
                    required
                  />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>

                <CCol md={6}>
                  <CFormLabel htmlFor="noPlate">No Plate</CFormLabel>
                  <CFormInput
                    type="text"
                    id="noPlate"
                    value={vehicleData.noPlate}
                    onChange={(e) => setVehicleData({ ...vehicleData, noPlate: e.target.value })}
                    required
                  />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>

                <CCol md={6}>
                  <CFormLabel htmlFor="vehicleModel">Vehicle Model</CFormLabel>
                  <CFormInput
                    type="text"
                    id="vehicleModel"
                    value={vehicleData.vehicleModel}
                    onChange={(e) =>
                      setVehicleData({ ...vehicleData, vehicleModel: e.target.value })
                    }
                    required
                  />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>

                <CCol md={6}>
                  <CFormLabel htmlFor="fuelType">Fuel Type</CFormLabel>
                  <CFormInput
                    type="text"
                    id="fuelType"
                    value={vehicleData.fuelType}
                    onChange={(e) => setVehicleData({ ...vehicleData, fuelType: e.target.value })}
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

export default Vehicleedit
