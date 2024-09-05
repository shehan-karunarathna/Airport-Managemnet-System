import React, { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CButton,
  CBadge,
  CAvatar,
  CTooltip,
  useColorModes,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilContrast,
  cilEnvelopeOpen,
  cilList,
  cilMenu,
  cilMoon,
  cilSun,
  cilTrash,
  cilCheckCircle,
} from '@coreui/icons'
import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'

const AppHeader = () => {
  const headerRef = useRef()
  const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')

  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)

  useEffect(() => {
    document.addEventListener('scroll', () => {
      headerRef.current &&
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
    })
  }, [])

  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen)
  }

  const notifications = [
    {
      id: 1,
      title: 'New Comment',
      message: 'You have a new comment on your post.',
      time: '2 mins ago',
      avatar: 'https://via.placeholder.com/40',
      isRead: false,
    },
    {
      id: 2,
      title: 'New Like',
      message: 'Someone liked your photo.',
      time: '10 mins ago',
      avatar: 'https://via.placeholder.com/40',
      isRead: true,
    },
    {
      id: 3,
      title: 'New Follower',
      message: 'You have a new follower.',
      time: '1 hour ago',
      avatar: 'https://via.placeholder.com/40',
      isRead: false,
    },
  ]

  return (
    <CHeader position="sticky" className="mb-4 p-0" ref={headerRef}>
      <CContainer className="border-bottom px-4" fluid>
        <CHeaderToggler
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
          style={{ marginInlineStart: '-14px' }}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderNav className="d-none d-md-flex">
          <CNavItem>
            <CNavLink to="/dashboard" as={NavLink}>
              Dashboard
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Users</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Settings</CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-auto">
          <CNavItem>
            <CNavLink href="#" onClick={toggleNotification}>
              <CIcon icon={cilBell} size="lg" />
              {!isNotificationOpen && (
                <CBadge color="danger" shape="rounded-pill" className="ms-2">
                  {notifications.filter((notification) => !notification.isRead).length}
                </CBadge>
              )}
            </CNavLink>
            {isNotificationOpen && (
              <div
                className="position-absolute bg-white border shadow-lg"
                style={{
                  width: '350px',
                  top: '50px',
                  right: '0',
                  zIndex: 1000,
                  borderRadius: '8px',
                  overflow: 'hidden',
                }}
              >
                <div className="p-3 border-bottom">
                  <h6 className="mb-0">Notifications</h6>
                </div>
                <ul className="list-unstyled mb-0">
                  {notifications.map((notification) => (
                    <li
                      key={notification.id}
                      className={`d-flex align-items-start p-3 border-bottom ${
                        notification.isRead ? 'bg-light' : ''
                      }`}
                    >
                      <CAvatar
                        src={notification.avatar}
                        size="md"
                        className="me-3"
                        shape="rounded"
                      />
                      <div className="flex-grow-1">
                        <strong>{notification.title}</strong>
                        <div>{notification.message}</div>
                        <small className="text-muted">{notification.time}</small>
                      </div>
                      <div className="ms-2">
                        <CTooltip content="Mark as read">
                          <CButton
                            color="success"
                            variant="ghost"
                            size="sm"
                            onClick={() => alert(`Marked notification ${notification.id} as read`)}
                          >
                            <CIcon icon={cilCheckCircle} />
                          </CButton>
                        </CTooltip>
                        <CTooltip content="Delete">
                          <CButton
                            color="danger"
                            variant="ghost"
                            size="sm"
                            className="ms-2"
                            onClick={() => alert(`Deleted notification ${notification.id}`)}
                          >
                            <CIcon icon={cilTrash} />
                          </CButton>
                        </CTooltip>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="p-3 text-center">
                  <CButton color="link">View all notifications</CButton>
                </div>
              </div>
            )}
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilList} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilEnvelopeOpen} size="lg" />
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav>
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
          <CDropdown variant="nav-item" placement="bottom-end">
            <CDropdownToggle caret={false}>
              {colorMode === 'dark' ? (
                <CIcon icon={cilMoon} size="lg" />
              ) : colorMode === 'auto' ? (
                <CIcon icon={cilContrast} size="lg" />
              ) : (
                <CIcon icon={cilSun} size="lg" />
              )}
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem
                active={colorMode === 'light'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('light')}
              >
                <CIcon className="me-2" icon={cilSun} size="lg" /> Light
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'dark'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('dark')}
              >
                <CIcon className="me-2" icon={cilMoon} size="lg" /> Dark
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'auto'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('auto')}
              >
                <CIcon className="me-2" icon={cilContrast} size="lg" /> Auto
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CContainer className="px-4" fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
