import React from "react";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import groceries from "../../assets/servicePhotos/groceries.jpg";
import laundry from "../../assets/servicePhotos/laundry.jpg";
import transport from "../../assets/servicePhotos/transport.jpg";
import pets from "../../assets/servicePhotos/pets.jpg";

const Services = (props) => {

  const auth = props.auth;

  const services = [
    {
      name: "Groceries",
      link: "/groceries",
      image: groceries,
      alt: "groceries",
    },
    { name: "Laundry", link: "/laundry", image: laundry, alt: "laundry" },
    { name: "Transport", link: "", image: transport, alt: "transport" },
    { name: "Pet Care", link: "", image: pets, alt: "pet care" },
  ];

  const redirect = (link) => {
    window.location = window.location + link;
  };

  const notice = () => {
    alert("Please log in or register to access this feature.");
  };

  return (
    <Container>
      <Row>
        {services.map((service) => (
          <Col sm={12} lg={3} md={6}>
            <Card style={{ marginBottom: "2rem" }} className='service-cards'>
              <Card.Img top src={service.image} alt={service.alt} />
              <Card.Body>
                <Button
                  className='serviceBtn'
                  outline
                  color='primary'
                  block
                  // onClick={() => redirect(service.link)}
                  onClick={auth.isAuthenticated() ? () => redirect(service.link) : () => notice()}
                >
                  {service.name}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Services;
