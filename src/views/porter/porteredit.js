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

const Porteredit = () => {
  const { porter_id } = useParams() // Get porterId from URL parameters
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

  useEffect(() => {
    // Fetch porter data based on porterId from the backend API
    const fetchPorterData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/porter/getPorterById/${porter_id}`,
        )
        setPorterData(response.data) // Auto-fill form with fetched data
      } catch (error) {
        console.error('There was an error fetching the porter data!', error)
      }
    }
    fetchPorterData()
  }, [porter_id]) // Fetch data when porterId changes

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
          // Send PUT request to update the porter data to the backend
          await axios.put(`http://localhost:8080/api/v1/porter/updatePorter`, porterData)

          // Show SweetAlert2 success notification
          Swal.fire('Saved!', 'Your changes have been saved.', 'success')

          // Navigate back to the porter list
          navigate('/porter/porterlist')
        } catch (error) {
          console.error('There was an error saving the porter data!', error)

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
                <strong>Edit Porter</strong>
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
                  <CFormLabel htmlFor="porterName">Name</CFormLabel>
                  <CFormInput
                    type="text"
                    id="porterName"
                    value={porterData.name}
                    onChange={(e) => setPorterData({ ...porterData, name: e.target.value })}
                    required
                  />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="porterShift">Shift</CFormLabel>
                  <CFormInput
                    type="text"
                    id="porterShift"
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
                    onChange={(e) =>
                      setPorterData({ ...porterData, contactNumber: e.target.value })
                    }
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

export default Porteredit
