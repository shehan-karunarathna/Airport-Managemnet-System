import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'

const CustomForm = () => {
  const [validated, setValidated] = useState(false)

  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Form</strong>
          </CCardHeader>
          <CCardBody>
            <DocsExample href="components/form">
              <CForm
                className="row g-3 needs-validation"
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
              >
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom01">First Name</CFormLabel>
                  <CFormInput type="text" id="validationCustom01" required />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom02">Last Name</CFormLabel>
                  <CFormInput type="text" id="validationCustom02" required />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustomUsername">Username</CFormLabel>
                  <CInputGroup className="has-validation">
                    <CInputGroupText id="inputGroupPrepend">@</CInputGroupText>
                    <CFormInput
                      type="text"
                      id="validationCustomUsername"
                      aria-describedby="inputGroupPrepend"
                      required
                    />
                    <CFormFeedback invalid>Please choose a username.</CFormFeedback>
                  </CInputGroup>
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="validationCustom03">City</CFormLabel>
                  <CFormInput type="text" id="validationCustom03" required />
                  <CFormFeedback invalid>Please provide a valid city.</CFormFeedback>
                </CCol>
                <CCol md={3}>
                  <CFormLabel htmlFor="validationCustom04">State</CFormLabel>
                  <CFormSelect id="validationCustom04" required>
                    <option disabled>Choose...</option>
                    <option>...</option>
                  </CFormSelect>
                  <CFormFeedback invalid>Please provide a valid state.</CFormFeedback>
                </CCol>
                <CCol md={3}>
                  <CFormLabel htmlFor="validationCustom05">Zip</CFormLabel>
                  <CFormInput type="text" id="validationCustom05" required />
                  <CFormFeedback invalid>Please provide a valid zip.</CFormFeedback>
                </CCol>
                <CCol xs={12}>
                  <CFormCheck
                    type="checkbox"
                    id="invalidCheck"
                    label="Agree to terms and conditions"
                    required
                  />
                  <CFormFeedback invalid>You must agree before submitting.</CFormFeedback>
                </CCol>
                <CCol xs={12}>
                  <CButton color="primary" type="submit">
                    Submit form
                  </CButton>
                </CCol>
              </CForm>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default CustomForm
