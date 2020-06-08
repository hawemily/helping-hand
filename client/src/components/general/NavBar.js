import React, { useState } from "react";
import { Collapse, Navbar, Nav, Container } from "react-bootstrap";

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const login = (creds) => {
    props.auth.login(creds);
  }

  const logout = () => {
    console.log("logging out");
    props.auth.logout();
  }


  const generalItems = [
    { title: "Volunteer", link: "/volunteer" },
    { title: "Get Help", link: "/getHelp" },
    { title: "Contact Us" },
    { title: "Login", onClick: () => login({email: "jxy18@ic.ac.uk", password: ""}) },
  ];

  const pinItems = [
    { title: "Get Help", link: "/getHelp" },
    { title: "All Requests", link: "/getHelp/requestList" },
    { title: "Contact Us" },
    { title: "My Account" },
    { title: "Logout", onClick: () => logout()},
  ]

  const volunteerItems = [
    { title: "Volunteer", link: "/volunteer" },
    { title: "All Tasks", link: "/volunteer/taskList" },
    { title: "Contact Us" },
    { title: "My Account" },
    { title: "Logout", onClick: () => logout()}
  ]

  const getNavbarItems = () => {
    const {isAuthenticated, isPin} = props.auth;
    if (isAuthenticated() && isPin()) {
      return pinItems;
    } else if (isAuthenticated() && !isPin()) {
      return volunteerItems;
    } else {
      return generalItems;
    }
  }

  return (
    <div>
      <Navbar bg='light' light expand='sm' className='mb-5'>
        <Container>
          <Navbar.Brand href='/'>Helping Hand</Navbar.Brand>
          <Navbar.Toggle onClick={toggle} />
          <Navbar.Collapse isOpen={isOpen} navbar>
            <Nav className='ml-auto' navbar>
              {getNavbarItems().map((item) => {
                return (
                  <Nav.Item>
                    <Nav.Link href={item.link} onClick={item.onClick} className='alert-link'>
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
