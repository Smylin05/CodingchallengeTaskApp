import React from 'react';
 import {Navbar,Nav,Container}from 'react-bootstrap';

import './NavBar.css';

function NavBar (){
 
    return (
      // <Navbar>
      //   <Navbar.Header>
      //     <Navbar.Brand>
      //       <a href="/">React-Bootstrap</a>
      //     </Navbar.Brand>
      //   </Navbar.Header>
      //   <Nav>
      //     <NavItem eventKey={1} href="/">Home</NavItem>
      //     <NavItem eventKey={2} href="/login">Login</NavItem>
      //   </Nav>
      //   </Navbar>
        <Navbar bg="light" expand="lg">
        <Container>
          {/* Equivalent of Navbar.Header */}
          <Navbar.Brand href="#home">My Website</Navbar.Brand> 
          <Navbar.Toggle aria-controls="basic-navbar-nav" /> 
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="#contact">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
   
    );
  }


export default NavBar;
