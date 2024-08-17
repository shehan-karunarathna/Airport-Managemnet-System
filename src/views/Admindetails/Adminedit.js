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

const Adminedit = () => {
  const { adminId } = useParams()
  const [validated, setValidated] = useState(false)
  const [adminData, setAdminData] = useState({
    adminId: '',
    fullName: '',
    email: '',
    username: '',
    password: '',
    phoneNumber: '',
    role: '',
    department: '',
    accessLevel: '',
    profileImage: '',
  })
  const navigate = useNavigate()

  useEffect(() => {
    // Fetch admin data based on adminId (mock data for example purposes)
    const fetchAdminData = async () => {
      const data = {
        adminId: 2,
        fullName: 'Jane Smith',
        email: 'jane.smith@example.com',
        username: 'janesmith',
        password: '********',
        phoneNumber: '098-765-4321',
        role: 'Supervisor',
        department: 'Maintenance',
        accessLevel: 'Read/Write',
        profileImage: 'https://via.placeholder.com/50',
      }
      setAdminData(data)
    }
    fetchAdminData()
  }, [adminId])

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

        Swal.fire('Saved!', 'Your changes have been saved.', 'success')
        navigate('/Admindetails/Adminlist') // Navigate to a list or other page
      } else {
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
                <strong>Edit Admin</strong>
                <CButton color="secondary" onClick={handleBackButtonClick}>
                  Back to Admin List
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
                  <CFormLabel htmlFor="fullName">Full Name</CFormLabel>
                  <CFormInput
                    type="text"
                    id="fullName"
                    value={adminData.fullName}
                    onChange={(e) => setAdminData({ ...adminData, fullName: e.target.value })}
                    required
                  />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="email">Email Address</CFormLabel>
                  <CFormInput
                    type="email"
                    id="email"
                    value={adminData.email}
                    onChange={(e) => setAdminData({ ...adminData, email: e.target.value })}
                    required
                  />
                  <CFormFeedback invalid>Please provide a valid email address.</CFormFeedback>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="username">Username</CFormLabel>
                  <CFormInput
                    type="text"
                    id="username"
                    value={adminData.username}
                    onChange={(e) => setAdminData({ ...adminData, username: e.target.value })}
                    required
                  />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="password">Password</CFormLabel>
                  <CFormInput
                    type="password"
                    id="password"
                    value={adminData.password}
                    onChange={(e) => setAdminData({ ...adminData, password: e.target.value })}
                    required
                  />
                  <CFormFeedback invalid>Please provide a password.</CFormFeedback>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="phoneNumber">Phone Number</CFormLabel>
                  <CFormInput
                    type="text"
                    id="phoneNumber"
                    value={adminData.phoneNumber}
                    onChange={(e) => setAdminData({ ...adminData, phoneNumber: e.target.value })}
                    required
                  />
                  <CFormFeedback invalid>Please provide a valid phone number.</CFormFeedback>
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="role">Role/Position</CFormLabel>
                  <CFormSelect
                    id="role"
                    value={adminData.role}
                    onChange={(e) => setAdminData({ ...adminData, role: e.target.value })}
                    required
                  >
                    <option value="" disabled>
                      Choose...
                    </option>
                    <option>Admin</option>
                    <option>Supervisor</option>
                    <option>Manager</option>
                  </CFormSelect>
                  <CFormFeedback invalid>Please select a role.</CFormFeedback>
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="department">Assigned Department</CFormLabel>
                  <CFormSelect
                    id="department"
                    value={adminData.department}
                    onChange={(e) => setAdminData({ ...adminData, department: e.target.value })}
                    required
                  >
                    <option value="" disabled>
                      Choose...
                    </option>
                    <option>Security</option>
                    <option>Maintenance</option>
                    <option>Customer Service </option>
                  </CFormSelect>
                  <CFormFeedback invalid>Please select a department.</CFormFeedback>
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="accessLevel">Access Level</CFormLabel>
                  <CFormSelect
                    id="accessLevel"
                    value={adminData.accessLevel}
                    onChange={(e) => setAdminData({ ...adminData, accessLevel: e.target.value })}
                    required
                  >
                    <option value="" disabled>
                      Choose...
                    </option>
                    <option>Read-Only</option>
                    <option>Read/Write</option>
                    <option>Admin</option>
                  </CFormSelect>
                  <CFormFeedback invalid>Please select an access level.</CFormFeedback>
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="profileImage">Profile Image URL</CFormLabel>
                  <CFormInput
                    type="text"
                    id="profileImage"
                    value={adminData.profileImage}
                    onChange={(e) => setAdminData({ ...adminData, profileImage: e.target.value })}
                  />
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

export default Adminedit
