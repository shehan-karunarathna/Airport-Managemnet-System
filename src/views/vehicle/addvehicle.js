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

const Addvehicle = () => {
  const [validated, setValidated] = useState(false)
  const [vehicleData, setVehicleData] = useState({
    vehicleType: '',
    noPlate: '',
    vehicleModel: '',
    fuelType: '',
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
          'http://localhost:8080/api/v1/vehicle/addvehicle',
          vehicleData,
        )
        if (response.status === 200 || response.status === 201) {
          // Show SweetAlert2 success notification
          Swal.fire({
            icon: 'success',
            title: 'Vehicle Registered!',
            text: 'The vehicle has been added successfully.',
          }).then(() => {
            // Navigate to the vehicle list after success
            navigate('/vehicle/vehiclelist')
          })
        }
      } catch (error) {
        console.error('There was an error registering the vehicle!', error)
        // Show SweetAlert2 error notification
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: 'Failed to register the vehicle. Please try again.',
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
              <strong>Add Vehicle</strong>
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
                  onChange={(e) => setVehicleData({ ...vehicleData, vehicleType: e.target.value })}
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
                  onChange={(e) => setVehicleData({ ...vehicleData, vehicleModel: e.target.value })}
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
                  Register Vehicle
                </CButton>
              </CCol>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Addvehicle
