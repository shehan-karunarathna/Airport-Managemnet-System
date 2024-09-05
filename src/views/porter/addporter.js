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

const Addporter = () => {
  const [validated, setValidated] = useState(false)
  const [porterData, setPorterData] = useState({
    name: '',
    shift: '',
    contactNumber: '',
    email: '',
    position: '',
    workLocation: '',
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
          'http://localhost:8080/api/v1/porter/addporter',
          porterData,
        )
        if (response.status === 200 || response.status === 201) {
          // Show SweetAlert2 success notification
          Swal.fire({
            icon: 'success',
            title: 'Porter Registered!',
            text: 'The porter has been added successfully.',
          }).then(() => {
            // Navigate to the porter list after success
            navigate('/porter/porterlist')
          })
        }
      } catch (error) {
        console.error('There was an error registering the porter!', error)
        // Show SweetAlert2 error notification
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: 'Failed to register the porter. Please try again.',
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
              <strong>Add Porter</strong>
              <CButton color="secondary" onClick={handleBackButtonClick}>
                Back to Porters list
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
                <CFormLabel htmlFor="name">Name</CFormLabel>
                <CFormInput
                  type="text"
                  id="name"
                  value={porterData.name}
                  onChange={(e) => setPorterData({ ...porterData, name: e.target.value })}
                  required
                />
                <CFormFeedback valid>Looks good!</CFormFeedback>
              </CCol>

              <CCol md={6}>
                <CFormLabel htmlFor="shift">Shift</CFormLabel>
                <CFormInput
                  type="text"
                  id="shift"
                  value={porterData.shift}
                  onChange={(e) => setPorterData({ ...porterData, shift: e.target.value })}
                  required
                />
                <CFormFeedback valid>Looks good!</CFormFeedback>
              </CCol>

              <CCol md={6}>
                <CFormLabel htmlFor="contactNumber">Contact Number</CFormLabel>
                <CFormInput
                  type="number"
                  id="contactNumber"
                  value={porterData.contactNumber}
                  onChange={(e) => setPorterData({ ...porterData, contactNumber: e.target.value })}
                  required
                />
                <CFormFeedback valid>Looks good!</CFormFeedback>
              </CCol>

              <CCol md={6}>
                <CFormLabel htmlFor="email">Email</CFormLabel>
                <CFormInput
                  type="email"
                  id="email"
                  value={porterData.email}
                  onChange={(e) => setPorterData({ ...porterData, email: e.target.value })}
                  required
                />
                <CFormFeedback valid>Looks good!</CFormFeedback>
              </CCol>

              <CCol md={6}>
                <CFormLabel htmlFor="position">Position</CFormLabel>
                <CFormInput
                  type="text"
                  id="position"
                  value={porterData.position}
                  onChange={(e) => setPorterData({ ...porterData, position: e.target.value })}
                  required
                />
                <CFormFeedback valid>Looks good!</CFormFeedback>
              </CCol>

              <CCol md={6}>
                <CFormLabel htmlFor="workLocation">Work Location</CFormLabel>
                <CFormInput
                  type="text"
                  id="workLocation"
                  value={porterData.workLocation}
                  onChange={(e) => setPorterData({ ...porterData, workLocation: e.target.value })}
                  required
                />
                <CFormFeedback valid>Looks good!</CFormFeedback>
              </CCol>

              <CCol xs={12}>
                <CButton color="primary" type="submit">
                  Register Porter
                </CButton>
              </CCol>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Addporter
