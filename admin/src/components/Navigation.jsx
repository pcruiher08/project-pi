import React, { useState, useEffect, useContext } from "react"
import { useHistory } from "react-router-dom"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import { AuthContext } from "../context/AuthContext"
import colors from "../constants/colors"

export default function Navigation(props) {
  const history = useHistory()
  const { logout } = useContext(AuthContext)
  const [expanded, setExpanded] = useState(false)

  const onLogout = () => {
    logout()
    history.push("/login")
  }

  const setNavExpanded = (expanded) => {
    setExpanded(expanded)
  }

  return (
    <>
      <Navbar
        bg="flat"
        onToggle={setNavExpanded}
        variant="dark"
        style={styles.mainNavbar}
        expand="lg"
        fixed="top"
        expanded={expanded}
      >
        <Navbar.Brand onClick={() => history.push("/")}>Cameras</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end mr-auto">
            <Nav.Link className="ml-4" onClick={() => history.push("/events")}>
              Events
            </Nav.Link>
          </Nav>
          <Nav className="justify-content-end ml-auto">
            <Nav.Link className="ml-4" onClick={() => onLogout()}>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

const styles = {
  mainNavbar: {
    backgroundColor: colors.primary,
    color: colors.white,
  },
}
