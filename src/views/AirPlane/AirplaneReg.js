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

const AirplaneReg = () => {
  const [validated, setValidated] = useState(false)
  const [planeData, setPlaneData] = useState({
    PlaneID: '',
    Model: '',
    Manufacturer: '',
    YearOfManufacturer: '',
    SeatingCapacity: '',
    FuelCapacity: '',
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
          'http://localhost:8080/api/v1/airplane/addairplane',
          planeData,
        )
        if (response.status === 200 || response.status === 201) {
          // Show SweetAlert2 success notification
          Swal.fire({
            icon: 'success',
            title: 'Airplane Registered!',
            text: 'The airplane has been added successfully.',
          }).then(() => {
            // Navigate to the airplane list after success
            navigate('/airplane/airplanelist')
          })
        }
      } catch (error) {
        console.error('There was an error registering the airplane!', error)
        // Show SweetAlert2 error notification
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: 'Failed to register the airplane. Please try again.',
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
              <strong>Add Airplane</strong>
              <CButton color="secondary" onClick={handleBackButtonClick}>
                Back to Airplane list
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
                <CFormLabel htmlFor="planeID">Plane ID</CFormLabel>
                <CFormInput
                  type="text"
                  id="planeID"
                  value={planeData.PlaneID}
                  onChange={(e) => setPlaneData({ ...planeData, PlaneID: e.target.value })}
                  required
                />
                <CFormFeedback valid>Looks good!</CFormFeedback>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="model">Model</CFormLabel>
                <CFormInput
                  type="text"
                  id="model"
                  value={planeData.Model}
                  onChange={(e) => setPlaneData({ ...planeData, Model: e.target.value })}
                  required
                />
                <CFormFeedback valid>Looks good!</CFormFeedback>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="manufacturer">Manufacturer</CFormLabel>
                <CFormInput
                  type="text"
                  id="manufacturer"
                  value={planeData.Manufacturer}
                  onChange={(e) => setPlaneData({ ...planeData, Manufacturer: e.target.value })}
                  required
                />
                <CFormFeedback valid>Looks good!</CFormFeedback>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="yearOfManufacturer">Year of Manufacturer</CFormLabel>
                <CFormInput
                  type="number"
                  id="yearOfManufacturer"
                  value={planeData.YearOfManufacturer}
                  onChange={(e) =>
                    setPlaneData({ ...planeData, YearOfManufacturer: e.target.value })
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
                  value={planeData.SeatingCapacity}
                  onChange={(e) => setPlaneData({ ...planeData, SeatingCapacity: e.target.value })}
                  required
                />
                <CFormFeedback valid>Looks good!</CFormFeedback>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="fuelCapacity">Fuel Capacity</CFormLabel>
                <CFormInput
                  type="number"
                  id="fuelCapacity"
                  value={planeData.FuelCapacity}
                  onChange={(e) => setPlaneData({ ...planeData, FuelCapacity: e.target.value })}
                  required
                />
                <CFormFeedback valid>Looks good!</CFormFeedback>
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
