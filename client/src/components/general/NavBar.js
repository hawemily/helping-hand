import React, { useState } from "react";
import axios from 'axios';
import { Navbar, Nav, Container, Modal, Form, Button, ButtonGroup, ToggleButton } from "react-bootstrap";
import Login from "./Login";
import Register from "./Register";

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const showLoginModal = () => setShowLogin(true);
  const closeLoginModal = () => setShowLogin(false);

  const showRegisterModal = () => setShowRegister(true);
  const closeRegisterModal = () => setShowRegister(false);

  const logout = () => {
    props.auth.logout();
  }

  const generalItems = [
    { title: "Volunteer", link: "/volunteer" },
    { title: "Get Help", link: "/getHelp" },
    { title: "Contact Us" },
    { title: "Login", onClick: () => showLoginModal() },
    { title: "Register", onClick: () => showRegisterModal() }
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

      <Login show={showLogin} close={closeLoginModal} auth={props.auth} />

      <Register show={showRegister} close={closeRegisterModal} />
      
    </div>
  );
};

export default NavBar;
