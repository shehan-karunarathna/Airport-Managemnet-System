import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2' // Import SweetAlert2
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

const Airplaneedit = () => {
  const { registrationNumber } = useParams()
  const [validated, setValidated] = useState(false)
  const [airplaneData, setAirplaneData] = useState({
    model: '',
    manufacturer: '',
    ownerName: '',
    contactNumber: '',
    yearOfManufacture: '',
    airplaneType: '',
    ownerAddress: '',
  })
  const navigate = useNavigate()

  useEffect(() => {
    // Fetch airplane data based on registrationNumber (mock data for example purposes)
    const fetchAirplaneData = async () => {
      const data = {
        model: 'Boeing 747',
        manufacturer: 'Boeing',
        ownerName: 'John Doe',
        contactNumber: '123-456-7890',
        yearOfManufacture: '1998',
        airplaneType: 'Commercial',
        ownerAddress: '123 Main St, New York, NY',
      }
      setAirplaneData(data)
    }
    fetchAirplaneData()
  }, [registrationNumber])

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
        // Implement save changes logic here
        // Example: Save data to server or state management

        // Show SweetAlert2 success notification
        Swal.fire('Saved!', 'Your changes have been saved.', 'success')

        // Optionally navigate to another page or refresh
        navigate('/AirPlane/AirplaneList') // Navigate to a list or other page
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
                  <CFormLabel htmlFor="airplaneModel">Airplane Model</CFormLabel>
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
                <CCol md={4}>
                  <CFormLabel htmlFor="registrationNumber">Registration Number</CFormLabel>
                  <CFormInput
                    type="text"
                    id="registrationNumber"
                    value={registrationNumber}
                    readOnly
                  />
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="ownerName">Owners Name</CFormLabel>
                  <CFormInput
                    type="text"
                    id="ownerName"
                    value={airplaneData.ownerName}
                    onChange={(e) =>
                      setAirplaneData({ ...airplaneData, ownerName: e.target.value })
                    }
                    required
                  />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="contactNumber">Contact Number</CFormLabel>
                  <CFormInput
                    type="text"
                    id="contactNumber"
                    value={airplaneData.contactNumber}
                    onChange={(e) =>
                      setAirplaneData({ ...airplaneData, contactNumber: e.target.value })
                    }
                    required
                  />
                  <CFormFeedback invalid>Please provide a valid contact number.</CFormFeedback>
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="manufacturerYear">Year of Manufacture</CFormLabel>
                  <CFormInput
                    type="number"
                    id="manufacturerYear"
                    value={airplaneData.yearOfManufacture}
                    onChange={(e) =>
                      setAirplaneData({ ...airplaneData, yearOfManufacture: e.target.value })
                    }
                    required
                  />
                  <CFormFeedback invalid>Please provide a valid year.</CFormFeedback>
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="airplaneType">Airplane Type</CFormLabel>
                  <CFormSelect
                    id="airplaneType"
                    value={airplaneData.airplaneType}
                    onChange={(e) =>
                      setAirplaneData({ ...airplaneData, airplaneType: e.target.value })
                    }
                    required
                  >
                    <option value="" disabled>
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
                  <CFormInput
                    type="text"
                    id="address"
                    value={airplaneData.ownerAddress}
                    onChange={(e) =>
                      setAirplaneData({ ...airplaneData, ownerAddress: e.target.value })
                    }
                    required
                  />
                  <CFormFeedback invalid>Please provide a valid address.</CFormFeedback>
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
