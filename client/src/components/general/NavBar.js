import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
} from "reactstrap";

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const navBarItems = ["Volunteer", "Get Help", "Contact Us", "Login"];

  return (
    <div>
      <Navbar color='info' light expand='sm' className='mb-5'>
        <Container>
          <NavbarBrand href='/'>Helping Hand</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className='ml-auto' navbar>
              {navBarItems.map((value) => {
                return (
                  <NavItem>
                    <NavLink href='#' className='alert-link'>
                      {value}
                    </NavLink>
                  </NavItem>
                );
              })}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
