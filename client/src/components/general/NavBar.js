import React, { useState } from "react";
import { Collapse, Navbar, Nav, Container } from "react-bootstrap";

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const navBarItems = ["Volunteer", "Get Help", "Contact Us", "Login"];

  return (
    <div>
      <Navbar bg='light' light expand='sm' className='mb-5'>
        <Container>
          <Navbar.Brand href='/'>Helping Hand</Navbar.Brand>
          <Navbar.Toggle onClick={toggle} />
          <Navbar.Collapse isOpen={isOpen} navbar>
            <Nav className='ml-auto' navbar>
              {navBarItems.map((value) => {
                return (
                  <Nav.Item>
                    <Nav.Link href='#' className='alert-link'>
                      {value}
                    </Nav.Link>
                  </Nav.Item>
                );
              })}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
