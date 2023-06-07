import React from 'react'
import { Container, Navbar } from 'react-bootstrap'


function Header() {
  return (
    <div>
        <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand className='fs-3' href="/">
          <i class="fa-solid fa-layer-group me-1"></i> EMS Application
           
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header