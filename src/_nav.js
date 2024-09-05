import React from 'react'
import CIcon from '@coreui/icons-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlane } from '@fortawesome/free-solid-svg-icons'
import { cilUser } from '@coreui/icons'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import { faWarehouse } from '@fortawesome/free-solid-svg-icons'
import { faUserTie } from '@fortawesome/free-solid-svg-icons'
import { faCar } from '@fortawesome/free-solid-svg-icons'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavItem,
    name: 'Admin Details',
    to: '/Admindetails/Adminlist',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />, // Using a user icon for admin
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavItem,
    name: 'Air Planes',
    to: '/AirPlane/Airplanelist',
    icon: <FontAwesomeIcon icon={faPlane} className="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavItem,
    name: 'Hanger',
    to: '/hanger/hangerlist',
    icon: <FontAwesomeIcon icon={faWarehouse} className="nav-icon" />, // Using a warehouse icon as a proxy for hangar
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavItem,
    name: 'Pilot Details',
    to: '/pilot/pilotlist',
    icon: <FontAwesomeIcon icon={faUserTie} className="nav-icon" />, // Using a user tie icon for a pilot
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavItem,
    name: 'Vehicle Details',
    to: '/vehicle/vehiclelist',
    icon: <FontAwesomeIcon icon={faCar} className="nav-icon" />, // Using a car icon to represent vehicles
    badge: {
      color: 'info',
    },
  },

  {
    component: CNavItem,
    name: 'porter',
    to: '/porter/porterlist',
    icon: <FontAwesomeIcon icon={faUserTie} className="nav-icon" />, // Using a warehouse icon as a proxy for hangar
    badge: {
      color: 'info',
    },
  },
]

export default _nav
