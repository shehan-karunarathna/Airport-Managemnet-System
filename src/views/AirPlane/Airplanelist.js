import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CCard,
  CButton,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableDataCell,
} from '@coreui/react'
import { FaEdit, FaTrash } from 'react-icons/fa'

const Airplanelist = () => {
  const navigate = useNavigate() // Initialize useNavigate

  const handleRegisterButtonClick = () => {
    navigate('/AirPlane/AirplaneReg') // Navigate to the AirplaneReg form
  }

  const handleUpdateButtonClick = (registrationNumber) => {
    navigate(`/AirPlane/Airplaneedit/${registrationNumber}`) // Navigate to the Airplaneedit form with registration number
  }

  const handleDeleteButtonClick = (registrationNumber) => {
    // Implement delete functionality here
    console.log(`Delete airplane with registration number ${registrationNumber}`)
  }

  const airplaneData = [
    {
      model: 'Boeing 747',
      manufacturer: 'Boeing',
      registrationNumber: 'N12345',
      ownerName: 'John Doe',
      contactNumber: '123-456-7890',
      yearOfManufacture: '1998',
      airplaneType: 'Commercial',
      ownerAddress: '123 Main St, New York, NY',
    },
    {
      model: 'Airbus A320',
      manufacturer: 'Airbus',
      registrationNumber: 'A67890',
      ownerName: 'Jane Smith',
      contactNumber: '098-765-4321',
      yearOfManufacture: '2005',
      airplaneType: 'Private',
      ownerAddress: '456 Oak Ave, Los Angeles, CA',
    },
    // Add more airplane data as needed
  ]

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong>Airplane Registration</strong>
              <CButton color="primary" onClick={handleRegisterButtonClick}>
                Register New Airplane
              </CButton>
            </div>
          </CCardHeader>
          <CCardBody>
            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>#</CTableHeaderCell>
                  <CTableHeaderCell>Airplane Model</CTableHeaderCell>
                  <CTableHeaderCell>Manufacturer</CTableHeaderCell>
                  <CTableHeaderCell>Registration Number</CTableHeaderCell>
                  <CTableHeaderCell>Owners Name</CTableHeaderCell>
                  <CTableHeaderCell>Contact Number</CTableHeaderCell>
                  <CTableHeaderCell>Year of Manufacture</CTableHeaderCell>
                  <CTableHeaderCell>Airplane Type</CTableHeaderCell>
                  <CTableHeaderCell>Owners Address</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell> {/* New Action column */}
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {airplaneData.map((airplane, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>{index + 1}</CTableDataCell>
                    <CTableDataCell>{airplane.model}</CTableDataCell>
                    <CTableDataCell>{airplane.manufacturer}</CTableDataCell>
                    <CTableDataCell>{airplane.registrationNumber}</CTableDataCell>
                    <CTableDataCell>{airplane.ownerName}</CTableDataCell>
                    <CTableDataCell>{airplane.contactNumber}</CTableDataCell>
                    <CTableDataCell>{airplane.yearOfManufacture}</CTableDataCell>
                    <CTableDataCell>{airplane.airplaneType}</CTableDataCell>
                    <CTableDataCell>{airplane.ownerAddress}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="warning"
                        onClick={() => handleUpdateButtonClick(airplane.registrationNumber)}
                        className="me-2"
                        shape="rounded"
                        variant="outline"
                      >
                        <FaEdit />
                      </CButton>
                      <CButton
                        color="danger"
                        onClick={() => handleDeleteButtonClick(airplane.registrationNumber)}
                        shape="rounded"
                        variant="outline"
                      >
                        <FaTrash />
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Airplanelist
