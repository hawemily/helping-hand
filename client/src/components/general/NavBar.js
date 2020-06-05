import React, { useState } from "react";
import { Collapse, Navbar, Nav, Container } from "react-bootstrap";

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const navBarItems = [
    { title: "Volunteer", link: "/volunteer" },
    { title: "Get Help", link: "/getHelp" },
    { title: "Contact Us" },
    { title: "Login" },
  ];

  return (
    <div>
      <Navbar bg='light' light expand='sm' className='mb-5'>
        <Container>
          <Navbar.Brand href='/'>Helping Hand</Navbar.Brand>
          <Navbar.Toggle onClick={toggle} />
          <Navbar.Collapse isOpen={isOpen} navbar>
            <Nav className='ml-auto' navbar>
              {navBarItems.map((item) => {
                return (
                  <Nav.Item>
                    <Nav.Link href={item.link} className='alert-link'>
                      {item.title}
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
